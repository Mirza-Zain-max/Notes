import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Typography, message, Modal, Form, Input} from 'antd';
import { fireStore } from 'Config/fireBase';
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'Contexts/Auth';

const { Title } = Typography;

const MyTodos = () => {
  const { user } = useAuthContext();
  const [todos, setTodos] = useState([]);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [shareEmail, setShareEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const userTodosQuery = query(collection(fireStore, "todos"), where("uid", "==", user.uid));
        const userTodosSnapshot = await getDocs(userTodosQuery);
        const userTodos = userTodosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sharedTodosQuery = query(collection(fireStore, "todos"), where("sharedNotes", "array-contains", user.email));
        const sharedTodosSnapshot = await getDocs(sharedTodosQuery);
        const sharedTodos = sharedTodosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const allTodos = [...userTodos, ...sharedTodos].filter((todo, index, self) => index === self.findIndex((t) => t.id === todo.id));
        setTodos(allTodos);
      } catch (error) {
        message.error("Failed to fetch Notes. Try again!");
      }
    };
    fetchTodos();
  }, [user.uid, user.email]);

  const handleShare = async () => {
    if (!shareEmail) { return message.error("Please enter an email address") }
    try {
      const todoDocRef = doc(fireStore, "todos", currentTodo.id);
      const updatedSharedNotes = currentTodo.sharedNotes.includes(shareEmail)
        ? currentTodo.sharedNotes
        : [...currentTodo.sharedNotes, shareEmail];

      await updateDoc(todoDocRef, { sharedNotes: updatedSharedNotes });
      message.success(`Todo shared with ${shareEmail} successfully!`);
      setIsShareModalVisible(false);
      setShareEmail("");
    } catch (error) {
      message.error("Failed to share Notes. Try again!");
    }
  };

  return (
    <main className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Container>
        <Row className="justify-content-center">
          <Col span={12}>
            <Button onClick={() => navigate('/')}>Add Notes</Button>
            {todos.map((todo) => (
              <Card key={todo.id} className="my-2">
                <Title level={4}>
                  {todo.title}
                  {todo.uid !== user.uid && <span style={{ color: "green", marginLeft: "10px" }}>(Shared)</span>}
                </Title>
                <p><strong>Subject:</strong> {todo.subject}</p>
                <p><strong>Description:</strong> {todo.description}</p>
                {todo.uid === user.uid && (
                  <Button type="primary" onClick={() => setCurrentTodo(todo) || setIsShareModalVisible(true)}>
                    Share Notes
                  </Button>
                )}
              </Card>
            ))}

          </Col>
        </Row>
      </Container>
      <Modal
        title="Share Todo"
        open={isShareModalVisible} // Updated property
        onOk={handleShare}
        onCancel={() => setIsShareModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item
            label="Recipient Email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
          >
            <Input value={shareEmail} onChange={(e) => setShareEmail(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>

    </main>
  );
};

export default MyTodos;

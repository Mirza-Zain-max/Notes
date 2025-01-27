import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Typography, message, Modal, Form, Input, Popconfirm } from 'antd';
import { fireStore } from 'Config/fireBase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { Container } from 'react-bootstrap';
import { useAuthContext } from 'Contexts/Auth';
import { DeleteOutlined, EditOutlined, ShareAltOutlined } from '@ant-design/icons';

const { Title } = Typography;

const MyTodos = () => {
  const { user } = useAuthContext();
  const [todos, setTodos] = useState([]);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [shareEmail, setShareEmail] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const userTodosQuery = query(collection(fireStore, 'todos'), where('uid', '==', user.uid));
        const userTodosSnapshot = await getDocs(userTodosQuery);
        const userTodos = userTodosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sharedTodosQuery = query(collection(fireStore, 'todos'), where('sharedNotes', 'array-contains', user.email));
        const sharedTodosSnapshot = await getDocs(sharedTodosQuery);
        const sharedTodos = sharedTodosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const allTodos = [...userTodos, ...sharedTodos].filter((todo, index, self) => index === self.findIndex((t) => t.id === todo.id));
        setTodos(allTodos);
      } catch (error) {
        message.error('Failed to fetch Notes. Try again!');
      }
    };
    fetchTodos();
  }, [user.uid, user.email]);

  const handleShare = async () => {
    if (!shareEmail) {
      return message.error('Please enter an email address');
    }
    try {
      const todoDocRef = doc(fireStore, 'todos', currentTodo.id);
      const updatedSharedNotes = currentTodo.sharedNotes.includes(shareEmail)
        ? currentTodo.sharedNotes
        : [...currentTodo.sharedNotes, shareEmail];

      await updateDoc(todoDocRef, { sharedNotes: updatedSharedNotes });
      message.success(`Notes shared with ${shareEmail} successfully!`);
      setIsShareModalVisible(false);
      setShareEmail('');
    } catch (error) {
      message.error('Failed to share Notes. Try again!');
    }
  };

  const handleEdit = async () => {
    try {
      const values = form.getFieldsValue();
      const todoDocRef = doc(fireStore, 'todos', currentTodo.id);
      await updateDoc(todoDocRef, values);
      setTodos(
        todos.map((todo) => (todo.id === currentTodo.id ? { ...todo, ...values } : todo))
      );
      message.success('Notes updated successfully!');
      setIsEditModalVisible(false);
    } catch (error) {
      message.error('Failed to update todo. Try again!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(fireStore, 'todos', id));
      setTodos(todos.filter((todo) => todo.id !== id));
      message.success('Notes deleted successfully!');
    } catch (error) {
      message.error('Failed to delete todo. Try again!');
    }
  };

  return (
    <main className="d-flex justify-content-center align-items-center" style={{ paddingTop: '90px', backgroundColor: '#f0f2f5' }}>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col span={20}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>My Notes</Title>
            {todos.map((todo) => (
              <Col span={24} key={todo.id} style={{ marginBottom: '20px' }}>
                <Card className="my-2" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <Title level={4}>
                    {todo.title}
                    {todo.uid !== user.uid && <span style={{ color: 'green', marginLeft: '10px' }}>(Shared)</span>}
                  </Title>
                  <p><strong>Subject:</strong> {todo.subject}</p>
                  <p><strong>Description:</strong> {todo.description}</p>
                  <>
                    <abbr title="Edit Notes">
                      <Button type="primary" className='bg-success' onClick={() => { setCurrentTodo(todo); setIsEditModalVisible(true); form.setFieldsValue(todo); }} style={{ marginTop: '10px', marginRight: '10px' }}>
                        <EditOutlined />
                      </Button>
                    </abbr>
                    <Popconfirm
                      title="Are you sure to delete this notes?"
                      onConfirm={() => handleDelete(todo.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <abbr title="Delete Notes">
                        <Button type="danger" className='bg-danger text-light' style={{ marginTop: '10px', marginRight: '10px' }}>
                          <DeleteOutlined />
                        </Button>
                      </abbr>
                    </Popconfirm>
                    <abbr title="Share Notes">
                      <Button type="primary" className='bg-warning' onClick={() => { setCurrentTodo(todo); setIsShareModalVisible(true); }} style={{ marginTop: '10px' }}>
                        <ShareAltOutlined />
                      </Button>
                    </abbr>
                  </>
                </Card>
              </Col>
            ))}
          </Col>
        </Row>
      </Container>
      <Modal
        title="Share Todo"
        visible={isShareModalVisible}
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
      <Modal
        title="Edit Todo"
        visible={isEditModalVisible}
        onOk={handleEdit}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the title' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Subject" name="subject" rules={[{ required: true, message: 'Please enter the subject' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the description' }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};

export default MyTodos;

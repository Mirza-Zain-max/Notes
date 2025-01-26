// import React, { useEffect, useState } from 'react';
// import { Button, Card, Col, Row, Typography, message, Modal, Form, Input } from 'antd';
// import { fireStore } from 'Config/fireBase';
// import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { Container } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const { Title } = Typography;

// const MyTodos = () => {
//   const [todos, setTodos] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [currentTodo, setCurrentTodo] = useState(null);
//   const [form] = Form.useForm();
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(fireStore, 'todos'));
//         const todosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setTodos(todosList);
//       } catch (error) {
//         console.error('Error fetching todos:', error);
//         message.error('Failed to fetch todos. Try again!');
//       }
//     };

//     fetchTodos();
//   }, []);

//   const showEditModal = (todo) => {
//     setCurrentTodo(todo);
//     form.setFieldsValue(todo);
//     setIsModalVisible(true);
//   };

//   const handleEdit = async () => {
//     try {
//       const values = form.getFieldsValue();
//       const todoDocRef = doc(fireStore, 'todos', currentTodo.id);
//       await updateDoc(todoDocRef, values);
//       setTodos(todos.map(todo => (todo.id === currentTodo.id ? { ...todo, ...values } : todo)));
//       message.success('Todo updated successfully!');
//       setIsModalVisible(false);
//     } catch (error) {
//       console.error('Error updating todo:', error);
//       message.error('Failed to update todo. Try again!');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteDoc(doc(fireStore, 'todos', id));
//       setTodos(todos.filter(todo => todo.id !== id));
//       message.success('Todo deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//       message.error('Failed to delete todo. Try again!');
//     }
//   };

//   return (
//     <main style={{ height: '100vh', marginTop: 300 }} className="d-flex justify-content-center align-items-center">
//       <Container>
//         <Row className="justify-content-center">
//           <Col span={12}>
//           <Button onClick={()=>{navigate("/")}}>Add Notes</Button>
//             {todos.map(todo => (
//               <Card key={todo.id} className="my-2">
//                 <Title level={4}>{todo.title}</Title>
//                 <p><strong>Subject:</strong> {todo.subject}</p>
//                 <p><strong>Description:</strong> {todo.description}</p>
//                 <p><strong>Timestamp:</strong> {new Date(todo.timestamp.seconds * 1000).toLocaleString()}</p>
//                 <Button onClick={() => showEditModal(todo)}>Edit</Button>
//                 <Button onClick={() => handleDelete(todo.id)} danger>Delete</Button>
//                 <Button  succes>Share Notes</Button>
//               </Card>
//             ))}
//           </Col>
//         </Row>
//       </Container>

//       <Modal
//         title="Edit Todo"
//         visible={isModalVisible}
//         onOk={handleEdit}
//         onCancel={() => setIsModalVisible(false)}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="subject" label="Subject" rules={[{ required: true, message: 'Please enter the subject' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
//             <Input.TextArea />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </main>
//   );
// };

// export default MyTodos;


// import React, { useEffect, useState } from 'react';
// import { Button, Card, Col, Row, Typography, message, Modal, Form, Input } from 'antd';
// import { fireStore } from 'Config/fireBase';
// import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { Container } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const { Title } = Typography;

// const MyTodos = () => {
//   const [todos, setTodos] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [currentTodo, setCurrentTodo] = useState(null);
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(fireStore, 'todos'));
//         const todosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setTodos(todosList);
//       } catch (error) {
//         console.error('Error fetching todos:', error);
//         message.error('Failed to fetch todos. Try again!');
//       }
//     };

//     fetchTodos();
//   }, []);

//   const showEditModal = (todo) => {
//     setCurrentTodo(todo);
//     form.setFieldsValue(todo);
//     setIsModalVisible(true);
//   };

//   const handleEdit = async () => {
//     try {
//       const values = form.getFieldsValue();
//       const todoDocRef = doc(fireStore, 'todos', currentTodo.id);
//       await updateDoc(todoDocRef, values);
//       setTodos(todos.map(todo => (todo.id === currentTodo.id ? { ...todo, ...values } : todo)));
//       message.success('Todo updated successfully!');
//       setIsModalVisible(false);
//     } catch (error) {
//       console.error('Error updating todo:', error);
//       message.error('Failed to update todo. Try again!');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteDoc(doc(fireStore, 'todos', id));
//       setTodos(todos.filter(todo => todo.id !== id));
//       message.success('Todo deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//       message.error('Failed to delete todo. Try again!');
//     }
//   };

//   return (
//     <main style={{ height: '100vh', marginTop: 300 }} className="d-flex justify-content-center align-items-center">
//       <Container>
//         <Row className="justify-content-center">
//           <Col span={12}>
//             <Button onClick={() => navigate("/add")}>Add Notes</Button>
//             {todos.map(todo => (
//               <Card key={todo.id} className="my-2">
//                 <Title level={4}>{todo.title}</Title>
//                 <p><strong>Subject:</strong> {todo.subject}</p>
//                 <p><strong>Description:</strong> {todo.description}</p>
//                 <p><strong>Timestamp:</strong> {new Date(todo.timestamp.seconds * 1000).toLocaleString()}</p>
//                 <Button onClick={() => showEditModal(todo)}>Edit</Button>
//                 <Button onClick={() => handleDelete(todo.id)} danger>Delete</Button>
//                 <Button type="primary">Share Notes</Button>
//               </Card>
//             ))}
//           </Col>
//         </Row>
//       </Container>

//       <Modal
//         title="Edit Todo"
//         visible={isModalVisible}
//         onOk={handleEdit}
//         onCancel={() => setIsModalVisible(false)}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="subject" label="Subject" rules={[{ required: true, message: 'Please enter the subject' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
//             <Input.TextArea />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </main>
//   );
// };

// export default MyTodos;

import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Typography, message, Modal, Form, Input } from 'antd';
import { fireStore } from 'Config/fireBase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import emailjs from 'emailjs-com'; // Ensure correct import
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const MyTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [shareEmail, setShareEmail] = useState('');
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireStore, 'todos'));
        const todosList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todosList);
      } catch (error) {
        console.error('Error fetching todos:', error);
        message.error('Failed to fetch todos. Try again!');
      }
    };

    fetchTodos();
  }, []);

  // Show edit modal
  const showEditModal = (todo) => {
    setCurrentTodo(todo);
    form.setFieldsValue(todo);
    setIsModalVisible(true);
  };

  // Handle todo edit
  const handleEdit = async () => {
    try {
      const values = form.getFieldsValue();
      const todoDocRef = doc(fireStore, 'todos', currentTodo.id);
      await updateDoc(todoDocRef, values);
      setTodos(
        todos.map((todo) => (todo.id === currentTodo.id ? { ...todo, ...values } : todo))
      );
      message.success('Todo updated successfully!');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating todo:', error);
      message.error('Failed to update todo. Try again!');
    }
  };

  // Handle todo delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(fireStore, 'todos', id));
      setTodos(todos.filter((todo) => todo.id !== id));
      message.success('Todo deleted successfully!');
    } catch (error) {
      console.error('Error deleting todo:', error);
      message.error('Failed to delete todo. Try again!');
    }
  };

  // Show share modal
  const showShareModal = (todo) => {
    setCurrentTodo(todo);
    setIsShareModalVisible(true);
  };

  // Handle share todo via email
  const handleShare = async () => {
    if (!shareEmail) {
      return message.error('Please enter an email address');
    }

    const templateParams = {
      to_email: shareEmail, // Recipient's email
      todo_title: currentTodo.title, // Todo title
      todo_description: currentTodo.description, // Todo description
      todo_link: `https://your-app-domain.com/todo/${currentTodo.id}`, // Replace with your app domain
    };

    console.log('Template Params:', templateParams); // Debug template params

    try {
      const response = await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with EmailJS Service ID
        'YOUR_TEMPLATE_ID', // Replace with EmailJS Template ID
        templateParams,
        'YOUR_USER_ID' // Replace with EmailJS Public Key
      );

      console.log('Email successfully sent:', response); // Debug success response
      message.success(`Todo shared with ${shareEmail} successfully!`);
      setIsShareModalVisible(false);
      setShareEmail('');
    } catch (error) {
      console.error('Error sending email:', error); // Debug error response
      message.error('Failed to share todo. Try again!');
    }
  };

  return (
    <main className="d-flex justify-content-center align-items-center" style={{ height: '100vh', marginTop: 300 }}>
      <Container>
        <Row className="justify-content-center">
          <Col span={12}>
            <Button onClick={() => navigate('/')}>Add Notes</Button>
            <Title level={2} className="text-center">My Todos</Title>
            {todos.map((todo) => (
              <Card key={todo.id} className="my-2">
                <Title level={4}>{todo.title}</Title>
                <p><strong>Subject:</strong> {todo.subject}</p>
                <p><strong>Description:</strong> {todo.description}</p>
                <p><strong>Timestamp:</strong> {new Date(todo.timestamp.seconds * 1000).toLocaleString()}</p>
                <Button onClick={() => showEditModal(todo)}>Edit</Button>
                <Button onClick={() => handleDelete(todo.id)} danger>Delete</Button>
                <Button type="primary" onClick={() => showShareModal(todo)}>Share Notes</Button>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>

      {/* Edit Modal */}
      <Modal
        title="Edit Todo"
        visible={isModalVisible}
        onOk={handleEdit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="subject" label="Subject" rules={[{ required: true, message: 'Please enter the subject' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      {/* Share Modal */}
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
    </main>
  );
};

export default MyTodos;
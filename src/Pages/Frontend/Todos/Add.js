// import React, { useState } from 'react';
// import { Card, Col, Form,  Input,  message, Row, Typography } from 'antd';
// import { fireStore } from 'Config/fireBase'; // Ensure the correct path to your firebaseConfig
// import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
// import { Button, Container  } from 'react-bootstrap';
// import TextArea from 'antd/es/input/TextArea';

// const Add = () => {
//   const { Title } = Typography;

//   // State to handle form inputs
//   const [formState, setFormState] = useState({
//     title: '',
//     subject: '',
//     description: '',
//   });

//   // Update form state on input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormState({ ...formState, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     const { title, subject, description } = formState;

//     if (!title || !subject || !description) {
//       return message.error('Please fill all fields.');
//     }

//     try {
//       const todoId = new Date().getTime().toString(); // Unique ID for the document
//       await setDoc(doc(fireStore, 'todos', todoId), {
//         title,
//         subject,
//         description,
//         timestamp: serverTimestamp(),
//       });
//       message.success('Todo added successfully!');
//       setFormState({ title: '', subject: '', description: '' }); // Reset form
//     } catch (error) {
//       console.error('Error adding Todo:', error);
//       message.error('Failed to add Todo. Try again!');
//     }
//   };

//   return (
//     <main style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
//       <Container className="d-flex justify-content-center align-items-center">
//         <Row>
//           <Col xs={6} md={16} lg={24} >
//             <Card>
//               <Form>
//                 <label htmlFor='title'><span className='text-danger '>*</span> Title:</label>
//                 <Input className='my-2' name="title" placeholder="Title" value={formState.title} onChange={handleInputChange} />
//                 <label htmlFor='subject'><span className='text-danger '>*</span> Subject:</label>
//                 <Input className='my-2' name="subject" placeholder="Subject" value={formState.subject} onChange={handleInputChange} />
//                 <label htmlFor='description'><span className='text-danger '>*</span> Description:</label>
//                 <TextArea name="description" className='my-2' placeholder="Description" value={formState.description} onChange={handleInputChange} />
//                 <Button variant="primary" className='w-25' onClick={handleSubmit}>
//                   Save Todo
//                 </Button>
//               </Form>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </main>
//   );
// };

// export default Add;


import React, { useState } from 'react';
import { Card, Col, Form, Input, message, Row, Typography } from 'antd';
import { fireStore } from 'Config/fireBase'; // Ensure the correct path to your firebaseConfig
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Button, Container } from 'react-bootstrap';
import TextArea from 'antd/es/input/TextArea';

const Add = () => {
  const { Title } = Typography;

  // State to handle form inputs
  const [formState, setFormState] = useState({
    title: '',
    subject: '',
    description: '',
  });

  // Update form state on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const { title, subject, description } = formState;

    if (!title || !subject || !description) {
      return message.error('Please fill all fields.');
    }

    try {
      const todoId = new Date().getTime().toString(); // Unique ID for the document
      await setDoc(doc(fireStore, 'todos', todoId), {
        title,
        subject,
        description,
        timestamp: serverTimestamp(),
      });
      message.success('Todo added successfully!');
      setFormState({ title: '', subject: '', description: '' }); // Reset form
    } catch (error) {
      console.error('Error adding Todo:', error);
      message.error('Failed to add Todo. Try again!');
    }
  };

  return (
    <main style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col span={12}>
            <Card>
              <Title level={2} className="text-center">Add Notes</Title>
              <Form layout="vertical">
                <Form.Item label="Title" required>
                  <Input
                    className='my-2'
                    name="title"
                    placeholder="Title"
                    value={formState.title}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item label="Subject" required>
                  <Input
                    className='my-2'
                    name="subject"
                    placeholder="Subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item label="Description" required>
                  <TextArea
                    className='my-2'
                    name="description"
                    placeholder="Description"
                    value={formState.description}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Button variant="primary" className='w-100' onClick={handleSubmit}>
                  Save Notes
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Add;
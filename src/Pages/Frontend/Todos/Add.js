import React, { useState } from 'react';
import { Card, Col, Form, Input, message, Row, Typography } from 'antd';
import { fireStore } from 'Config/fireBase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Button, Container } from 'react-bootstrap';
import TextArea from 'antd/es/input/TextArea';
import { useAuthContext } from 'Contexts/Auth';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Add = () => {
  const { user } = useAuthContext();
  const [formState, setFormState] = useState({ title: '', subject: '', description: '', });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => { const { name, value } = e.target; setFormState({ ...formState, [name]: value }); };
  const generateRandomId = () => { return '_' + Math.random().toString(36).substr(2, 9); };
  const handleSubmit = async (e) => {
    e.preventDefault(); const { title, subject, description } = formState;
    if (title.trim().length < 3) {
      return message.error('Please enter a valid title.');
    }
    const newNote = { id: generateRandomId(), uid: user.uid, title: title.trim(), subject: subject.trim(), description: description.trim(), createdAt: serverTimestamp(), sharedNotes: [user.uid], };
    setIsProcessing(true);
    try {
      await setDoc(doc(fireStore, 'todos', newNote.id), newNote);
      message.success('Note added successfully!');
      setFormState({ title: '', subject: '', description: '' });
    } catch (error) {
      message.error('Failed to add note. Try again!');
    }
    finally {
      setIsProcessing(false);
    }
  };

  return (
    <main style={{ height: '100vh' ,marginTop: 70 }} className="todos  d-flex justify-content-center align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col span={12}>
            <Card className="p-4 card " >
              <Title level={1} className="text-center">Add Notes</Title>
              <Form layout="vertical" onSubmit={handleSubmit}>
                <Form.Item label="Title" required>
                  <Input name="title" placeholder="Title" value={formState.title} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Subject" required>
                  <Input name="subject" placeholder="Subject" value={formState.subject} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Description" required>
                  <TextArea name="description" placeholder="Description" value={formState.description} onChange={handleInputChange} style={{ minHeight: "100px", resize: "none" }} />
                </Form.Item>
                <Row >
                  <Col className='justify-content-between d-flex' span={24}>
                    <Button
                      type="primary"
                      size="large" className='w-50 me-2'
                      loading={isProcessing || undefined}
                      onClick={handleSubmit}
                      style={{ backgroundColor: "#2C3E50", border: "none" }}
                    >
                      Save Notes
                    </Button>
                    <Button type="primary" size="large" className='w-50' style={{ backgroundColor: "#19547b", border: "none" }} onClick={() => navigate("/todos/myTodos")}>
                      View Notes
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Add;

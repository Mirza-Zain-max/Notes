import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Input, message, Row, Typography } from 'antd';
import { doc, Firestore, getDoc, updateDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom'
import { fireStore } from 'Config/fireBase';
import { useAuthContext } from 'Contexts/Auth';
import { Container } from 'react-bootstrap';

const { Title } = Typography;

const Profile = () => {
    const navigate = useNavigate()
    const { user, setAuthState } = useAuthContext(); // Ensure user contains the current user's details
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [isProcessing, setIsProcessing] = useState(false);

    // Fetch and initialize user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user && user.uid) {
                const docRef = doc(fireStore, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setState({
                        firstName: userData.firstName || '',
                        lastName: userData.lastName || '',
                        email: userData.email || '',
                    });
                } else {
                    message.error('User profile not found');
                }
            }
        };
        fetchUserProfile();
    }, [user]);

    const handleChange = (e) =>
        setState((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        const { firstName, lastName, email } = state;
        const updatedData = { firstName, lastName, email };

        if (firstName.trim().length < 3) {
            return message.error('Please enter a valid first name');
        }
        if (lastName.trim().length < 3) {
            return message.error('Please enter a valid last name');
        }
        if (!email.trim()) {
            return message.error('Please enter a valid email');
        }

        try {
            const userDocRef = doc(fireStore, 'users', user.uid);
            await updateDoc(userDocRef, updatedData);

            // Update local state
            setAuthState((prevState) => ({
                ...prevState,
                user: { ...prevState.user, ...updatedData },
            }));
            message.success('Profile updated successfully', 'success');
            navigate('/');
        } catch (error) {
            console.error('Error updating profile:', error);
            message.error('Failed to update profile. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <main style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
            <Container>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col>
                        <Card>
                            <Title level={1} className="text-center ">
                                Update Profile
                            </Title>
                            <Form layout="vertical" className="mb-0">
                                <Row>
                                    <Col span={24}>
                                        <Form.Item className="mb-2" label="First Name" required>
                                            <Input
                                                type="text"
                                                name="firstName"
                                                value={state.firstName}
                                                placeholder="Enter Your First Name"
                                                className="py-2"
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item className="mb-2" label="Last Name" >
                                            <Input
                                                type="text"
                                                name="lastName"
                                                value={state.lastName}
                                                placeholder="Enter Your Last Name"
                                                className="py-2"
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item className="mb-2" label="Email" required>
                                            <Input
                                                type="email"
                                                name="email"
                                                value={state.email}
                                                placeholder="Enter Your Email"
                                                className="py-2"
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                        <p className='py-2'>If You canot change your Profile than goto <Link to='/' >Dashboard</Link></p>
                                    </Col>
                                    <Col span={24}>
                                        <Button
                                            type="primary"
                                            size="large"
                                            block
                                            htmlType="submit"
                                            loading={isProcessing}
                                            onClick={handleSubmit}
                                        >
                                            Update Profile
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

export default Profile;
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row, Button, Input, Form, message } from 'antd'
import { auth, fireStore } from '../../Config/fireBase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Fade } from 'react-awesome-reveal'
import { doc, setDoc } from 'firebase/firestore'
// import { auth } from 'Components/Config/firebase'


// const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const Register = () => {
    const navigate = useNavigate()
    const initialState = { fullName: "", email: "", password: "", confirmPassword: "", }

    const [state, dispatch] = useState(initialState)

    const [isProcessing, setIsProcessing] = useState(false)
    
    // const [fullName, setFullName] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [confirmPassword, setConfirmPassword] = useState("")
    
    const handleChange = e => dispatch({ ...state, [e.target.name]: e.target.value })
    
  
    const handleSubmit = e => {
        e.preventDefault();

        let { fullName, email, password, confirmPassword } = state
        fullName = fullName.trim()

        if (fullName.length < 3) { return message.error("Please Enter Your Name Correct") }
        // if (isEmail(email)) { return message.error("Please Enter Your Email Correct") }
        if (password.length < 8) { return message.error("Password Must be atleast 8 Chars.") }
        if (confirmPassword !== password) { return message.error("Password does't match.") }

        const userData = { uid: "", fullName, email, password, confirmPassword }
        setIsProcessing(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                message.success("User is Successfully  Register ")
                localStorage.setItem('user-login', true)
                localStorage.setItem('user-uid', user.uid)
                createDocument({ ...userData, uid: user.uid })
                navigate("/");
            })
            .catch((error) => {
                message.error("Account Is AlReady Register", error)
            }).finally(()=>{
                setIsProcessing(false)
            })
    
            // createDocument(userData)
    }
    const createDocument = async (formData) => {
        console.log("formData :>> ", formData);
      
        try {
          await setDoc(doc(fireStore, "users", formData.uid), formData);
          message.success("User created successfully");
        } catch (e) {
          console.error("Error adding document: ", e);
          message.error("Something went wrong while creating the User! ", "error");
          setIsProcessing(false);
        } finally {
          setIsProcessing(false);
        }
      };

    return (
        <main className='auth p-3 p-md-4 p-lg-5'>
            <Fade cascade damping={0.1}>
                <Container>
                    <div className="card p-3 p-md-4 p-lg-4">
                        <Form layout="vertical">
                            <h1 className='mb-4 text-center'>
                                <i>
                                    Register
                                </i>
                            </h1>
                            <Row>
                                <Col span={24}>
                                    <Form.Item label="FullName" required>
                                        <Input type='text' placeholder='Enter Your First Name' name='fullName' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Email" required>
                                        <Input type='email' placeholder='Enter Your Email' name='email' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Password" required>
                                        <Input.Password placeholder='Enter Your Password' name='password' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="ConfirmPassword" required>
                                        <Input.Password placeholder='Enter Your Confirm Password' name='confirmPassword' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Button type='primary' htmlType='submit' onClick={handleSubmit} className='w-100' loading={isProcessing}  >Register</Button>
                                </Col>
                                <Col span={12} className='mt-2'>
                                    <p>
                                        Is Account  Already Register?
                                    </p>
                                </Col>
                                <Col span={12}>
                                    <Link to='/auth/login' className=' mt-2 btn text-center nav-link'>Login</Link>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Container>
            </Fade>
        </main>
    )
}

export default Register


// import { Row, Col, Button, Input, Form, message } from "antd";
// import React from "react";
// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, fireStore} from "../../Config/fireBase";
// import { useNavigate } from "react-router-dom";
// import { doc, setDoc } from "firebase/firestore";

// const Register = () => {
//   const navigate = useNavigate();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [state, setState] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (event) => {
//     setState((previousState) => {
//       return { ...previousState, [event.target.name]: event.target.value };
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     let { fullName, email, password, confirmPassword } = state;
//     fullName = fullName.trim();
//     email = email.trim();
//     password = password.trim();
//     confirmPassword = confirmPassword.trim();
//     if (fullName.length < 3) {
//       return message.error("Full Name must be at least 3 characters", "error");
//     }
//     if (email.length < 3) {
//       return message.error("Email must be at least 3 characters", "error");
//     }
//     if (password.length < 6) {
//       return message.error("Password must be at least 6 characters", "error");
//     }
//     if (confirmPassword !== password) {
//       return message.error("Confirm Password doesn't match Password", "error");
//     }
//     const User = { fullName, email };
//     setIsProcessing(true);

//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed up
//         const user = userCredential.user;
//         createDocument({ ...User, uid: user.uid });
//         navigate("/"); // Navigate to home page upon successful registration
//       })
//       .catch((error) => {
//       message.error("Something went wrong while creating the User! ", "error");
//         console.error(error);
//         setIsProcessing(false);
//       });
//   };

//   const createDocument = async (formData) => {
//     console.log("formData :>> ", formData);

//     try {
//       await setDoc(doc(fireStore, "users", formData.uid), formData);
//     message.error("User created successfully", "success");
//       setIsProcessing(false);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     message.error("Something went wrong while creating the User! ", "error");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="auth p-3 p-md-4 p-lg-5">
//       <div className="container">
//         <div className="card p-3 p-md-4 p-lg-5">
//           <h1 className="text-center text-dark">Register</h1>
//           <Form layout="vertical">
//             <Row>
//               <Col span={24}>
//                 <Form.Item label="Full Name" required>
//                   <Input
//                     type="text"
//                     name="fullName"
//                     placeholder="Enter your Full Name"
//                     onChange={handleChange}
//                   />
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item label="Email" required>
//                   <Input
//                     type="email"
//                     name="email"
//                     placeholder="Enter your Email"
//                     onChange={handleChange}
//                   />
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item label="Password" required>
//                   <Input.Password
//                     name="password"
//                     placeholder="Enter your Password"
//                     onChange={handleChange}
//                   />
//                 </Form.Item>
//               </Col>
//               <Col span={24}>
//                 <Form.Item label="Confirm password" required>
//                   <Input.Password
//                     name="confirmPassword"
//                     placeholder="Confirm Password"
//                     onChange={handleChange}
//                   />
//                 </Form.Item>
//               </Col>
//               <Col className="w-100">
//                 <Button
//                   type="primary"
//                   block
//                   htmlType="submit"
//                   onClick={handleSubmit}
//                   loading={isProcessing}
//                 >
//                   Register
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );

// }
// export default Register;
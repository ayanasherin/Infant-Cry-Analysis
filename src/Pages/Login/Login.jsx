import { Button, Form, Input } from 'antd';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import ModalX from '../../Components/Modal/Modal';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState(false);

    const nav = useNavigate();

    const validateEmail = (value) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        if (!isValid) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const onFinish = async (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleClick = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                if (user) {
                    console.log(user);
                    localStorage.setItem('user', user);
                    localStorage.setItem('userid', user.uid);
                    console.log("logged in");
                    nav('/upload');
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                setError(true);
            });
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 300,
                margin: '40px 0 0'
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
                style={{ width: "300px" }}
            >
                <Input onChange={handleEmailChange} />
                {emailError && <span style={{ color: 'red', width: '20px' }}>{emailError}</span>}
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                style={{ marginBottom: '50px' }}
            >
                <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            {error ? <p style={{ color: 'red' }}>Email or password is incorrect</p> : null}

            <div className='d-flex'>
                <p>Not Registered yet?</p>
                <ModalX source="Register" />
            </div>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 20px 10px' }}
            >


                <Button htmlType="submit" className='login-btn' onClick={handleClick}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;

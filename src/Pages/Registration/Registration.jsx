import React, { useEffect, useState } from 'react';
import { app, auth } from '../../utils/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Form, Input, Select, Spin, notification, } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const Registration = ({ onSuccess }) => {
    const [api, contextHolder] = notification.useNotification();
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const nav = useNavigate();

    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Notification Title',
            description: 'Email already in use',
        });
    };

    const onFinish = async (values) => {
        values.date = date;
        delete values.DatePicker;

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            const db = getFirestore(app);
            const colRef = collection(db, "users");
            const newDocRef = doc(colRef, user.uid);
            if (user) {
                await setDoc(newDocRef, values).then(() => {
                    console.log("Success");
                    setLoading(false);
                    onSuccess();
                }).catch((error) => {
                    console.error("Error saving user data:", error);
                });
            }
        } catch (error) {
            openNotificationWithIcon('error');
            setLoading(false);
            console.error("Error registering user:", error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setDate(dateString);

        function formatDate(inputDate) {
            const date = new Date(inputDate);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate;
        }

        const inputDate = dateString;
        const formattedDate = formatDate(inputDate);
        setDate(formattedDate);
    };

    return (
        <>
            {contextHolder}
            <Form
                {...formItemLayout}
                variant="filled"
                style={{
                    maxWidth: 600,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            min: 8,
                            message: 'Password must be at least 8 characters long!',
                        },
                        {
                            pattern: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                            message: 'Password must contain at least one uppercase letter, one special character, and alphanumeric characters!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label="Gender" name="gender">
                    <Select>
                        <Select.Option value="Female">Female</Select.Option>
                        <Select.Option value="Male">Male</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="DOB"
                    name="DatePicker"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <DatePicker onChange={onChange} value={date} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                >
                    <Button htmlType="submit">
                        Submit {loading ? <Spin
                            indicator={
                                <LoadingOutlined
                                    style={{
                                        fontSize: 17,
                                        marginBottom: "5px",
                                        marginLeft: '5px'
                                    }}
                                    spin
                                />
                            }
                        /> : null}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Registration;

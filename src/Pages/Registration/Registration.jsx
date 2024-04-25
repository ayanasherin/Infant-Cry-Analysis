import React, { useEffect, useState } from 'react';
import { app, auth } from '../../utils/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Form, Input, Select, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';

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
    const [afterDelivery, setAfterDelivery] = useState(false);
    const [babyFieldsEnabled, setBabyFieldsEnabled] = useState(false);
    const [babyDate, setBabyDate] = useState('');
    const nav = useNavigate();

    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Crydecode',
            description: 'Email already in use',
        });
    };

    const onFinish = async (values) => {
        values.date = date;
        values.babyDOB = babyDate;
        values.afterDelivery = afterDelivery;

        if (values.afterDelivery) {
            values.babies = [{
                babyName: values.babyName,
                babyGender: values.babyGender,
                babyDOB: values.babyDOB
            }];
            delete values.babyName;
            delete values.babyGender;
            delete values.babyDOB;
        }

        delete values.DatePicker;

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            const db = getFirestore(app);
            const colRef = collection(db, "users");
            const newDocRef = doc(colRef, user.uid);

            if (user) {
                delete values.password;
                await setDoc(newDocRef, values).then(() => {
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
        setDate(dateString);
    };

    const onBabyDateChange = (date, dateString) => {
        setBabyDate(dateString);
    };

    const toggleBabyFields = (checked) => {
        setAfterDelivery(checked);
        setBabyFieldsEnabled(checked);
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
                        {
                            min: 3,
                            message: 'Username must be at least 3 characters long!',
                        },
                        {
                            max: 50,
                            message: 'Username cannot be longer than 50 characters!',
                        },
                        {
                            pattern: /^[a-zA-Z\s]+$/,
                            message: 'Username must only contain letters and spaces!',
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
                        {
                            type: 'email',
                            message: 'Please enter a valid email!',
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
                    <DatePicker disabledDate={(current) => current && current > moment().endOf('day')} onChange={onChange} value={date} />
                </Form.Item>

                <Form.Item
                    label="After Delivery"
                    name="afterDelivery"
                >
                    <input type="checkbox" onChange={(e) => toggleBabyFields(e.target.checked)} />
                </Form.Item>

                {babyFieldsEnabled && (
                    <>
                        <Form.Item
                            label="Baby Name"
                            name="babyName"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Baby Gender"
                            name="babyGender"
                        >
                            <Select>
                                <Select.Option value="Female">Female</Select.Option>
                                <Select.Option value="Male">Male</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Baby DOB"
                            name="babyDOB"
                        >
                            <DatePicker disabledDate={(current) => current && current > moment().endOf('day')} onChange={onBabyDateChange} value={babyDate} />
                        </Form.Item>
                    </>
                )}

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

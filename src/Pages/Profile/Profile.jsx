import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Avatar } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { auth, firestore, storage } from '../../utils/Firebase'; 
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import './Profile.css';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    const getUserDetails = async () => {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(collection(app.firestore(), "users"), user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
            }
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const onFinish = async (values) => {
        setLoading(true);
        const user = auth.currentUser;
        if (user) {
            try {
                const docRef = doc(collection(app.firestore(), "users"), user.uid);
                await updateDoc(docRef, values);

                if (imageUrl) {
                    const storageRef = storage.ref();
                    const fileRef = storageRef.child(`${user.uid}/profilePicture`);
                    await fileRef.putString(imageUrl, 'data_url');
                    const downloadUrl = await fileRef.getDownloadURL();

                    await user.updateProfile({
                        displayName: values.username,
                        photoURL: downloadUrl,
                    });
                } else {
                    await user.updateProfile({
                        displayName: values.username,
                    });
                }

                message.success('Profile updated successfully!');
            } catch (error) {
                message.error('Failed to update profile. Please try again.');
            }
        }
        setLoading(false);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
            return false;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageUrl(reader.result);
        };
        return false;
    };

    const uploadButton = (
        <div>
            {uploading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <div>
            <h1>Profile</h1>
            {userDetails && (
                <Form
                    name="profile"
                    initialValues={{ username: userDetails.username, email: userDetails.email }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Profile Picture"
                        extra="Upload your profile picture"
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                        >
                            {imageUrl ? <Avatar src={imageUrl} size={64} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
 


);
};

export default Profile;

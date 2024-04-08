import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Avatar, Modal, Select, DatePicker, Collapse } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { auth, storage } from '../../utils/Firebase';
import { getFirestore, collection, updateDoc, arrayUnion } from 'firebase/firestore';
import { app } from '../../utils/Firebase';
import { doc, getDoc } from "firebase/firestore";
import './Profile.css';
import NavbarX from '../../Components/NavbarX.jsx/NavbarX';
import moment from 'moment';

const { Panel } = Collapse;

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedValues, setEditedValues] = useState(null);
    const [addBabyModalVisible, setAddBabyModalVisible] = useState(false);
    const [newBabyDetails, setNewBabyDetails] = useState({
        babyName: '',
        babyGender: '',
        babyDOB: null
    });
    const [editBabyModalVisible, setEditBabyModalVisible] = useState(false);
    const [editedBabyDetails, setEditedBabyDetails] = useState(null);

    const userObject = localStorage.getItem("userid");
    const db = getFirestore(app);

    const getUserDetails = async () => {
        setLoading(true);
        const docRef = doc(db, "users", userObject);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            setLoading(false);
        } else {
            console.log("No such document!");
        }
    };

    const editUserDetails = async () => {
        console.log(editedValues);
        const docRef = doc(db, "users", userObject);
        // Update the user details in Firestore
        await updateDoc(docRef, editedValues);
        setEditModalVisible(false);
        await getUserDetails();
    };

    const handleEditButtonClick = () => {
        setEditModalVisible(true);
        setEditedValues(userDetails);
    };

    const handleAddBabyButtonClick = () => {
        setAddBabyModalVisible(true);
    };

    const handleAddBaby = async () => {
        const docRef = doc(db, "users", userObject);
        // Update user details with the new baby
        await updateDoc(docRef, {
            babies: arrayUnion(newBabyDetails),
            afterDelivery: true
        });
        setAddBabyModalVisible(false);
        await getUserDetails();
    };

    const handleBabyGenderChange = (value) => {
        setNewBabyDetails({ ...newBabyDetails, babyGender: value });
    };

    const handleBabyDateChange = (date, dateString) => {
        setNewBabyDetails({ ...newBabyDetails, babyDOB: dateString });
    };

    const handleEditBaby = (babyIndex) => {
        const selectedBaby = userDetails.babies[babyIndex];
        setEditedBabyDetails({ ...selectedBaby, index: babyIndex }); // Ensure to set index for identification
        console.log(editedBabyDetails)
        setEditBabyModalVisible(true);
    };

    const editBaby = async () => {
        const docRef = doc(db, "users", userObject);
        // Update the baby details in Firestore
        const updatedBabies = userDetails.babies.map((baby, index) =>
            index === editedBabyDetails.index ? editedBabyDetails : baby
        );
        await updateDoc(docRef, { babies: updatedBabies });
        setEditBabyModalVisible(false);
        await getUserDetails();
    };

    useEffect(() => {
        getUserDetails();
    }, []);


    const handleClose = async () => {
        setEditBabyModalVisible(false);
        window.location.reload();
    }

    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        const d = today.getDate() - birth.getDate();

        // Adjust age if birthday hasn't occurred yet this year
        if (m < 0 || (m === 0 && d < 0)) {
            age--;
        }
        return age;
    }


    const age = calculateAge(userDetails?.date);
    console.log(age);

    return (
        <>
            <div>
                <NavbarX />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className='user-ctn'>
                        <img src="mombaby.jpg" className='user-icon' />
                        <div>
                            <h1 style={{ fontSize: '50px' }}>{userDetails?.username}</h1>
                            <p>{userDetails?.gender}</p>
                            <p>{userDetails?.email}</p>
                            <p>Age: {age}</p>
                            <Button onClick={handleEditButtonClick} className='user-btn'>Edit</Button>
                            <Button onClick={handleAddBabyButtonClick} className='user-btn'>Add New Baby</Button>
                        </div>
                    </div>
                )}
            </div>
            <Modal
                title="Edit User Details"
                visible={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                onOk={editUserDetails}
            >
                <Form>
                    <Form.Item label="Username" name="username">
                        <Input defaultValue={editedValues?.username} onChange={(e) => setEditedValues({ ...editedValues, username: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Gender" name="gender">
                        <Select onChange={(value) => setEditedValues({ ...editedValues, gender: value })} defaultValue={editedValues?.gender}>
                            <Select.Option value="Female">Female</Select.Option>
                            <Select.Option value="Male">Male</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input defaultValue={editedValues?.email} />
                    </Form.Item>
                    <Form.Item label="DOB" name="date">
                        <DatePicker disabledDate={(current) => current && current > moment().endOf('day')} onChange={(date, dateString) => setEditedValues({ ...editedValues, date: dateString })} defaultValue={editedValues?.date ? moment(editedValues?.date) : null} />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Add New Baby"
                visible={addBabyModalVisible}
                onCancel={() => { setAddBabyModalVisible(false) }}
                onOk={handleAddBaby}
            >
                <Form>
                    <Form.Item label="Baby Name" name="babyName">
                        <Input value={newBabyDetails.babyName} onChange={(e) => setNewBabyDetails({ ...newBabyDetails, babyName: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Baby Gender" name="babyGender">
                        <Select onChange={handleBabyGenderChange} value={newBabyDetails.babyGender}>
                            <Select.Option value="Female">Female</Select.Option>
                            <Select.Option value="Male">Male</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Baby DOB" name="babyDOB">
                        <DatePicker onChange={handleBabyDateChange} disabledDate={(current) => current && current > moment().endOf('day')} value={newBabyDetails.babyDOB ? moment(newBabyDetails.babyDOB) : null} />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Edit Baby Details"
                visible={editBabyModalVisible}
                onCancel={handleClose}
                onOk={editBaby}
            >
                <Form>
                    <Form.Item label="Baby Name" name="babyName">
                        <Input defaultValue={editedBabyDetails?.babyName} onChange={(e) => setEditedBabyDetails({ ...editedBabyDetails, babyName: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Baby Gender" name="babyGender">
                        <Select onChange={(value) => setEditedBabyDetails({ ...editedBabyDetails, babyGender: value })} defaultValue={editedBabyDetails?.babyGender}>
                            <Select.Option value="Female">Female</Select.Option>
                            <Select.Option value="Male">Male</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Baby DOB" name="babyDOB">
                        <DatePicker disabledDate={(current) => current && current > moment().endOf('day')} onChange={(date, dateString) => setEditedBabyDetails({ ...editedBabyDetails, babyDOB: dateString })} defaultValue={editedBabyDetails?.babyDOB ? moment(editedBabyDetails?.babyDOB) : null} />
                    </Form.Item>
                </Form>
            </Modal>
            <h5 style={{ margin: '20px 200px 10px' }}>Baby Details</h5>
            <div className='collapse-ctn'>
                <Collapse accordion className='collapse-ctn' defaultActiveKey={['0']} >
                    {userDetails?.afterDelivery && userDetails.babies.map((baby, index) => (
                        <Panel header={baby.babyName.charAt(0).toUpperCase() + baby.babyName.slice(1)} key={index}>

                            <div className='baby-ctn' >
                                <div style={{ display: 'flex' }}>
                                    <img src="babyicon.png  " className='baby-icon' />
                                    <div className='baby-dts'>
                                        <h1>{baby.babyName.charAt(0).toUpperCase() + baby.babyName.slice(1)}</h1>
                                        <p>{baby.babyGender}</p>
                                        <p>{baby.babyDOB}</p>
                                    </div>
                                </div>
                                <Button onClick={() => handleEditBaby(index)} style={{ border: 'none', borderRadius: '2px', fontWeight: '500', color: "#1e82b3" }}>Edit</Button>
                            </div>

                            {baby.responses?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((response, responseIndex) => (
                                <div key={responseIndex} className='response-ctn' style={{
                                    display: 'flex', justifyContent: 'space-between', marginTop: '20px', background: '#FAFAFA', border: '1px solid #dfdfdf', padding: '10px 30px 10px', borderRadius: '6px', alignItems: 'center', height: '100%'
                                }}>
                                    <p><b>{response.response}</b></p>
                                    <p>{response.timestamp}</p>
                                </div>
                            ))}


                        </Panel >
                    ))}
                </Collapse >
            </div >
        </>
    );
};

export default Profile;
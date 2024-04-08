import { useState, useEffect } from 'react';
import axios from 'axios';
import Upload from 'antd/es/upload/Upload';
import { UploadOutlined } from '@ant-design/icons'
import { Button } from 'antd';
import './audioupload.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import MFCCProcess from '../../Components/MFCCprocess/MFCCProcess';
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../../utils/Firebase";
import { notification } from 'antd';

function AudioUpload() {
    const [api, contextHolder] = notification.useNotification();
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false); // State to track loading status

    const [spinLoading, setSpinLoading] = useState(false);


    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Crydecode',
            description: 'The response is saved successfully',
        });
    };


    const userid = localStorage.getItem("userid");
    const baby = localStorage.getItem("selectedBaby");
    const babyIndex = localStorage.getItem("selectedBabyIndex");

    const db = getFirestore(app);

    console.log(loading);
    const [log, setLog] = useState(false);
    const user = localStorage.getItem('user');

    useEffect(() => {
        if (user) {
            setLog(true);
        }
    }, [user])

    const onFileChange = (event) => {
        setSelectedFile(event.file);
    };

    const process = () => {
        // Set loading to true initially
        setLoading(true);

        // Use setTimeout to set loading to false after 5 seconds
        setTimeout(() => {
            setLoading(false);
            setSpinLoading(true);
        }, 5000);

    };


    const handleSubmit = async () => {
        setLoading(true);
        if (!selectedFile) {
            setUploadStatus('Please select a file.');
            return;
        }

        // Set loading state while waiting for server response

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://127.0.0.1:5000/process_audio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(baby ? baby + " is " + response.data.predictions[0][0] : "The baby is " + response.data.predictions[0][0]);
            console.log(response.data);
            process();
            setUploadStatus('Uploaded successfully');
        } catch (error) {
            console.error(error);
            setUploadStatus('Error uploading file');
        }
    };

    useEffect(() => {
        // Start loading spinner
        if (spinLoading) {

            // Stop loading spinner after 2 seconds
            setTimeout(() => {
                setSpinLoading(false);
            }, 1000);
        }

        // Clear the timer when component unmounts

    }, [spinLoading]); // This effect will run once on component mount

    const saveResponse = async () => {
        // Create a new response object
        const timestamp = new Date().getTime();
        const date = new Date(timestamp)

        const newResponse = {
            timestamp: date.toLocaleString(),
            response: result,
        };


        try {
            // Get a reference to the user document
            const userDocRef = doc(db, 'users', userid); // Replace userId with the actual user ID

            // Get the user document snapshot
            const userDocSnapshot = await getDoc(userDocRef);

            // Check if the document exists
            if (userDocSnapshot.exists()) {
                // Get the user data
                const userData = userDocSnapshot.data();

                // Check if babies array exists and is iterable
                if (Array.isArray(userData.babies)) {
                    // Check if babyIndex is within the range of babies array
                    if (babyIndex >= 0 && babyIndex < userData.babies.length) {
                        // Check if the baby at babyIndex has responses array
                        if (!userData.babies[babyIndex].responses) {
                            userData.babies[babyIndex].responses = []; // Initialize responses array if not exist
                        }

                        // Push the new response into the responses array
                        userData.babies[babyIndex].responses.push(newResponse);

                        // Update the user document with the modified babies field
                        await updateDoc(userDocRef, { babies: userData.babies });

                        console.log('Response saved successfully');
                        openNotificationWithIcon('success');
                    } else {
                        console.error('Invalid babyIndex');
                    }
                } else {
                    console.error('Babies array is not iterable or does not exist');
                }
            } else {
                console.error('User document does not exist');
            }
        } catch (error) {
            console.error('Error saving response:', error);
        }
    };


    return (
        <div>
            {contextHolder}
            {log ?
                <div className='main-up-ctn'>
                    <div className="upload-ctn">
                        <div>
                            <h2 className='mb-5'>Upload Audio File</h2>
                            <Upload
                                beforeUpload={() => false} 
                                onChange={onFileChange}
                            >
                                <Button icon={<UploadOutlined />} className=''>Select File</Button>
                            </Upload>

                            <Button onClick={handleSubmit} style={{ marginTop: '20px' }}>Submit</Button>
                            <p id="status">{uploadStatus}</p> {/* Update status variable here */}
                        </div>
                        <div>
                            <img src="waveAnim.gif" className="wave-icon2" />
                        </div>

                    </div>
                    {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <img src="vsf.gif" className="wave-icon2" /> <MFCCProcess /></div> : <>{spinLoading ? <Spin
                        indicator={
                            <LoadingOutlined
                                style={{
                                    fontSize: 24,
                                }}
                                spin

                            />
                        }
                    /> : result != "" ? <><h1> {result}</h1>
                        <Button onClick={saveResponse}>Save</Button></> : null}</>}
                </div> : <p>Please login</p>}
        </div>
    );
}

export default AudioUpload;

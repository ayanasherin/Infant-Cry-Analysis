import { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarX from '../../Components/NavbarX.jsx/NavbarX';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import './audioupload.css';
import ModalX from '../../Components/Modal/Modal';
import Login from '../Login/Login';

function AudioUpload() {
    const [status, setStatus] = useState('');
    const [log, setLog] = useState(false);
    const user = localStorage.getItem('user');

    useEffect(() => {
        if (user) {
            setLog(true);
        }
    }, [user])

    const handleUpload = ({ file }) => {
        if (!file) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://127.0.0.1:5000/classify_chop', formData)
            .then(response => {
                setStatus('File uploaded successfully.');
                // You may also handle the response from the server here
            })
            .catch(error => {
                setStatus('Error uploading file.');
            });
    };

    return (
        <>
            <NavbarX />
            {log ?
                <div className='main-up-ctn'>
                    <div className="upload-ctn">

                        <div>
                            <h2 className='mb-5' >Upload Audio File</h2>
                            <Upload
                                action='http://127.0.0.1:5000/classify_chop'
                                onChange={handleUpload}
                            >
                                <Button icon={<UploadOutlined />} className=''>Select File</Button>
                            </Upload>
                            <p id="status">{status}</p>
                        </div>
                        <div>
                            <img src="waveAnim.gif" className="wave-icon2" />

                        </div>
                    </div>
                </div> : <p>Please login</p>}
        </>
    );
}

export default AudioUpload;

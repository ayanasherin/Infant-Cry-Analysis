/* eslint-disable react/prop-types */
import { useReactMediaRecorder } from "react-media-recorder";
import { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";
import './recorder.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import MFCCProcess from "../../Components/MFCCprocess/MFCCProcess";
import { getDoc, updateDoc, doc } from "firebase/firestore";

import { getFirestore } from "firebase/firestore";
import { app } from "../../utils/Firebase";
import { notification } from 'antd';

const Recorder = () => {
    const [api, contextHolder] = notification.useNotification();
    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState("00");
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);
    const [display, setDisplay] = useState(true);
    const [displayWave, setDisplayWave] = useState(false);
    const [playback, setPlayback] = useState(false);
    const [start, setStart] = useState(true)
    const [clear, setClear] = useState(false);
    const [buttonStatus, setButtonStatus] = useState(true);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [spinLoading, setSpinLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Crydecode',
            description: 'The response is saved successfully',
        });
    };

    const userid = localStorage.getItem("userid");
    const baby = localStorage.getItem("selectedBaby");
    const babyIndex = localStorage.getItem("selectedBabyIndex");

    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);

                let computedSecond =
                    String(secondCounter).length === 1
                        ? `0${secondCounter}`
                        : secondCounter;
                let computedMinute =
                    String(minuteCounter).length === 1
                        ? `0${minuteCounter}`
                        : minuteCounter;

                setSecond(computedSecond);
                setMinute(computedMinute);

                setCounter((counter) => counter + 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter]);


    useEffect(() => {
        if (isActive && counter === 8) {
            stopRecording();
            setPlayback(true);
            setClear(true);
            setDisplayWave(false);
            setIsActive(false);
            setButtonStatus(false);
        }
    }, [isActive, counter]);


    function stopTimer() {
        setIsActive(false);
        setCounter(0);
        setSecond("00");
        setMinute("00");

        window.location.reload();
    }

    const {
        status,
        startRecording,
        stopRecording,
        pauseRecording,
        mediaBlobUrl
    } = useReactMediaRecorder({
        video: false,
        audio: true,
        echoCancellation: true,
        type: 'audio/wav'
    });

    function blobToWav(blobData) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const arrayBuffer = reader.result;
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                    // Create a new WAV file
                    const wavData = createWavFile(audioBuffer);
                    resolve(wavData);
                }, reject);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(blobData);
        });
    }

    // Function to create a WAV file from AudioBuffer
    function createWavFile(audioBuffer) {
        const numberOfChannels = audioBuffer.numberOfChannels;
        const sampleRate = audioBuffer.sampleRate;
        const length = audioBuffer.length;

        const interleaved = new Float32Array(length * numberOfChannels);
        const channelData = [];
        for (let i = 0; i < numberOfChannels; i++) {
            channelData.push(audioBuffer.getChannelData(i));
        }

        for (let i = 0; i < length; i++) {
            for (let channel = 0; channel < numberOfChannels; channel++) {
                interleaved[i * numberOfChannels + channel] = channelData[channel][i];
            }
        }

        const wavData = createWavBlob(interleaved, numberOfChannels, sampleRate);
        return wavData;
    }

    // Function to create a WAV Blob from interleaved data
    function createWavBlob(interleaved, numberOfChannels, sampleRate) {
        const buffer = new ArrayBuffer(44 + interleaved.length * 2);
        const view = new DataView(buffer);

        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + interleaved.length * 2, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numberOfChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2 * numberOfChannels, true);
        view.setUint16(32, numberOfChannels * 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, interleaved.length * 2, true);

        interleaved.forEach((sample, index) => {
            view.setInt16(44 + index * 2, sample * 0x7FFF, true);
        });

        return new Blob([view], { type: 'audio/wav' });
    }

    // Function to write string to DataView
    function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

    // Usage example
    const handleSave = async () => {
        setUploading(true);
        try {
            const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
            const convertedBlob = await blobToWav(audioBlob);

            // Create a File object from the converted WAV blob
            const audioFile = new File([convertedBlob], 'recording.wav', { type: 'audio/wav' });

            // Now you can proceed with uploading the converted WAV file
            const formData = new FormData();
            formData.append('file', audioFile);

            // const audioUrl = URL.createObjectURL(audioFile);

            // // Create a hidden anchor element
            // const downloadLink = document.createElement('a');
            // downloadLink.href = audioUrl;
            // downloadLink.download = 'voice.wav';
            // downloadLink.style.display = 'none';

            // // Append the anchor to the body
            // document.body.appendChild(downloadLink);

            // // Click the anchor to trigger the download
            // downloadLink.click();

            // // Clean up: remove the anchor and revoke the URL
            // document.body.removeChild(downloadLink);
            // URL.revokeObjectURL(audioUrl);

            const process = () => {
                // Set loading to true initially
                setLoading(true);

                // Use setTimeout to set loading to false after 5 seconds
                setTimeout(() => {
                    setLoading(false);
                    setSpinLoading(true);
                }, 5000);

            };



            try {
                const response = await axios.post('http://127.0.0.1:5000/process_audio', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data);

                setResult(baby ? baby + " is " + response.data.predictions[0][0] : "The baby is " + response.data.predictions[0][0]);
                process();
                console.log('Uploaded successfully');
                setUploading(false);
                setLoading(true);

            } catch (error) {
                console.error(error);
                setUploading(false);
            }
        } catch (error) {
            console.error('Error converting audio:', error);
        }
    }

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
    const db = getFirestore(app);

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
        <div className={`rec-ctn ${display ? 'expanded' : ''}`}>
            {contextHolder}
            {display ? <div className="items-container">
                <div>

                    {start ? <><h1>Record Cry</h1><p>Press start to record</p> </> : null}

                </div>
                {playback ?
                    <div className="wave-container">
                        <div style={{ marginBottom: "10px", fontWeight: '600', color: 'gray' }}>
                            <span className="minute">{minute}</span>
                            <span>:</span>
                            <span className="second" >{second}</span>
                        </div>

                        <audio src={mediaBlobUrl} controls />
                    </div> : null}

                <div className={displayWave ? "wave-container" : ""}>
                    {displayWave ? <>
                        <div style={{ display: 'flex', alignItems: 'center', fontWeight: "600", fontSize: '18px' }}>
                            <div>
                                <span className="minute">{minute}</span>
                                <span>:</span>
                                <span className="second" style={{ marginRight: "20px" }}>{second}</span>
                            </div>

                            <div >
                                <img src="wave2.gif" className="wave-icon2" />
                            </div>
                        </div>
                    </> : null}


                    <div>
                        <label htmlFor="icon-button-file">

                            <p style={{ fontWeight: "600", margin: "30px 0 10px" }}>
                                {status}
                            </p>



                            <div>
                                {buttonStatus ? <>
                                    <button
                                        className="btns"
                                        onClick={() => {

                                            if (!isActive) {
                                                setDisplayWave(true);
                                                setStart(false);
                                                startRecording();
                                            } else {
                                                pauseRecording();
                                                setClear(true);
                                            }

                                            setIsActive(!isActive);
                                        }}
                                    >
                                        {isActive ? <img className="rec-control-sp" src='./pause2.png' /> : <img className="rec-controls" src='./mic.png' />}
                                    </button>
                                    <button
                                        className="btns"
                                        onClick={() => {
                                            setPlayback(true);
                                            setDisplayWave(false);
                                            stopRecording();
                                            pauseRecording();
                                            setClear(true);
                                            setButtonStatus(false);
                                        }}
                                    >
                                        <img className="rec-control-sp" src='./stop3.png' />
                                    </button>
                                </>
                                    : null}
                                {clear ?
                                    <button className="btns" onClick={stopTimer}>
                                        <img className="rec-control-sp" src='./clear.png' />
                                    </button> : null}

                            </div>
                        </label>
                    </div>
                    <b></b>
                </div>
                {playback ? <Button type="primary" onClick={handleSave} className="up-btn">Upload</Button> : null}

            </div> : <Button type="primary" onClick={() => setDisplay(true)}>Start Recording</Button>
            }

            {uploading ? <p>Uploading..</p> : null}

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
        </div >

    );
};
export default Recorder;

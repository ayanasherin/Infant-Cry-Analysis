import { Modal, Select, Button } from 'antd'; // Import Select from antd
import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../utils/Firebase';
import NavbarX from '../../Components/NavbarX.jsx/NavbarX';
import TabX from '../../Components/Tabs/TabX';

const { Option } = Select; // Destructure Option from Select

const UploadPage = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false); // Set showModal to true initially
    const [selectedBaby, setSelectedBaby] = useState(null);
    const [selectedBabyIndex, setSelectedBabyIndex] = useState(null); // State to store the index
    const [button, setButton] = useState();

    const userObject = localStorage.getItem('userid');
    const user = localStorage.getItem('user');
    const db = getFirestore(app);



    const getUserDetails = async () => {
        setLoading(true);
        const docRef = doc(db, 'users', userObject);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log(docSnap.data());
            setUserDetails(docSnap.data());
            if (docSnap.data()?.babies) {
                setShowModal(true)
                setButton(true);
            } else {
                setShowModal(false)
                setButton(false);
            }
            setLoading(false);
        } else {
            console.log('No such document!');
        }
    };

    const handleSelectBaby = (babyName, index) => { // Modify handleSelectBaby to accept index
        setSelectedBaby(babyName);
        setSelectedBabyIndex(index); // Set the selected index
        setShowModal(false);
        setButton(false);
        localStorage.setItem('selectedBaby', babyName);
        localStorage.setItem('selectedBabyIndex', index); // Store the index in local storage
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div>
            <NavbarX />
            {user ?
                <>
                    <TabX />

                    <Modal
                        title="Select Baby"
                        visible={showModal}
                        onCancel={() => setShowModal(false)}
                        footer={null}
                    >
                        <Select defaultValue="Select a baby" style={{ width: 200 }} onChange={(value, option) => handleSelectBaby(value, option.key)}>
                            {userDetails &&
                                userDetails.babies?.map((baby, index) => (
                                    <Option key={index} value={baby.babyName}>
                                        {baby.babyName}
                                    </Option>
                                ))}
                        </Select>
                    </Modal>

                    <div className="footer" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        {button ?

                            <Button className="item" onClick={() => setShowModal(true)}>
                                Select Baby
                            </Button> : null}

                        <div className="item">{selectedBaby && <span><br />Selected Baby: {selectedBaby}</span>}</div>
                        <div className="item"></div>
                    </div>
                </> : <p>Please login</p>}
        </div >
    );
};

export default UploadPage;

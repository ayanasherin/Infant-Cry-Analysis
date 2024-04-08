import { useState } from 'react';
import { Button, Modal } from 'antd';
import Login from '../../Pages/Login/Login';
import './modal.css';
import Registration from '../../Pages/Registration/Registration';

const ModalX = ({ source, item }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleRegistrationSuccess = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div>
                {source == 'Register' ?
                    <Button onClick={showModal} style={{ padding: '0px', height: '0px', border: 'none', color: "#1e82b3", marginLeft: '10px' }}>
                        {source}
                    </Button> : source == "Login" ?
                        <Button onClick={showModal} className='btn' style={{ fontWeight: '600', color: '#1e82b3' }}>
                            {source}
                        </Button> : <Button onClick={showModal} className='btn' style={{ fontWeight: '600', color: '#1e82b3' }}>
                            {source}
                        </Button>

                }
            </div>
            <Modal title={source} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} className='modalx'>
                {item == "login" ?
                    <Login className="login-ctn" />
                    : <Registration onSuccess={handleRegistrationSuccess} />}
            </Modal>
        </>
    );
};

export default ModalX;

import { Button, Dropdown } from 'antd';
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './dropdown.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

const DropDownX = () => {

    const nav = useNavigate();
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {

            localStorage.clear();
            nav('/');
        }).catch((error) => {
            console.log(error);
        });

    }
    const items = [
        {
            key: '1',
            label: (
                <Link target="_blank" rel="noopener noreferrer" href="/profile">
                    Profile
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link onClick={handleLogout}>
                    Logout
                </Link>
            ),
        },

    ];



    return (
        <>


            <Dropdown
                menu={{
                    items,
                }}
                placement="bottomRight"
                arrow
            >
                <Button style={{ background: 'none', border: 'none' }}> <Space direction="vertical" size={16}>
                    <Space wrap size={16}>
                        <Avatar size="large" icon={<UserOutlined />} />
                    </Space>
                </Space></Button>
            </Dropdown>
            <br />

        </>
    )
};
export default DropDownX;
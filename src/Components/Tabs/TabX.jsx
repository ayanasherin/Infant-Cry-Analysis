import { Tabs } from 'antd';
import Recorder from '../../Pages/Recorder/Recorder';
import AudioUpload from '../../Pages/AudioUpload/AudioUpload';

const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Record',
        children: <Recorder />,
    },
    {
        key: '2',
        label: 'Upload',
        children: <AudioUpload />,
    },

];

const customTabBarStyle = {
    textAlign: 'center',
};

const customContentStyle = {
    textAlign: 'center', // Align content to the left
};

const TabX = () => (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} tabBarStyle={customTabBarStyle} centered>
        {items.map(item => (
            <Tabs.TabPane key={item.key} tab={item.label}>
                <div style={customContentStyle} >
                    {item.children}
                </div>
            </Tabs.TabPane>
        ))}
    </Tabs>
);
export default TabX;

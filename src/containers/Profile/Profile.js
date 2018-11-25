import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProfileHeader from './ProfileHeader';
import Body from './Body';

const { Header, Sider, Content } = Layout;

const Profile = () => (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(90deg,#553377, #3E72A7)' }}>
        <Layout>
            <Sider > <Sidebar /> </Sider>
            <Layout>
                <Header style={{ padding: '0 0 0 0', background: 'transparent' }}> <ProfileHeader /> </Header>
                <Content> <Body /> </Content>
            </Layout>
        </Layout>
    </div>
);

export default Profile;

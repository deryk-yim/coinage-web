import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Layout } from 'antd';
import styles from './Profile.css';
import ProfileHeader from './ProfileHeader';
import Body from './Body';

const { Header, Footer, Sider, Content } = Layout;


class Profile extends Component {
  render() {
    return (
        <div style={{minHeight:'100vh', background: 'linear-gradient(90deg,#553377, #3E72A7)'}}>
            <Layout>
                <Sider > <Sidebar/> </Sider>
                <Layout>
                    <Header style={{padding: '0 0 0 0', background:'transparent'}}> <ProfileHeader/> </Header>
                    <Content> <Body/> </Content> 
                </Layout>
            </Layout>
        </div>
    )
  }
}

export default Profile;
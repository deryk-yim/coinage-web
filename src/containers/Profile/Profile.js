import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Layout } from 'antd';
<<<<<<< HEAD
=======
import styles from './Profile.css';
>>>>>>> refs/remotes/origin/dashboard
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Body from './Body';

const { Header, Footer, Sider, Content } = Layout;

<<<<<<< HEAD
class Profile extends Component {
    render() {
        return (
            <div style={{height:'100vh', background: 'linear-gradient(90deg,#553377, #3E72A7)'}}>
                <Layout>
                    <Sider> <Sidebar/> </Sider>
                    <Layout>
                        <Header style={{padding: '0 0 0 0', background:'transparent'}}> <CustomHeader/> </Header>
                        <Content> <Body/> </Content>
                    </Layout>
                
 
                </Layout>
            </div>
        )

    }

=======

class Profile extends Component {
  render() {
    return (
        <div style={{height:'100vh', background: 'linear-gradient(90deg,#553377, #3E72A7)'}}>
            <Layout>
                <Sider> <Sidebar/> </Sider>
                <Layout>
                    <Header style={{padding: '0 0 0 0', background:'transparent'}}> <CustomHeader/> </Header>
                    <Content> <Body/> </Content> 
                </Layout>
            </Layout>
        </div>
    )
  }
>>>>>>> refs/remotes/origin/dashboard
}

export default Profile;
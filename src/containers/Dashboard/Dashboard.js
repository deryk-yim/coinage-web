import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Layout } from 'antd';
import styles from './Dashboard.css';
import CustomHeader from './CustomHeader';
import Body from './Body';

const { Header, Footer, Sider, Content } = Layout;


class Dashboard extends Component {
  render() {
    return (
        <div style={{height:'100vh', background: 'linear-gradient(90deg,#553377, #3E72A7)'}}>
            <Layout>
                <Sider> <Sidebar/> </Sider>
                <Layout>
                    <Header style={{padding: '0 0 0 0', background:'transparent'}}> <CustomHeader/> </Header>
                    <Content> <Body/> </Content> <div></div>
                </Layout>
            </Layout>
        </div>
    )
  }
}

export default Dashboard;

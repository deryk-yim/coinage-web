import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import InsightsHeader from './InsightsHeader';
import { Layout } from 'antd';
import Body from './Body';

const { Header, Footer, Sider, Content } = Layout;

class Insights extends Component {
    render() {
        return(
            <div style={{height:'100vh', background: 'linear-gradient(90deg,#553377, #3E72A7)'}}>
                <Layout>
                    <Sider> <Sidebar/> </Sider>
                    <Layout>
                        <Header style={{padding: '0 0 0 0', background:'transparent'}}> <InsightsHeader/> </Header>
                        <Content> <Body/> </Content>  
                    </Layout>
                </Layout>
            </div>
        )
    }    
};

export default Insights;
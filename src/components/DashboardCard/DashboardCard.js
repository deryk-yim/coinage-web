import React from 'react';
import Dashboard from '../../containers/Dashboard/Dashboard';
import {DASHBOARD_CARD, DASHBOARD_CARD_TITLE, DASHBOARD_CARD_DAY_COUNTER, DASHBOARD_CIRCLE} from '../DashboardCard/DashboardCardStyle';
import { Form, Icon, Input, Button, Layout } from 'antd';


const { Header, Footer, Sider, Content } = Layout;

class DashboardCard extends React.Component {
    render() {
        return(
            <div style={DASHBOARD_CARD}>
                <Layout>
                    <div style={{textAlign: 'center', padding: '50px 0 50px 0'}}>
                        <Header style={DASHBOARD_CIRCLE}>600</Header>

                    </div>
                    <Content style={DASHBOARD_CARD_TITLE}> Transaction </Content>
                    <Footer style={DASHBOARD_CARD_DAY_COUNTER}> In the Past 30 Days </Footer>
                </Layout>
            </div>
        )
    }
}

export default DashboardCard; 
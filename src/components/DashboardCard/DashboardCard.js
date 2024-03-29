import React from 'react';
import { Icon, Button, Layout } from 'antd';
import { DASHBOARD_CARD, DASHBOARD_CARD_TITLE, DASHBOARD_CARD_DAY_COUNTER, DASHBOARD_CIRCLE, DASHBOARD_CARD_DROPDOWN, DASHBOARD_CARD_DROPDOWN_HEADER } from '../DashboardCard/DashboardCardStyle';


const { Header, Footer, Content } = Layout;
const linearGradientValue = `linear-gradient(${backgroundAngle}deg, backgroundColors)`;
const DashboardCard = ( backgroundAngle, backgroundColor) => (
    <div style={{ ...DASHBOARD_CARD, background: linearGradientValue }} >
        <Layout>
            <Header style={DASHBOARD_CARD_DROPDOWN_HEADER}>
                <Button style={DASHBOARD_CARD_DROPDOWN}><Icon type="down" /> </Button>
            </Header>
            <div style={{ textAlign: 'center', padding: '10px 0 40px 0' }}>
                <Content style={DASHBOARD_CIRCLE}>{this.props.value}</Content>

            </div>
            <Content style={DASHBOARD_CARD_TITLE}> {this.props.label} </Content>
            <Footer style={DASHBOARD_CARD_DAY_COUNTER}> {this.props.timeFrame} </Footer>
        </Layout>
    </div>
);
export default DashboardCard;

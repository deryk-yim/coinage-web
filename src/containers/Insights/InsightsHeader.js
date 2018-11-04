import React, { Component } from 'react';
import Insights from './Insights';
import {CONTAINER, HEADER_BUTTON} from './InsightsHeaderStyle';
import { Menu, message, Form, Icon, Input, Button, Row, Col, Dropdown} from 'antd';

function handleButtonClick(e) {
    
    console.log('click left button', e);
  }
  
  function handleMenuClick(e) {
   
    console.log('click', e);
  }
  
  const menu = (
    <Menu onClick={handleMenuClick} style={HEADER_BUTTON} >
      <Menu.Item key="1">Past 6 Months</Menu.Item>
      <Menu.Item key="2">Monthly</Menu.Item>
      <Menu.Item key="3">Yearly</Menu.Item>
    </Menu>
  );

  const filter = (
        <Menu onClick={handleMenuClick} style={HEADER_BUTTON} >
            <Menu.Item key="1">Food</Menu.Item>
            <Menu.Item key="2">Education</Menu.Item>
            <Menu.Item key="3">Transportation</Menu.Item>
        </Menu> 

  );
  

class InsightsHeader extends Component {
    render() {
        return(
            <div classname="header-custom" style={CONTAINER}>
            <Col span={1}></Col>
            <Col span={3}>
                    <Dropdown overlay={menu}>
                    <Button style={HEADER_BUTTON}>
                    Past 6 Months <Icon type="down" />
                    </Button>
                </Dropdown>
            </Col>
            <Col span={3}>
                <Dropdown overlay={filter}>
                    <Button style={HEADER_BUTTON}>
                    Filter <Icon type="down" />
                    </Button>
                </Dropdown>
            </Col>
            <Col span={12}></Col>
            <Col span={2}>
                <Button style={HEADER_BUTTON}><Icon type="search" /> Search</Button>
            </Col>
            <Col span={2}>
                <Button style={HEADER_BUTTON}><Icon type="user" /> Profile</Button>
            </Col>
            <Col span={1}></Col>

        </div>

        )
    }
}
export default InsightsHeader;
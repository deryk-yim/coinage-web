import React from 'react';
import { CONTAINER, HEADER_BUTTON } from './CustomHeaderStyle';
import { Icon, Button, Col} from 'antd';

class CustomHeader extends React.Component {
    render(){
        return(
            <div className="header-custom" style={CONTAINER}>
                <Col span={1}></Col>
                <Col span={3}>
                    <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Add Transaction</Button>
                </Col>
                <Col span={3}>
                    <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Add Bill</Button>
                </Col>
                <Col span={3}>
                    <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Add Category</Button>
                </Col>
                <Col span={7}></Col>
                <Col span={3}>
                    <Button style={HEADER_BUTTON}><Icon type="search" /> Search</Button>
                </Col>
                <Col span={3}>
                    <Button style={HEADER_BUTTON}><Icon type="user" /> Profile</Button>
                </Col>
                <Col span={1}></Col>

            </div>
        )
    }
}

export default CustomHeader;
import React from 'react';
import Dashboard from '../../containers/Dashboard/Dashboard';
import {CONTAINER, HEADER_BUTTON} from './CustomHeaderStyle';
import { Form, Icon, Input, Button} from 'antd';
import { Grid, Row, Col } from '../../components/Grid/Grid'; 
class CustomHeader extends React.Component {
    render(){
        return(
            <div className="header-custom" style={CONTAINER}>
                {/*<Col span={1}></Col>
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
                <Col span={1}></Col>*/}

                <Grid>
                    <Row >
                        <Col size={{xs: 12, sm:3}}>
                            <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Add Transaction</Button>
                        </Col>
                        <Col size={{xs: 12, sm:2}}>
                            <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Add Bill</Button>
                        </Col>
                        <Col size={{xs: 12, sm:2}}>
                            <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Add Category</Button>
                        </Col>
                        <Col size={{xs: 12, sm:2}}>
                            <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Add Category</Button>
                        </Col>
                    </Row>


                </Grid>

            </div>
        )
    }
}

export default CustomHeader;
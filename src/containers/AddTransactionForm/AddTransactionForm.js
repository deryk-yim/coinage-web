import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button, Checkbox, DatePicker} from 'antd';
const Option = Select.Option;
const { TextArea } = Input;

class AddTransactionForm extends React.Component {

    componentDidMount(){
    }


   
    

      
 


    createTransaction = (e) => {
        e.preventDefault();
       
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;       
        const dateConfig = {
            rules: [{ type: 'object', required: true, message: 'Please select a date!'}],
        };
        const descConfig = {
            rules: [{ type: 'input', required: true, message: 'Describe Transaction!'}],
        };






        return (

        
    
                <Form onSubmit={this.createTransaction}  >
                    <Form.Item label='Transaction Date'>
                        
                    {getFieldDecorator('date-picker', dateConfig ) (
                        <DatePicker placeholder ="Select Transaction Date"/>
                    )}
                    </Form.Item>

                    <Form.Item label='Description'>

                    {getFieldDecorator('description-textarea', descConfig ) (
                        <TextArea rows={4} placeholder="Description" />
                    )}
                    </Form.Item>

                    <Form.Item>
                        <Input name="amount" type="text" placeholder="Amount" />
                    </Form.Item>

                    <Form.Item>
                        <Input name="currency" type="text" placeholder="Currency"  />
                    </Form.Item>

                    <Form.Item>
                        <Select defaultValue="Category" style={{ width: 200 }}>
                            <Option value="Porn">Porn</Option>
                            <Option value="Grandmas Gone Wild">Grandmas Gone Wild </Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                    <Checkbox> Bill </Checkbox>
                    </Form.Item>
                    <Form.Item>
                    <Checkbox> Income </Checkbox>
                    </Form.Item>
                    <Form.Item>
                    <Checkbox> Life Expense </Checkbox>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form>

   

        )
    }

}


export default Form.create()(AddTransactionForm);
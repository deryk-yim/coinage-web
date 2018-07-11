import React from 'react';
import { Button, Modal, Form, Input, Select, DatePicker } from 'antd';
import { InputNumber } from 'antd';

const Option = Select.Option;
const { TextArea } = Input;
const moment = require('moment');


const AddTransactionForm = Form.create()(

    class extends React.Component {
        handleCategoryChange = (value) => {
            this.props.getCategory(value['label']);
        }

        render() {
            const { visible, onCancel, onCreate, form } = this.props;

            const { getFieldDecorator } = this.props.form;

            const dateConfig = {
                rules: [{ required: true, message: 'Please select a date!' },]
            };
            const descConfig = {
                rules: [{ required: true, message: 'Describe Transaction!' },]
            };
            const amountConfig = {
                rules: [{ required: true, message: 'Please input amount!' },]
            };

            return (
                <Modal
                    visible={visible}
                    title="Add Transaction"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">


                        <Form.Item label='Transaction Date'>

                            {getFieldDecorator('date-picker', dateConfig)(
                                <DatePicker placeholder="Select Transaction Date" />
                            )}

                        </Form.Item>

                        <Form.Item label='Description'>

                            {getFieldDecorator('description-textarea', descConfig)(
                                <TextArea rows={4} placeholder="Description" />
                            )}
                        </Form.Item>

                        <Form.Item label='Amount'>
                            {getFieldDecorator('amount-InputNumber', amountConfig)(
                                <InputNumber
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    max={1000000}
                                    min={0}
                                />
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('select-Category')}
                            <Select labelInValue defaultValue={{ key: 'Category' }} style={{ width: 200 }} onChange={this.handleCategoryChange}>
                                <Option value="5ab9de687fa8cebf1e3c44e6">5ab9de687fa8cebf1e3c44e6</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

class AddTransactionPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            optionValue: '',
            newRecord: {}
        };
    }
    getCategory = (category) => {
        this.setState({
            optionValue: category
        })

    }

    handlePassNewRecord = (newRecord) => {
        this.props.addRecordToState(newRecord);
    }

    createJSONObject = (formInputs) => {
        const jsonData = {
            transactionDate: moment(new Date(formInputs['date-picker'])).format('MMM DD, YYYY'),
            category: this.state.optionValue,
            amount: parseFloat(formInputs['amount-InputNumber']).toFixed(2),
            description: formInputs['description-textarea'],
            _id: '5ac8615a3e351c3dccba5607',
            _pid: '5aa43585955a2561e0935cdb'
        };
        return jsonData;
    }

    addTransaction = (transaction) => {
        const endpoint = 'http://localhost:3000/transaction/create/1/5aa43585955a2561e0935cdb';

        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(
                res => {
                    if (res.status === 201) {
                        console.log('Success');
                    }
                    return res.json();
                }
            )
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success: ', response))
    };

    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            //error was hitting because category was manditory and type was array.
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);

            console.log(this.createJSONObject(values));
            // create the json object
            // add to transactions
            this.addTransaction(this.createJSONObject(values));
            this.handlePassNewRecord(this.createJSONObject(values));

            form.resetFields();
            this.setState({ visible: false });
            // do addToTransaction
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        return (
            <div>
                <Button onClick={this.showModal}>+ Add Transaction</Button>
                <AddTransactionForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    getCategory={this.getCategory}

                />
            </div>
        );
    }
}

export default AddTransactionPage;
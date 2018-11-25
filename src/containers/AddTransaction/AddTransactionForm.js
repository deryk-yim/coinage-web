import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Select, DatePicker, InputNumber } from 'antd';
import { addTransactionCategory } from '../../actions/actionsAddTransaction';

const Option = Select.Option;
const { TextArea } = Input;

const AddTransactionForm = Form.create()(
  class extends React.Component {
    handleCategoryChange = (value) => {
      this.props.addTransactionOption(value);
    }

    render() {
      const { visible, onCancel, onCreate } = this.props;
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
      const optionItems = this.props.categories.map((item) =>
        <Option value={item._id}>{item['name']}</Option>
      );

      return (
        <Modal
          visible={visible}
          title="Add Transaction"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Transaction Date">
              {getFieldDecorator('date-picker', dateConfig)(
                <DatePicker placeholder="Select Transaction Date" />,
              )}

            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description-textarea', descConfig)(
                <TextArea rows={4} placeholder="Description" />,
              )}
            </Form.Item>
            <Form.Item label="Amount">
              {getFieldDecorator('amount-InputNumber', amountConfig)(
                <InputNumber
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  max={1000000}
                  min={0}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('select-Category')}
              <Select labelInValue defaultValue={{ key: 'New Category' }} style={{ width: 200 }} onChange={this.handleCategoryChange}>
                {optionItems}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    categorySelected: state.postAddTransactionCategory.postCategory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTransactionOption: (option) => dispatch(addTransactionCategory(option))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionForm);
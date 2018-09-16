import React from 'react';
import { Button, Table, Icon, Spin, Form, Select, Input, InputNumber, Popconfirm, DatePicker} from 'antd';
const EditableContext = React.createContext();
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


class EditableTransactionCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {
          
          
          
          (form) => {

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
            <Option value={item['_id']}>{item['name']}</Option>
          );
          return (
            <td {...restProps}>
              {editing ? (
                <Form>
                  <FormItem label='Transaction Date'>
                    {form.getFieldDecorator('date-picker', dateConfig)(
                      <DatePicker placeholder="Select Transaction Date" />
                    )}

                  </FormItem>
                  <FormItem label='Description'>
                    {form.getFieldDecorator('description-textarea', descConfig)(
                      <TextArea rows={4} placeholder="Description" />
                    )}
                  </FormItem>
                  <FormItem label='Amount'>
                    {form.getFieldDecorator('amount-InputNumber', amountConfig)(
                      <InputNumber
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        max={1000000}
                        min={0}
                      />
                    )}
                  </FormItem>
                  <FormItem>
                    {form.getFieldDecorator('select-Category')}
                    <Select labelInValue defaultValue={{ key: 'New Category' }} style={{ width: 200 }} onChange={this.handleCategoryChange}>
                      {optionItems}
                    </Select>
                  </FormItem>
                  </Form>




              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

export default EditableTransactionCell;
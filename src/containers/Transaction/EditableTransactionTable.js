import React from 'react';
import { Button, Table, Icon, Spin, Form, Select, Input, InputNumber, Popconfirm, DatePicker } from 'antd';

//import EditableTransactionCell from '../Transaction/EditableTransactionCell';
const EditableContext = React.createContext();

const FormItem = Form.Item;
const moment = require('moment');

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    transactionDate: '2018-09-08', // cannot be string 
    category: 'clam',
    description: `London Park no. ${i}`,
    amount: 32
  });
  console.log(data);
}


function onChange(date, dateString) {
  console.log(date, dateString);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}

const Option = Select.Option;


const dateFormat = 'YYYY/MM/DD';

class EditableTransactionCell extends React.Component {

  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    if (this.props.inputType === 'text') {
      return <Input />;
    }
    if (this.props.inputType === 'dropdown') {
      return (<Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a category"
        optionFilterProp="children"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>);
    }
    if (this.props.inputType === 'date') {
      return <DatePicker onChange={onChange}/>
    }
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
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: dataIndex === 'transactionDate' ? moment(record[dataIndex]): record[dataIndex]
                  }
                )(this.getInput(record))
                  }
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}


class EditableTransactionTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      editingKey: ''
    };



    this.columns = [{
      title: 'Transaction Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      editable: true
    },


    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => {
        if (a.category < b.category) {
          return -1
        }
        if (a.category > b.category) {
          return 1;
        }
        return 0;
      },
      editable: true
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      editable: true
    },


    {
      title: 'Amount', dataIndex: 'amount', key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      editable: true
    },
    {
      title: 'operation',
      dataIndex: 'operation',

      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      href="javascript:;"
                      onClick={() => this.save(form, record.key)}
                      style={{ marginRight: 8 }}
                    >
                      Save
                        </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="Sure to cancel?"
                  onConfirm={() => this.cancel(record.key)}
                >
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
                <a onClick={() => this.edit(record.key)}>Edit</a>
              )}
          </div>
        );
      },
    },
    ];




  }






  handleAdd = () => {
    const { data } = this.state;
    const newData = {
      transactionDate: moment().format(), // cannot be string 
      category: 'clam',
      description: '',
      amount: 32
    };
    this.setState({
      data: [...data, newData]

    });
  }

  isEditing = (record) => {
    console.log(record);
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
    console.log(key);
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableTransactionCell,
      },
    };

    const columns = this.columns.map((col) => {







      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => (



          {
            record,
            inputType: col.dataIndex === 'amount' ? 'number' : (col.dataIndex === 'description' ? 'text' : (col.dataIndex === 'transactionDate' ? 'date' : 'dropdown')),
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
      };
    });

    // 
    return (
      <div>

        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>



        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row" />
      </div>
    );
  }
}

export default EditableTransactionTable;
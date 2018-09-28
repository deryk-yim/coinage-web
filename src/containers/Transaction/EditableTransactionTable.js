import React from 'react';
import '../Transaction/EditableTransactionTable.css';
import { Button, Table, Icon, Spin, Form, Select, Input, InputNumber, Popconfirm, DatePicker } from 'antd';
const moment = require('moment');

const data = [];

for (let i = 0; i < 50; i++) {
  data.push({
    key: i.toString(),
    transactionDate: '2018-09-08', // cannot be string 
    category: 'clam',
    description: `London Park no. ${i}`,
    amount: 32
  });

}

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
const Option = Select.Option;

class EditableCell extends React.Component {

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
        optionFilterProp="children">
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>);
    }
    if (this.props.inputType === 'date') {
      return <DatePicker />
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
                    initialValue: dataIndex === 'transactionDate' ? moment(record[dataIndex]) : record[dataIndex]
                  }
                  )(this.getInput())}
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
      editingKey: '',
      count: 101,
      pendingKeys: []
    };

    this.columns = [
      {
        title: 'Count',
        dataIndex: 'key'
      },
      {
        title: 'Transaction Date',
        dataIndex: 'transactionDate',
        editable: true
      },
      {
        title: 'Category',
        dataIndex: 'category',
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
                        style={{ marginRight: 8 }}>
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
    const {
      data,
      count,
      pendingKeys
    } = this.state;

    const newData = {
      key: count,
      transactionDate: moment().format('YYYY-MM-DD'),
      category: '',
      description: '',
      amount: ''
    };
    this.edit(newData.key);
    this.setState({
      data: [...data, newData],
      pendingKeys: [...pendingKeys, newData.key],
      count: count + 1
    });
  }

  onSave = () => {
    alert("BIG SAVE");
    this.setState(
      {
        pendingKeys: []
      }
    );
  }

  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  onRow = ({ key }) => this.state.pendingKeys.includes(key) && { className: "pending-transaction" };



  save(form, key) {
    form.validateFields((error, row) => {

      if (error) {
        return;
      }
      const newData = [...this.state.data];

      const newPendingKeys = [...this.state.pendingKeys];

      const index = newData.findIndex(item => key === item.key);
      console.log('Index ' + index);
      if (index > -1) {
        const item = newData[index];
        row['transactionDate'] = moment(row['transactionDate']);
        newData.splice(index, 1, {
          key: item['key'],
          transactionDate: moment(row['transactionDate']).format('YYYY-MM-DD'), // cannot be string 
          category: row['category'],
          description: row['description'],
          amount: row['amount']
        });
        newPendingKeys.push(item['key']);
        this.setState(
          {
            data: newData,
            pendingKeys: newPendingKeys,
            editingKey: ''
          }
        );
      } else {
        alert('bu');
        newData.push(row);
        newPendingKeys.push(row['key']);
        this.setState(
          {
            data: newData,
            pendingKeys: newPendingKeys,
            editingKey: ''
          }
        );
      }
    }
    );
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
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

    return (
      <div>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          onRow={this.onRow}
        />
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16, marginLeft: 20, marginRight: 30 }}>
          Add a row
        </Button>
        <Button onClick={this.onSave} type="primary" style={{ marginBottom: 16 }}>
          SAVE
        </Button>
      </div>);
  }
}

export default EditableTransactionTable;
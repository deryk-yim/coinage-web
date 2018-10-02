import React from 'react';
import { connect } from 'react-redux';
import { addTransactionCategory, addTransaction} from '../../actions/actionsAddTransaction';
import { addTransactionToServer } from '../AddTransaction/AddTransaction';
import '../Transaction/EditableTransactionTable.css';
import { Button, Table, Icon, Spin, Form, Select, Input, InputNumber, Popconfirm, DatePicker } from 'antd';
const addTransactionEndpoint = 'http://localhost:3000/transaction/create/1/5aa43585955a2561e0935cdb';

const moment = require('moment');
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
      const options = this.props.categories.map((item) =>
      <Option value={item['_id']}>{item['name']}</Option>);
        return (            
          <Select showSearch style={{ width: 200 }} placeholder="Select a category" optionFilterProp="children">
          {options}
          </Select>
        );
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
      data: [],
      editingKey: '',
      count: 0,
      pendingKeys: [],
      loading: false,
      selectedRowKeys: []
    };

    this.columns = [
      {
        title: 'Id',
        dataIndex: '_id'
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
        title: 'Edit',
        dataIndex: 'edit',
        render: (text, record) => {
          console.log(record);
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record._id)}
                        style={{ marginRight: 8 }}>
                        Save
                        </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record._id)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                  <a onClick={() => this.edit(record._id)}><Icon type='edit'/></a>
                )}
            </div>
          );
        },
      },
    ];
  }

  handleAdd = () => {
    // for adding, fire redux actions
    const {
      data,
      count
    } = this.state;

    const newData = {
      key: count,
      transactionDate: moment().format('YYYY-MM-DD'),
      category: '',
      description: '',
      amount: ''
    };
    this.edit(newData._id);

    // add to redux and 


    /*
    
    addTransactionToServer(newData, addTransactionEndpoint);
    */
   this.props.transaction(newData);
   /*
    this.setState({
      data: [...data, newData],
      count: count + 1
    });
    */

    // check all fields are not empty then add
    

    // after then set key back to count 0


  }

  isEditing = (record) => {
    return record._id === this.state.editingKey;
  };

  edit(_id) {
    this.setState({ editingKey: _id });
  }

  onRow = ({ _id }) => this.state.pendingKeys.includes(_id) && { className: "pending-transaction" };

  save(form, key) {

    // fire off into redux store this.props.transactions
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.props.transactions];
      console.log("MAGIC: " + this.props.transactions);
      console.log("new Data List: " + newData);
      const index = this.props.transactions.findIndex(item => key === item._id);
      console.log('Index ' + index);
      if (index > -1) {
        alert("index present");
        const item = newData[index];
        row['transactionDate'] = moment(row['transactionDate']);
        newData.splice(index, 1, {
          key: item['_id'],
          transactionDate: moment(row['transactionDate']).format('YYYY-MM-DD'), // cannot be string 
          category: row['category'],
          description: row['description'],
          amount: row['amount']
        });
        console.log('--------------ITEM --------------------');
        console.log('Item Key: ' + item['_id']);
        console.log('Item date: ' + item['transactionDate']);
        console.log('Item category: ' + item['category']);

        console.log('--------------Row --------------------');
        console.log('Item Key: ' + row['_id']);
        console.log('Item date: ' + row['transactionDate']);
        console.log('Item category: ' + row['category']);

        // updateTransactionById
        this.setState(
          {
            data: newData,
            editingKey: ''
          }
        );
      } else {
        newData.push(row);
        alert("2");
        // this piece -- add to the redux store, data isnt being used to show the data on the table
        this.setState(
          {
            data: newData,
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

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {

    const { selectedRowKeys } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: connect(mapStateToProps)(EditableCell),
      },
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;
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
          rowSelection={rowSelection}
          components={components}
          bordered
          dataSource={this.props.transactions}
          columns={columns}
          onRow={this.onRow}
        />
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16, marginLeft: 20, marginRight: 30 }}>
          Add a row
        </Button>
        <span> {this.props.categories.length} </span>
      </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      addTransactionOption: (option) => dispatch(addTransactionCategory(option)),
      transaction: (transaction) => dispatch(addTransaction(transaction)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditableTransactionTable);
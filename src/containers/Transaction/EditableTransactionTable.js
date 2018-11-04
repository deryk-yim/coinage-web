import React from 'react';
import { connect } from 'react-redux';
import { addTransactionCategory, addTransaction } from '../../actions/actionsAddTransaction';
import { addTransactionToServer } from '../AddTransaction/AddTransaction';
import { removeTransactions } from '../../actions/actionDeleteTransaction';
import { transactionsFetchData } from '../../actions/actionTransaction';
import { Button, Table, Icon, Spin, Form, Select, Input, InputNumber, Popconfirm, DatePicker } from 'antd';
import { deleteTransactionFromServer } from '../DeleteTransaction/DeleteTransaction';
import { editTransactionFromServer } from '../EditTransaction/EditTransaction';
import '../Transaction/EditableTransactionTable.css';

const addTransactionEndpoint = 'http://localhost:3000/transaction/create/1/5aa43585955a2561e0935cdb';
const getTransactionsEndpoint = 'http://localhost:3000/transaction/5aa43585955a2561e0935cdb/';
const deleteTransactionsEndpoint = 'http://localhost:3000/transaction/delete/5aa43585955a2561e0935cdb';
const updateTransactionEndpoint = 'http://localhost:3000/transaction/update/5aa43585955a2561e0935cdb';
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
      pagination: {},
      data: [],
      editingKey: '',
      count: 0,
      pendingKeys: [],
      loading: false,
      selectedRowKeys: [],
      addFlag: false,
      page: 1
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
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record._id)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                  <a onClick={() => this.edit(record._id)}><Icon type='edit' /></a>
                )}
            </div>
          );
        },
      },
    ];
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectedRows: selectedRows
    })
  }

  isEditing = (record) => {
    return record._id === this.state.editingKey;
  };

  edit(_id) {
    this.setState({ editingKey: _id });
  }

  onRow = ({ _id }) => this.state.pendingKeys.includes(_id) && { className: "pending-transaction" };

  onhandleChangePage = (e) => {
    this.setState({
      addFlag: false,
      editingKey: '',
      count: 0,
      page: e.current,
      selectedRows: [],
      selectedRowKeys: []

    })
    this.props.fetchTransactionsData(getTransactionsEndpoint, e.current);
  }

  onDeleteRecord = () => {
    console.log('Delete: selectedRows:' + this.state.selectedRows);
    console.log('Delete: selectedRowKeys:' + this.state.selectedRowKeys);
    for (let i = 0; i < this.state.selectedRows.length; i++) {
      if (this.state.selectedRows[i].hasOwnProperty('_id')) {
        this.props.deleteIds(this.state.selectedRows[i]['_id']); // deletes the record from the redux store
      }
    }
    if (this.state.selectedRows.length > 0) {
      deleteTransactionFromServer(deleteTransactionsEndpoint, this.state.selectedRows);
    }
    this.setState({
      selectedRows: [],
      selectedRowKeys: []
    })
  }

  createGuid = () => {
    function _p8(s) {  
        var p = (Math.random().toString(16)+"000000000").substr(2,8);  
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
     }  
     return _p8() + _p8(true) + _p8(true) + _p8();  
  }

  handleAdd = () => {

    

    console.log("addFlag state: " + this.state.addFlag);
    const newData = {
      _id: this.createGuid(),
      transactionDate: moment().format('YYYY-MM-DD'),
      category: '',
      description: '',
      amount: ''
    };
    this.edit(newData._id);
    this.props.transaction(newData);
    this.setState({
      addFlag: true
    })
  }

  convertToCategory(string, list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i]['name'] === string) {
        return list[i]._id;
      }
    }
  }

  convertToCategoryName(id, list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i]['_id'] === id) {
        return list[i].name;
      }
    }
  }


  save(form, _id) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const index = this.props.transactions.findIndex(item => _id === item._id);
      if (this.state.addFlag) {
        alert('This is the newly added record');
        if (index > -1) {
          const item = this.props.transactions[index];
          row['transactionDate'] = moment(row['transactionDate']);
          this.props.transactions.splice(index, 1, {
            _id: item['_id'],
            transactionDate: moment(row['transactionDate']).format('MMM DD, YYYY'), // cannot be string 
            category: item['category'] != row['category'] ? this.convertToCategoryName(row['category'], this.props.categories) : row['category'],
            description: row['description'],
            amount: row['amount']
          });
          addTransactionToServer(row, addTransactionEndpoint);
          this.setState(
            {
              addFlag: false,
              count: 0,
              editingKey: ''
            }
          );
        }
      }
      else {
        if (index > -1) {
          alert("Existing Record");
          const item = this.props.transactions[index];
          this.props.transactions.splice(index, 1, {
            _id: item['_id'],
            transactionDate: moment(row['transactionDate']).format('MMM DD, YYYY'), // cannot be string 
            category: item['category'] != row['category'] ? this.convertToCategoryName(row['category'], this.props.categories) : row['category'],
            description: row['description'],
            amount: row['amount']
          });
          console.log("Editing Existing Record");
          console.log('--------------ITEM --------------------');
          console.log('Item Key: ' + item['_id']);
          console.log('Item date: ' + item['transactionDate']);
          console.log('Item category: ' + item['category']);
          console.log('Item description : ' + item['description']);
          console.log('item amount : ' + item['amount']);
          console.log('--------------Row --------------------');
          console.log('Row Key: ' + row['_id']);
          console.log('Row date: ' + row['transactionDate']);
          console.log('Row category: ' + row['category']);
          console.log('Row description: ' + row['description']);
          console.log('Row amount: ' + row['amount']);

          console.log("Category: " + row['category']);
          if (item['category'] === row['category']) {
            row['category'] = this.convertToCategory(row['category'], this.props.categories);
          }
          editTransactionFromServer(row, updateTransactionEndpoint, _id);
        }
      }
      this.setState(
        {
          editingKey: ''
        }
      );
    }
    );
  }

  cancel = (id) => {
    if (id === 0) {
      this.props.deleteIds(id);
    }
    this.setState({
      addFlag: false,
      editingKey: ''
    });
  };

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
        <Button disabled={this.state.addFlag} onClick={this.handleAdd} type="primary" style={{ marginBottom: 16, marginLeft: 20, marginRight: 30 }}>
          Add a Transaction
        </Button>

        <Button disabled={
          (this.props.count < 1 && this.state.selectedRowKeys.length < 1) ||
          (this.props.count > 0 && this.state.selectedRowKeys.length < 1)
        } onClick={this.onDeleteRecord} type="primary" style={{ marginBottom: 16, marginLeft: 20, marginRight: 30 }}>
          Delete

        </Button>

        <Table
          rowSelection={rowSelection}
          components={components}
          bordered
          dataSource={this.props.transactions}
          columns={columns}
          onRow={this.onRow}
          onChange={this.onhandleChangePage}
          pagination={
            {
              pageSize: 10,
              total: this.props.count
            }
          }
        />

      </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    categories: state.categories,
    count: state.countAllTransactions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTransactionsData: (url, page) => dispatch(transactionsFetchData(url, page)),
    addTransactionOption: (option) => dispatch(addTransactionCategory(option)),
    transaction: (transaction) => dispatch(addTransaction(transaction)),
    deleteIds: (ids) => dispatch(removeTransactions(ids))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditableTransactionTable);
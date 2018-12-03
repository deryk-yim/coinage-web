/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Form, Select, Input, InputNumber, DatePicker } from 'antd';
import { addTransactionCategory, addTransaction } from '../../actions/actionsAddTransaction';
import { addTransactionToServer } from '../AddTransaction/AddTransaction';
import { removeTransactions } from '../../actions/DeleteTransaction';
import { transactionsFetchData } from '../../actions/Transaction';

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

const EditableRow = ({ form, ...props }) => (<EditableContext.Provider value={form}>
  <tr {...props} />
</EditableContext.Provider>);
const EditableFormRow = Form.create()(EditableRow);
const Option = Select.Option;

class EditableCell extends React.Component {
  // eslint-disable-next-line consistent-return
  getInput = () => {
    // eslint-disable-next-line react/prop-types
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    if (this.props.inputType === 'text') {
      return <Input />;
    }
    if (this.props.inputType === 'dropdown') {
      // eslint-disable-next-line react/prop-types
      const options = this.props.categories.map(item =>
        // eslint-disable-next-line no-underscore-dangle
        <Option value={item._id}>{item.name}</Option>);
      return (
        <Select showSearch style={{ width: 200 }} placeholder="Select a category" optionFilterProp="children">
          {options}
        </Select>
      );
    }
    if (this.props.inputType === 'date') {
      return <DatePicker />;
    }
  };
  render() {
    const {
      editing,
      dataIndex,
      title,
      record,
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
                    initialValue: dataIndex === 'transactionDate' ? moment(record[dataIndex]) : record[dataIndex],
                  },
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

// eslint-disable-next-line react/no-multi-comp
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
      page: 1,
    };

    this.columns = [
      {
        title: 'Id',
        dataIndex: '_id',
      },
      {
        title: 'Transaction Date',
        dataIndex: 'transactionDate',
        editable: true,
      },
      {
        title: 'Category',
        dataIndex: 'category',
        sorter: (a, b) => {
          if (a.category < b.category) {
            return -1;
          }
          if (a.category > b.category) {
            return 1;
          }
          return 0;
        },
        editable: true,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        editable: true,
      },
      {
        title: 'Amount',
dataIndex: 'amount',
key: 'amount',
        sorter: (a, b) => a.amount - b.amount,
        editable: true,
      },
      {
        // eslint-disable-next-line no-underscore-dangle
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
                        href="javascript;"
                        // eslint-disable-next-line no-underscore-dangle
                        onClick={() => this.save(form, record._id)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                        </a>
                    )}
                  </EditableContext.Consumer>
                  {// eslint-disable-next-line no-underscore-dangle
                  }
                  {// eslint-disable-next-line dot-notation
                  }

                </span>
              ) : (
                 {// eslint-disable-next-line no-underscore-dangle
                 }
                  // <a onClick={() => this.edit(record._id)}> <Icon type="edit" /> </a>
                )}
            </div>
          );
        },
      },
    ];
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRows,
    });
  }

  // eslint-disable-next-line react/sort-comp
  edit(_id) {
    this.setState({ editingKey: _id });
  }

  onRow = ({ _id }) => this.state.pendingKeys.includes(_id) && { className: 'pending-transaction' };

  onhandleChangePage = (e) => {
    this.setState({
      addFlag: false,
      editingKey: '',
      count: 0,
      page: e.current,
      selectedRows: [],
      selectedRowKeys: [],

    });
    this.props.fetchTransactionsData(getTransactionsEndpoint, e.current);
  }

  onDeleteRecord = () => {
    console.log(`Delete: selectedRows:${this.state.selectedRows}`);
    console.log(`Delete: selectedRowKeys:${this.state.selectedRowKeys}`);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.state.selectedRows.length; i++) {
      if (this.state.selectedRows[i].prototype.hasOwnProperty.call('_id')) {
        // eslint-disable-next-line no-underscore-dangle
        this.props.deleteIds(this.state.selectedRows[i]._id);
      }
    }
    if (this.state.selectedRows.length > 0) {
      deleteTransactionFromServer(deleteTransactionsEndpoint, this.state.selectedRows);
    }
    this.setState({
      selectedRows: [],
      selectedRowKeys: [],
    });
  }

  // eslint-disable-next-line no-underscore-dangle
  isEditing = record => record._id === this.state.editingKey;

  createGuid = () => {
    // eslint-disable-next-line no-underscore-dangle
    function _p8(s) {
        const p = (`${Math.random().toString(16)}000000000`).substr(2, 8);
        return s ? `-${p.substr(0, 4)}-${p.substr(4, 4)}` : p;
     }
     return _p8() + _p8(true) + _p8(true) + _p8();
  }

  handleAdd = () => {
    console.log(`addFlag state: ${this.state.addFlag}`);
    const newData = {
      _id: this.createGuid(),
      transactionDate: moment().format('YYYY-MM-DD'),
      category: '',
      description: '',
      amount: '',
    };
    // eslint-disable-next-line no-underscore-dangle
    this.edit(newData._id);
    this.props.transaction(newData);
    this.setState({
      addFlag: true,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  convertToCategory(string, list) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < list.length; i++) {
      if (list[i].name === string) {
        // eslint-disable-next-line no-underscore-dangle
        return list[i]._id;
      }
    }
    return undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  convertToCategoryName(id, list) {
        // eslint-disable-next-line no-plusplus
    for (let i = 0; i < list.length; i++) {
      // eslint-disable-next-line no-underscore-dangle
      if (list[i]._id === id) {
        return list[i].name;
      }
    }
    return undefined;
  }


  save(form, _id) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      // eslint-disable-next-line no-underscore-dangle
      const index = this.props.transactions.findIndex(item => _id === item._id);
      if (this.state.addFlag) {
        if (index > -1) {
          const item = this.props.transactions[index];
          // eslint-disable-next-line no-param-reassign
          row.transactionDate = moment(row.transactionDate);
          this.props.transactions.splice(index, 1, {
            // eslint-disable-next-line no-underscore-dangle
            _id: item._id,
            transactionDate: moment(row.transactionDate).format('MMM DD, YYYY'), // cannot be string
            category: item.category !== row.category ?
            this.convertToCategoryName(row.category, this.props.categories) : row.category,
            description: row.description,
            amount: row.amount,
          });
          addTransactionToServer(row, addTransactionEndpoint);
          this.setState(
            {
              addFlag: false,
              count: 0,
              editingKey: '',
            },
          );
        }
      } else if (index > -1) {
          const item = this.props.transactions[index];
          this.props.transactions.splice(index, 1, {
            // eslint-disable-next-line no-underscore-dangle
            _id: item._id,
            transactionDate: moment(row.transactionDate).format('MMM DD, YYYY'), // cannot be string
            category: item.category !== row.category ?
            this.convertToCategoryName(row.category, this.props.categories) : row.category,
            description: row.description,
            amount: row.amount,
          });
         
          if (item.category === row.category) {
            // eslint-disable-next-line no-param-reassign
            row.category = this.convertToCategory(row.category, this.props.categories);
          }
          editTransactionFromServer(row, updateTransactionEndpoint, _id);
        }
      this.setState(
        {
          editingKey: '',
        },
      );
    },
    );
  }

  cancel = (id) => {
    if (id === 0) {
      this.props.deleteIds(id);
    }
    this.setState({
      addFlag: false,
      editingKey: '',
    });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        // eslint-disable-next-line no-use-before-define
        cell: connect(mapStateToProps)(EditableCell),
      },
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
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
            // eslint-disable-next-line no-nested-ternary
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

        <Button
          disabled={
          // eslint-disable-next-line react/prop-types
          (this.props.count < 1 && this.state.selectedRowKeys.length < 1) ||
          (this.props.count > 0 && this.state.selectedRowKeys.length < 1)
        } onClick={this.onDeleteRecord} type="primary" style={{ marginBottom: 16, marginLeft: 20, marginRight: 30 }}
        >
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
              total: this.props.count,
            }
          }
        />

      </div>);
  }
}

const mapStateToProps = state => ({
    transactions: state.transactions,
    categories: state.categories,
    count: state.countAllTransactions,
  });

const mapDispatchToProps = dispatch => ({
    fetchTransactionsData: (url, page) => dispatch(transactionsFetchData(url, page)),
    addTransactionOption: option => dispatch(addTransactionCategory(option)),
    transaction: transaction => dispatch(addTransaction(transaction)),
    deleteIds: ids => dispatch(removeTransactions(ids)),

  });

export default connect(mapStateToProps, mapDispatchToProps)(EditableTransactionTable);

import React from 'react';
import { Button, Icon, Select } from 'antd';
import { connect } from 'react-redux';
import '../Transaction/Transaction.css';
import { transactionsFetchData } from '../../actions/Transaction';
import { categoriesFetchData } from '../../actions/Category';
import { removeTransactions } from '../../actions/DeleteTransaction';
import { countAllTransactionsFetchData } from '../../actions/CountTransactions';
import EditableTransactionTable from '../Transaction/EditableTransactionTable';

const getTransactionsEndpoint = 'http://localhost:3000/transaction/5aa43585955a2561e0935cdb/';
const getTransactionCount = 'http://localhost:3000/transaction/count/1/5aa43585955a2561e0935cdb';
const getCategoriesEndpoint = 'http://localhost:3000/category/5aa43585955a2561e0935cdb';

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
      toDelete: [],
      uploadData: {},
      data: [],
      importRecords: [],
      count: 0,
    };
  }

  // eslint-disable-next-line react/sort-comp
  onImportClick = () => {
    // eslint-disable-next-line react/prop-types
    this.props.history.push('/transaction/import');
  }
  onExportClick = () => {
    this.props.history.push('/transaction/export');
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    this.props.fetchCategories(getCategoriesEndpoint);
    // eslint-disable-next-line react/prop-types
    this.props.fetchTransactionsData(getTransactionsEndpoint, 1);
    // eslint-disable-next-line react/prop-types
    this.props.fetchAllTransactionCount(getTransactionCount);
  }

  // this needs to go to Editable Table level not on Transaction component


  // handleChange(value) {
  //     if (value === 'Past Week') {

  //     } else if (value === 'Past 30 Days') {

  //     } else if (value === 'Past 60 Days') {

  //     } else if (value === 'Custom Dates') {

  //     }
  // }


  render() {
    const { selectedRowKeys } = this.state;
    const hasSelected = this.state.selectedRowKeys.length > 0;
    const hasRecords = true;
    const Option = Select.Option;
    // eslint-disable-next-line react/prop-types
    const optionItems = this.props.categories.map(item =>
      // eslint-disable-next-line no-underscore-dangle
      <Option value={item._id}>{item.name}</Option>,
    );

    return (
      <div>

        <Select defaultValue="Past Week" style={{ width: 140 }} onChange={this.handleChange}>
          <Option value="Past Week">Past Week</Option>
          <Option value="Past 30 Days">Past 30 Days</Option>
          <Option value="Past 60 Days">Past 60 Days</Option>
          <Option value="Custom Dates">Custom Dates</Option>
          <Option value="All Dates">Custom Dates</Option>
        </Select>

        <Select
          mode="tags"
          size="default"
          placeholder="All Categories"
          style={{ width: '50%' }}
        >
          {optionItems}
        </Select>

        <Button onClick={this.onImportClick}>
          <Icon type="upload" /> Import
                </Button>
        <Button onClick={this.onExportClick} disabled={!hasRecords}>
          <Icon type="download" />Export
                </Button>

        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
        <EditableTransactionTable />
      </div>
    );
  }
}

const mapStateToProps = state => ({
    transactions: state.transactions,
    categories: state.categories,
    count: state.countAllTransactions,
  });

const mapDispatchToProps = dispatch => ({
  fetchTransactionsData: (url, page) => dispatch(transactionsFetchData(url, page)),
  fetchCategories: url => dispatch(categoriesFetchData(url)),
  deleteIds: ids => dispatch(removeTransactions(ids)),
  fetchAllTransactionCount: url => dispatch(countAllTransactionsFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);

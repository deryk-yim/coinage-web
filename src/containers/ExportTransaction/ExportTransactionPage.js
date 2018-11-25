import React from 'react';
import { Button, Icon, Progress, Dropdown, Menu, DatePicker } from 'antd';
import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';
import '../Transaction/Transaction.css';
import { exportedFilesFetchData, addExportHistory } from '../../actions/actionExportHistory';
import { createExportRecord, addExportFileToServer, exportCSV } from '../ExportTransaction/ExportTransaction';
import { transactionsFetchData } from '../../actions/actionTransaction';

const { RangePicker } = DatePicker;
// const getExportedFilesHistory = 'http://localhost:3000/export/5aa43585955a2561e0935cdb';
const addExportedFile = 'http://localhost:3000/export/create/1/5aa43585955a2561e0935cdb';
const getTransactionsEndpoint = 'http://localhost:3000/transaction/5aa43585955a2561e0935cdb';

const pid = '5aa43585955a2561e0935cdb';

class ExportTransactionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      percent: 0,
      importProgressFlag: false,
      exportData: []
    };
  }

  componentWillMount() {
    this.props.fetchTransactionsData(getTransactionsEndpoint);
  }

  onExport = () => {
    const exportSuccessRecord = createExportRecord(
      'Transactions',
      'Export Name',
      this.props.transactions.length,
      pid);
    addExportFileToServer(exportSuccessRecord, addExportedFile);
    this.props.addExportedFile(exportSuccessRecord);
  }

  onDateChange = (date, dateString) => {
    console.log(date, dateString);
  }

  handleMenuClick = (e) => {
    if (e.key === '1') {
      this.setState({
        exportData: exportCSV(this.props.transactions)
      });
    }
    else if (e.key === '2') {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 30);
      const today = new Date();
      this.setState({
        exportData: exportCSV(this.props.transactions.filter((item) => {
          console.log(item.transactionDate);
          return item.transactionDate >= fromDate &&
            item.transactionDate <= today;
        })),
      });
    }
  }

  exportHistory = () => {
    this.props.history.push('/transaction/export/history');
  }

  backToTransactionComponent = () => {
    this.props.history.push('/transaction');
  }

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1"><Icon type="filter" />All Records</Menu.Item>
        <Menu.Item key="2"><Icon type="filter" />Past 30 Days</Menu.Item>
        <Menu.Item key="3"><Icon type="filter" />Past 60 Days</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <p> <a onClick={this.backToTransactionComponent}>Transactions</a> Export Transactions </p>
        <h1>Export Transactions </h1>
        <Button onClick={this.onExport} disabled={this.state.exportData.length === 0} >
          <Icon type="download" />
          <CSVLink
            data={this.state.exportData}
            filename={'my-file.csv'}
            target="_blank"
          >
            Export
          </CSVLink>
        </Button>
        <Button onClick={this.exportHistory}>
          Export History
                </Button>
        <Dropdown overlay={menu}>
          <Button style={{ marginLeft: 8 }}>
            Select Filter <Icon type="down" />
          </Button>
        </Dropdown>

        <RangePicker onChange={this.onDateChange} />

        {this.state.importProgressFlag === true ? (
          <Progress percent={this.state.percent} />
        ) : (
            <p></p>
          )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    exportedFiles: state.exportedFiles,
  };
};

const mapDispatchToProps = dispatch => (
  {
    fetchTransactionsData: url => dispatch(transactionsFetchData(url)),
    fetchExportedFiles: url => dispatch(exportedFilesFetchData(url)),
    addExportedFile: exportedFile => dispatch(addExportHistory(exportedFile)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ExportTransactionPage);
import React from 'react';
import { Button, Icon, Progress, Dropdown, Menu, DatePicker } from 'antd';
import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';
import '../Transaction/Transaction.css';
import { addExportFile } from '../../api-requests/export';
import { getTransactions } from '../../api-requests/transaction';
import { exportedFilesFetchData, addExportHistory } from '../../actions/ExportHistory';
import { createExportRecord, addExportFileToServer, exportCSV } from '../ExportTransaction/ExportTransaction';
import { transactionsFetchData } from '../../actions/Transaction';

const { RangePicker } = DatePicker;

class ExportTransactionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      percent: 0,
      importProgressFlag: false,
      exportData: [],
    };
  }

  componentWillMount() {
    // eslint-disable-next-line react/prop-types
    this.props.fetchTransactionsData(getTransactions);
  }

  onExport = () => {
    const exportSuccessRecord = createExportRecord(
      'Transactions',
      'Export Name',
      // eslint-disable-next-line react/prop-types
      this.props.transactions.length);
    addExportFileToServer(exportSuccessRecord, addExportFile);
    // eslint-disable-next-line react/prop-types
    this.props.addExportingFile(exportSuccessRecord);
  }

  onDateChange = (date, dateString) => {
    console.log(date, dateString);
  }

  handleMenuClick = (e) => {
    if (e.key === '1') {
      this.setState({
        exportData: exportCSV(this.props.transactions),
      });
    } else if (e.key === '2') {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 30);
      const today = new Date();
      this.setState({
        // eslint-disable-next-line react/prop-types
        exportData: exportCSV(this.props.transactions.filter((item) => {
          console.log(item.transactionDate);
          return item.transactionDate >= fromDate &&
            item.transactionDate <= today;
        })),
      });
    }
  }

  exportHistory = () => {
    // eslint-disable-next-line react/prop-types
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
        <p> <div> <a> onClick={this.backToTransactionComponent}
        Transactions</a> </div>  Export Transactions </p>
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
            <p />
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    transactions: state.transactions,
    exportedFiles: state.exportedFiles,
  });

const mapDispatchToProps = dispatch => (
  {
    fetchTransactionsData: url => dispatch(transactionsFetchData(url)),
    fetchExportedFiles: url => dispatch(exportedFilesFetchData(url)),
    addExportingFile: exportedFile => dispatch(addExportHistory(exportedFile)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ExportTransactionPage);

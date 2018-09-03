import React from 'react';
import { Button, Table, Icon, Spin, Progress, Dropdown, Menu, message, DatePicker } from 'antd';
import '../Transaction/Transaction.css';
import { connect } from 'react-redux';
import { exportedFilesFetchData, addExportHistory } from '../../actions/actionExportHistory';
import { createExportRecord, addExportFileToServer, exportCSV } from '../ExportTransaction/ExportTransaction';
import { transactionsFetchData } from '../../actions/actionTransaction';
import { CSVLink } from 'react-csv';

const columns = [
    { title: 'Transaction Date', dataIndex: 'transactionDate', key: 'transactionDate' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' }
];

const { RangePicker } = DatePicker;
const getExportedFilesHistory = 'http://localhost:3000/export/5aa43585955a2561e0935cdb';
const addExportedFile = 'http://localhost:3000/export/create/1/5aa43585955a2561e0935cdb';

const pid = '5aa43585955a2561e0935cdb';

class ExportTransactionPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedRows: [],
            selectedRowKeys: [],
            data: [],
            percent: 0,
            importProgressFlag: false
        };
    }

    backToTransactionComponent = () => {
        this.props.history.push('/transaction');
    }

    componentWillMount() {
        this.props.fetchExportedFiles(getExportedFilesHistory);
        const exportDataPoints = exportCSV(this.props.transactions);
        this.setState({
            exportData: exportDataPoints
        });
    }

    handleData = (data) => {
        this.setState({
            data: data
        });
    }

    onExport = () => {
        const exportSuccessRecord = createExportRecord(
            "Transactions",
            "Export Name",
            this.props.transactions.length,
            pid);
        addExportFileToServer(exportSuccessRecord, addExportedFile);
        this.props.addExportedFile(exportSuccessRecord);        
    }

    clearAll = () => {
        this.setState({
            data: []
        })
        document.getElementById("dataInput").value == "";
    }

    removeSelectedRows = () => {
        const records = [...this.state.data];
        const removeRecords = [...this.state.selectedRows];
        const newSet = records.filter(
            function (e) {
                return this.indexOf(e) < 0;
            }, removeRecords);
        this.setState({
            data: newSet,
            selectedRows: [],
            selectedRowKeys: []
        })
    }

    handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    }

    onSelectChange = (selectedRowKeys, selectedRows, key) => {
        this.setState({ selectedRowKeys });
        this.setState({
            selectedRows: selectedRows
        })
    }

    onDateChange(date, dateString) {
        console.log(date, dateString);
    }

    render() {
        const keys = [
            "transactionDate",
            "category",
            "description",
            "amount",
            "errorMessage"
        ]
        const exportColumns = [
            { title: 'Export Date', dataIndex: 'createdDate', key: 'createdDate' },
            { title: 'File Name', dataIndex: 'exportFileName', key: 'exportFileName' },
            { title: 'Records Exported', dataIndex: 'recordExported', key: 'recordExported' }
        ]

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1"><Icon type="filter" />All Records</Menu.Item>
                <Menu.Item key="2"><Icon type="filter" />Past 30 Days</Menu.Item>
                <Menu.Item key="3"><Icon type="filter" />Past 60 Days</Menu.Item>
            </Menu>
        );

        const { selectedRowKeys } = this.state;
        const hasSelected = this.state.selectedRowKeys.length > 0;
        const hasRecords = this.props.exportedFiles.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        // onDelete deelte the selected records and then clean up the arrays again

        return (
            <div>
                <p> <a onClick={this.backToTransactionComponent}>Transactions</a> > Export Transactions </p>
                <h1>Export Transactions </h1>
                <Button onClick={this.onExport}>
                    <Icon type="download" />
                    <CSVLink data={this.state.exportData}
                        filename={"my-file.csv"}
                        target="_blank">
                        Export
                    </CSVLink>
                </Button>
                <Button onClick={this.removeSelectedRows} disabled={!hasSelected}>
                    <Icon type="delete" /> Delete
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                <Button onClick={this.clearAll} disabled={this.state.data.length < 1}>
                    Clear All
                </Button>
                <Dropdown overlay={menu}>
                    <Button style={{ marginLeft: 8 }}>
                        Button <Icon type="down" />
                    </Button>
                </Dropdown>
                <RangePicker onChange={this.onDateChange} />
                <Spin spinning={!hasRecords} />
                {this.state.importProgressFlag === true ? (
                    <Progress percent={this.state.percent} />
                ) : (
                        <p> </p>
                    )}
                {this.state.data.length > 0 ?
                    (<Table rowSelection={rowSelection} dataSource={this.state.data}
                        columns={columns} />) : (<Table dataSource={this.props.exportedFiles} columns={exportColumns}
                        />)}
            </div>
        )
    }
}
// when the data has been loaded into state then we grab this csv download

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions,
        exportedFiles: state.exportedFiles
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTransactionsData: (url) => dispatch(transactionsFetchData(url)),
        fetchExportedFiles: (url) => dispatch(exportedFilesFetchData(url)),
        addExportedFile: (exportedFile) => dispatch(addExportHistory(exportedFile))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportTransactionPage);
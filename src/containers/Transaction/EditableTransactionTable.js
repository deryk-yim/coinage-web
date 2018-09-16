import React from 'react';
import { Button, Table, Icon, Spin, Form, Select, Input, InputNumber, Popconfirm } from 'antd';

import EditableTransactionCell from '../Transaction/EditableTransactionCell';
const EditableContext = React.createContext();

const EditableFormRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

class EditableTransactionTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            editingKey: ''
        };

        this.columns = [
            {
                title: 'Transaction Date', dataIndex: 'transactionDate', key: 'transactionDate'
            },
            {
                title: 'Category', dataIndex: 'category',
                key: 'category',
                sorter: (a, b) => {
                    if (a.category < b.category) {
                        return -1
                    }
                    if (a.category > b.category) {
                        return 1;
                    }
                    return 0;
                }
            },
            { title: 'Description', dataIndex: 'description', key: 'description' },
            {
                title: 'Amount', dataIndex: 'amount', key: 'amount',
                sorter: (a, b) => a.amount - b.amount,
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



    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };

    edit(key) {
        this.setState({ editingKey: key });
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
                cell: EditableTransactionCell
            },
        };
        
        const { selectedRowKeys } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (


            <Table
                components={components}
                rowSelection={rowSelection}
                bordered
                pagination={
                    {
                        pageSizeOptions: ['10'],
                        onChange: this.onChange,
                        total: this.state.count
                    }
                } dataSource={this.props.data} columns={columns} rowClassName="editable-row" />
        );
    }
}

export default EditableTransactionTable;
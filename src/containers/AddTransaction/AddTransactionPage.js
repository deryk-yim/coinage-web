import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import AddTransactionForm from '../AddTransaction/AddTransactionForm';
import { createJSONTransaction, addTransactionToServer } from './AddTransaction';
import { addTransactionCategory, addTransaction } from '../../actions/actionsAddTransaction';

const addTransactionEndpoint = 'http://localhost:3000/transaction/create/1/5aa43585955a2561e0935cdb';
// const Option = Select.Option;
// const { TextArea } = Input;
// const moment = require('moment');

class AddTransactionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const newRecord = createJSONTransaction(
        values,
        this.props.categorySelected.key,
        '5aa43585955a2561e0935cdb',
      );
      this.props.transaction(newRecord);
      addTransactionToServer(newRecord, addTransactionEndpoint);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <div>
        <Button onClick={this.showModal}>+ Add Transaction</Button>
        <AddTransactionForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    transactions: state.transactions,
    categories: state.categories,
    categorySelected: state.postAddTransactionCategory.postCategory,
  }
  /*
  remmeber that obj is optionForAddTransaction
  then optionSelected within optionForAddTransaction
  */
);

const mapDispatchToProps = dispatch => ({
  addTransactionOption: option => dispatch(addTransactionCategory(option)),
  transaction: transaction => dispatch(addTransaction(transaction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionPage);

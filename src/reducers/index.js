import { combineReducers } from 'redux';
import { transactions, transactionsHasErrored, transactionsIsLoading, postAddTransactionCategory} from './transactions';
import { categoriesHasErrored, categoriesIsLoading, categories} from './categories';
import {showImportTransactions} from './importTransactions';

export default combineReducers({
    transactions,
    transactionsHasErrored,
    transactionsIsLoading,
    categoriesHasErrored,
    categoriesIsLoading,
    categories,
    postAddTransactionCategory,
    showImportTransactions
});
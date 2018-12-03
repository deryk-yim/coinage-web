import { combineReducers } from 'redux';
import { transactions, transactionsHasErrored, transactionsIsLoading, postAddTransactionCategory } from './transactions';
import { categoriesHasErrored, categoriesIsLoading, categories } from './categories';
import { importedFilesHasErrored, importedFilesIsLoading, importedFiles } from './importTransactions';
import { exportedFilesHasErrored, exportedFilesIsLoading, exportedFiles } from './exportTransactions';
import { countAllTransactionsHasErrored, countAllTransactionsIsLoading, countAllTransactions } from './countTransactions';

export default combineReducers({
    transactions,
    transactionsHasErrored,
    transactionsIsLoading,
    categoriesHasErrored,
    categoriesIsLoading,
    categories,
    postAddTransactionCategory,
    importedFilesHasErrored,
    importedFilesIsLoading,
    importedFiles,
    exportedFilesHasErrored,
    exportedFilesIsLoading,
    exportedFiles,
    countAllTransactionsHasErrored,
    countAllTransactionsIsLoading,
    countAllTransactions,
});


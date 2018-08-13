import {initialState} from '../initialState';

export function showImportTransactions(state = initialState, action) {
    switch (action.type) {
        case 'IMPORT_TRANSACTIONS_TO_STORE': 
            return {
                ...state,
                transactionImport: action.transactions
            }
        default:
            return {
                ...state
              }
    }
}
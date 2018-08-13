import {initialState} from '../initialState';

export function transactionsHasErrored(state = false, action) {
    switch (action.type) {
        case 'TRANSACTIONS_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

export function transactionsIsLoading(state = false, action) {
    switch (action.type) {
        case 'TRANSACTIONS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export function transactions(state = initialState, action) {
    switch (action.type) {
        case 'TRANSACTIONS_FETCH_DATA_SUCCESS':
        return action.transactions

        case 'ADD_TRANSACTION_TO_STORE': 
        return [
            ...state, action.newItem
        ];
                
        case 'DELETE_TRANSACTIONS_FROM_STORE':
        const transactionId_delete = action.transactionId;
        console.log(transactionId_delete);
            return state.filter(transaction => transaction._id !== transactionId_delete);
    
        default:
            return state;
    }
}



export function transactionKeysDelete(state = [], action) {
    switch (action.type) {
        case 'SET_TRANSACTION_IDS_TO_DELETE': 
        return [
            ...state, action.transactionIds
        ];
        default:
            return state;
    }
}

export function postAddTransactionCategory(state = {}, action) {
    switch (action.type) {
        case 'ADD_TRANSACTION_OPTION_SELECTED': 
            return {
                ...state,
                postCategory: action.data
            }
        default:
            return {
                ...state
              }
    }
}
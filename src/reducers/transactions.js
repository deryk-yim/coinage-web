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
        case 'RETRIEVE_TRANSACTIONS':
        return action.payload.transactions;

        case 'ADD_TRANSACTION_TO_STORE': 
        console.log('transaction store: '+ state.length);
        console.log('State:' + state[0]['description']);
        return [
            //action.newItem, ...state
            action.newItem, ...state
            // after adding have to call server to give new results 
            // adding to the front is a broken 
        ];
        case 'DELETE_TRANSACTIONS_FROM_STORE':
        const transactionId_delete = action.transactionId;
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


export function countAllTransactionsHasErrored(state = false, action) {
    switch (action.type) {
        case 'COUNT_ALL_TRANSACTION_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

export function countAllTransactionsIsLoading(state = false, action) {
    switch (action.type) {
        case 'COUNT_ALL_TRANSACTION_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export function countAllTransactions(state = [], action) {
    switch (action.type) {
        case 'COUNT_ALL_TRANSACTION_FETCH_DATA_SUCCESS':
            return action.count.data;
        default:
            return state;
    }
}

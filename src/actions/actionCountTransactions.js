export function countAllTransactionsHasErrored(bool) {
    return {
        type: 'COUNT_ALL_TRANSACTION_HAS_ERRORED',
        hasErrored: bool
    }
}

export function countAllTransactionsIsLoading(bool) {
    return {
        type: 'COUNT_ALL_TRANSACTION_IS_LOADING',
        isLoading: bool
    };
}

export function countAllTransactionsFetchDataSuccess(count) {
    return {
        type: 'COUNT_ALL_TRANSACTION_FETCH_DATA_SUCCESS',
        count
    };
}

export function countAllTransactionsFetchData(url) {
    return (dispatch) => {
        dispatch(countAllTransactionsIsLoading(true));
        fetch(url, {
            method: 'post'
        })
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    dispatch(countAllTransactionsIsLoading(false));
                    return res.json();
                }
                else {
                    throw new Error('Try Again Later');
                }
            })
            .then((count => {
                console.log(count);
                return count;
            }))
            .then((count) => dispatch(countAllTransactionsFetchDataSuccess(count)))
            .catch(() => dispatch(countAllTransactionsHasErrored(true)));
    };
}
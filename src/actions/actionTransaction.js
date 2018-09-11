
const moment = require('moment');

export function retrieveTransactions(transactions, page) {
    return {
        type: 'RETRIEVE_TRANSACTIONS',
        payload: {
            transactions,
            page
        }
    };
}

export function transactionsHasErrored(bool) {
    return {
        type: 'TRANSACTIONS_HAS_ERRORED',
        hasErrored: bool
    }
}

export function transactionsIsLoading(bool) {
    return {
        type: 'TRANSACTIONS_IS_LOADING',
        isLoading: bool
    };
}

export function transactionsFetchData(url, page) {
    return (dispatch) => {
        dispatch(transactionsIsLoading(true));
        fetch(url, {
            method: 'post'
        })
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    dispatch(transactionsIsLoading(false));
                    return res.json();
                }
                else {
                    throw new Error('Try Again Later');
                }
            })
            .then(jsonData => {
                               
                for (let i = 0; i < jsonData.length; i++) {
                    jsonData[i]['transactions'].amount = parseFloat(jsonData[i].amount).toFixed(2);
                    jsonData[i]['transactions'].transactionDate = moment(new Date(jsonData[i]['transactions'].transactionDate)).format('MMM DD, YYYY');
                    jsonData[i]['transactions'].category = jsonData[i]['transactions'].category['name'];
                }
                return jsonData;
            })
            .then((transactions) => dispatch(retrieveTransactions(transactions, page)))
            .catch(() => dispatch(transactionsHasErrored(true)));
    };
}





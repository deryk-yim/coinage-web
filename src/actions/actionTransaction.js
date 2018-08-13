const moment = require('moment');

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

export function transactionsFetchDataSuccess(transactions) {
    return {
        type: 'TRANSACTIONS_FETCH_DATA_SUCCESS',
        transactions
    };
}

export function transactionsFetchData(url) {
    return (dispatch) => {
        dispatch(transactionsIsLoading(true));
        fetch(url, {
            method: 'post'
        })
            .then( res => {
                if (res.status >= 200 && res.status < 300) {
                    dispatch(transactionsIsLoading(false));
                    return res.json();
                }
                else {
                    throw new Error('Try Again Later');
                }
            })
            .then(jsonData => {
                console.log(jsonData);
                console.log(jsonData[0].category['name']);

                for (let i = 0; i < jsonData.length; i++) {
                    jsonData[i].amount = parseFloat(jsonData[i].amount).toFixed(2);
                    jsonData[i].transactionDate = moment(new Date(jsonData[i].transactionDate)).format('MMM DD, YYYY');
                    console.log(jsonData[i].transactionDate);
                    jsonData[i].category = jsonData[i].category['name'];
                }
                return jsonData;
            })
            .then((transactions) => dispatch(transactionsFetchDataSuccess(transactions)))
            .catch(() => dispatch(transactionsHasErrored(true)));
    };
}





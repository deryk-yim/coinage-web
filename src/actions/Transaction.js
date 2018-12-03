import moment from 'moment';

const axios = require('axios');

export function retrieveTransactions(transactions, page) {
    return {
        type: 'RETRIEVE_TRANSACTIONS',
        payload: {
            transactions,
            page,
        },
    };
}

export function transactionsHasErrored(bool) {
    return {
        type: 'TRANSACTIONS_HAS_ERRORED',
        hasErrored: bool,
    };
}

export function transactionsIsLoading(bool) {
    return {
        type: 'TRANSACTIONS_IS_LOADING',
        isLoading: bool,
    };
}

export function transactionsFetchData(url, page) {
    return (dispatch) => {
        dispatch(transactionsIsLoading(true));
        console.log(url + page);
        axios.get(url + page)
            .then((res) => {
                if (!(res.status >= 200 && res.status < 300)) {
                    throw new Error('Try Again Later');
                } else {
                    dispatch(transactionsIsLoading(false));
                    return res.json();
                }
            })
            .then((jsonData) => {
                for (let i = 0; i < jsonData.length; i += 1) {
                    // eslint-disable-next-line no-param-reassign
                    jsonData[i].amount = parseFloat(jsonData[i].amount).toFixed(2);
                    // eslint-disable-next-line no-param-reassign
                    jsonData[i].transactionDate = moment(new Date(jsonData[i].transactionDate)).format('MMM DD, YYYY');
                    // eslint-disable-next-line no-param-reassign
                    jsonData[i].category = jsonData[i].category.name;
                }
                console.log(jsonData);

                return jsonData;
            })
            .then(transactions =>
            dispatch(retrieveTransactions(transactions, page)))
            .catch(() => dispatch(transactionsHasErrored(true)));
    };
}


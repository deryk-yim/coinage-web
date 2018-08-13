export function addTransactionCategory(optionSelected) {
    return {
        type: 'ADD_TRANSACTION_OPTION_SELECTED',
        data: optionSelected
    }
}

/*
Add transaction created from form and store into state in redux store
*/

export function addTransaction(transaction) {
    return {
        type: 'ADD_TRANSACTION_TO_STORE',
        newItem: transaction
    }
}



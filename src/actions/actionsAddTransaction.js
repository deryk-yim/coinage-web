export function addTransactionCategory(optionSelected) {
    return {
        type: 'ADD_TRANSACTION_OPTION_SELECTED',
        data: optionSelected,
    };
}

export function addTransaction(transaction) {
    return {
        type: 'ADD_TRANSACTION_TO_STORE',
        newItem: transaction,
    };
}


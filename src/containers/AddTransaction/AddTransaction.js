const moment = require('moment');

export function createJSONTransaction(formInputs, categorySelected, pid) {
    const jsonData = {
        transactionDate: moment(new Date(formInputs['date-picker'])).format('MMM DD, YYYY'),
        category: categorySelected,
        amount: parseFloat(formInputs['amount-InputNumber']).toFixed(2),
        description: formInputs['description-textarea'],
        _pid: pid,
    };
    return jsonData;
}

export function addTransactionToServer(transaction, createTransactionEndpoint) {
    fetch(createTransactionEndpoint, {
        method: 'POST',
        body: JSON.stringify(transaction),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((res) => {
                if (res.status === 201) {
                    res.status(201).send('Success');
                }
                return res.json();
            },
        )
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success: ', response));
}
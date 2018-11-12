const { Validator } = require('jsonschema');

const transactionSchema = {
    id: '/Transaction',
    type: 'object',
    properties: {
        transactionDate: {
            type: Date,
            required: true,
            minLength: 1,
            format: 'dateFormat',
        },
        category: {
            type: 'string',
            required: true,
            minLength: 1,
        },
        description: {
            type: 'string',
            required: true,
            minLength: 1,
        },
        amount: {
            type: Number,
            required: true,
            minLength: 1,
        },
    },
    required: ['transactionDate', 'category', 'description', 'amount'],
};

export default function doValidate(data) {
    const v = new Validator();
    v.addSchema(transactionSchema, '/Transaction');
    return [
        data.filter(element => !v.validate(element, transactionSchema).valid),
    ];
}

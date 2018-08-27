const dateFormat = 'YYYY-MM-DD';
const Validator = require('jsonschema').Validator;

const transactionSchema = {
    "id": "/Transaction",
    "type": "object",
    "properties": {
        "transactionDate": {
            "type": Date,
            "required": true,
            "minLength": 1,
            "format": "dateFormat"
        },
        "category": {
            "type": "string",
            "required": true,
            "minLength": 1
        },
        "description": {
            "type": "string",
            "required": true,
            "minLength": 1
        },
        "amount": {
            "type": Number,
            "required": true,
            "minLength": 1
        }
        // check categories that they have already.
        // take longest length of value
        // whatever cell has the longest length <--- use that as description
    },
    "required": ["transactionDate", "category", "description", "amount"]
};

export function doValidate(data) {
    const v = new Validator();
    v.addSchema(transactionSchema, '/Transaction');
    const validateFails = [];
    data.forEach(element => {
        if(!v.validate(element, transactionSchema).valid) {
            validateFails.push(element);
        }
        console.log('validation ' + v.validate(element, transactionSchema).valid);
        console.log('Reason for fail: ' + v.validate(element, transactionSchema));
    });
    if(validateFails.length > 0) {
        return false;
    }
    return true;
};

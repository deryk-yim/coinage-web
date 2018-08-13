const dateFormat = 'YYYY-MM-DD';
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
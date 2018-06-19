/*
Load Transaction Data

get categories from pid
get bills from pid



*/


export function getTransactionData(endpoint) {
    fetch(endpoint, {
        method: 'post'
    })
    .then(res => {
        if(res.status >= 200 && res.status < 300) {
            return res.json();
        }        
        else {
            throw new Error("Try Again Later");
        }
    })
}








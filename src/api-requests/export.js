let baseUrl;
const env = process.argv[2] || 'dev';
switch (env) {
    case 'dev':
     baseUrl = 'http://localhost:3000/';
        break;
    default:
        break;
}

export const addExportFile = `${baseUrl}export/create/1/`;
export const getTransactions = `${baseUrl}transaction/`;


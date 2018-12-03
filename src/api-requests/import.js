let baseUrl;
const env = process.argv[2] || 'dev';
switch (env) {
    case 'dev':
     baseUrl = 'http://localhost:3000/';
        break;
    default:
        break;
}

// eslint-disable-next-line import/prefer-default-export
export const addImportedFile = `${baseUrl}import/create/1`;

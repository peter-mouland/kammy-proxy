const { GoogleSpreadsheet } = require('google-spreadsheet');

function validate(row) {
    Object.keys(row).forEach((key) => {
        if (key === 'title') {
            throw new Error(`Invalid key: ${key}`);
        }
    });
}

const cache = {};

async function Connect(id) {
    const doc = new GoogleSpreadsheet(id);
    const creds = {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY
    };

    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    cache[id] = {
        worksheets: doc.sheetsByIndex,
        sheetsById: doc.sheetsById,
        worksheet: undefined,
    };
    const getSheet = (worksheetName) =>{
        return cache[id].worksheets.find((sheet) => sheet.title === worksheetName.replace('/values/', ''));
    };
    return {
        addRows: async function addRows(worksheetName, rows) {
            validate(rows[0]);
                const worksheet = getSheet(worksheetName);
                await worksheet.addRows(rows, { insert: true, raw: true });
                return rows;
        },
    };
}

module.exports = Connect;

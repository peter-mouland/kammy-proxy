import { GoogleSpreadsheet } from 'google-spreadsheet';
import { serviceAccountAuth } from '../auth';

function validate(row) {
    Object.keys(row).forEach((key) => {
        if (key === 'title') {
            throw new Error(`Invalid key: ${key}`);
        }
    });
}

const cache = {};
function lastSunday(month, year) {
    const d = new Date();
    const lastDayOfMonth = new Date(Date.UTC(year || d.getFullYear(), month+1, 0));
    const day = lastDayOfMonth.getDay();
    return new Date(Date.UTC(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), lastDayOfMonth.getDate() - day));
}

function isBST(date) {
    const d = date || new Date();
    const starts = lastSunday(2, d.getFullYear());
    starts.setHours(1);
    const ends = lastSunday(9, d.getFullYear());
    starts.setHours(1);
    return d.getTime() >= starts.getTime() && d.getTime() < ends.getTime();
}

function addHour({ ms = 0, sec = 0, min = 0, hrs = 1, days = 0}) {
    const startDate = new Date();     //start date in local time (we'll use current time as an example)
    const time = startDate.getTime(); //convert to milliseconds since epoch
    //add time difference
    const newTime = time + ms + (1000*sec) + (1000*60*min) + (1000*60*60*hrs) + (1000*60*60*24*days)

    return new Date(newTime); //convert back to date; in this example: 2 hours from right now
}

function getDateGMTTime() {
    // todo: just use .getTimezoneOffset()?
    return `${(isBST() ? addHour({}) : new Date()).toUTCString()}${isBST() ? '+0100' : ''}`;
}

export async function Connect(id) {
    const doc = new GoogleSpreadsheet(id, serviceAccountAuth);
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
            await worksheet.loadHeaderRow();
            const hasTimestamp = worksheet.headerValues.find((value) => value === 'Timestamp');
            const hastimestamp = worksheet.headerValues.find((value) => value === 'timestamp');

            const rowsWithStamp = rows.map((row) => {
                const key = hastimestamp ? 'timestamp' : hasTimestamp ? 'Timestamp' : false;
                return key ? {
                    ...row,
                    [key]: getDateGMTTime(),
                } : row;
            })
            await worksheet.addRows(rowsWithStamp, { insert: true, raw: true });
            return rowsWithStamp;
        },
    };
}

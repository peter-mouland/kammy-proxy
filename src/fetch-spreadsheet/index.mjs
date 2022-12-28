import { getJSON } from '../fetchr/index.mjs';
import { spreadsheets } from './constants.mjs';
import { Connect as googleSpreadsheet } from '../../api/spreadsheets/transfers/GoogleSpreadsheet.mjs';

const ACCESS_KEY = process.env.SPREADSHEET_ACCESS_KEY;
const saveRows = async (spreadsheetId, worksheetName, data) => {
    const { addRows } = await googleSpreadsheet(spreadsheetId)
    return await addRows(worksheetName, data);
};


export const fetchGsheet = (spreadsheet, endpoint, opts = {}) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet}${endpoint}`;
    const fullUrl = Object.keys(opts).reduce((prev, opt) => (
        `${prev}${opts[opt] === true ? `&${opt}=true` : ''}`
    ), `${url}?key=${ACCESS_KEY}`);
    return getJSON(fullUrl);
};

export const fetchTransfers = (division) => fetchGsheet(spreadsheets.TRANSFERS_ID, `/values/${division}`);
export const fetchPremierLeagueTransfers = () => fetchGsheet(spreadsheets.TRANSFERS_ID, `/values/premierLeague`);
export const fetchChampionshipTransfers = () => fetchGsheet(spreadsheets.TRANSFERS_ID, `/values/championship`);
export const fetchLeagueOneTransfers = () => fetchGsheet(spreadsheets.TRANSFERS_ID, `/values/leagueOne`);
export const fetchLeagueTwoTransfers = () => fetchGsheet(spreadsheets.TRANSFERS_ID, `/values/leagueTwo`);
export const fetchCup = () => fetchGsheet(spreadsheets.TRANSFERS_ID, `/values/cup`);
export const fetchCupSubmissions = () => fetchGsheet(spreadsheets.TRANSFERS_ID, `/values/cupSubmissions`);
export const fetchDraft = (worksheet) => fetchGsheet(spreadsheets.DRAFT_ID, `/values/${worksheet}`);
export const fetchDivisions = () => fetchGsheet(spreadsheets.DRAFT_ID, `/values/Divisions`);
export const fetchSetup = (worksheet) => fetchGsheet(spreadsheets.SETUP_ID, `/values/${worksheet}`);
export const fetchGameWeeks = () => fetchGsheet(spreadsheets.SETUP_ID, `/values/GameWeeks`);
export const fetchPlayers = () => fetchGsheet(spreadsheets.SETUP_ID, `/values/Players`);
export const saveTransfers = (worksheet, data = []) => saveRows(spreadsheets.TRANSFERS_ID, worksheet, data);
export const saveCupTeam = (data = []) => saveRows(spreadsheets.TRANSFERS_ID, 'cupSubmissions', data);

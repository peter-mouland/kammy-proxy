import { getJSON } from '../fetchr/index.mjs';
import { spreadsheets } from './constants.mjs';
import { Connect as googleSpreadsheet } from './lib/GoogleSpreadsheet.mjs';

const saveRows = async (spreadsheetId, worksheetName, data) => {
    const { addRows } = await googleSpreadsheet(spreadsheetId)
    return await addRows(worksheetName, data);
};

const ACCESS_KEY = process.env.SPREADSHEET_ACCESS_KEY;

export const fetch = (spreadsheet, endpoint, opts = {}) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet}${endpoint}`;
    const fullUrl = Object.keys(opts).reduce((prev, opt) => (
        `${prev}${opts[opt] === true ? `&${opt}=true` : ''}`
    ), `${url}?key=${ACCESS_KEY}`);
    return getJSON(fullUrl);
};

export const fetchTransfers = (division) => fetch(spreadsheets.TRANSFERS_ID, `/values/${division}`);
export const fetchPremierLeagueTransfers = () => fetch(spreadsheets.TRANSFERS_ID, `/values/premierLeague`);
export const fetchChampionshipTransfers = () => fetch(spreadsheets.TRANSFERS_ID, `/values/championship`);
export const fetchLeagueOneTransfers = () => fetch(spreadsheets.TRANSFERS_ID, `/values/leagueOne`);
export const fetchLeagueTwoTransfers = () => fetch(spreadsheets.TRANSFERS_ID, `/values/leagueTwo`);
export const fetchCup = () => fetch(spreadsheets.TRANSFERS_ID, `/values/cup`);
export const fetchCupSubmissions = () => fetch(spreadsheets.TRANSFERS_ID, `/values/cupSubmissions`);
export const fetchDraft = (worksheet) => fetch(spreadsheets.DRAFT_ID, `/values/${worksheet}`);
export const fetchDivisions = () => fetch(spreadsheets.DRAFT_ID, `/values/Divisions`);
export const fetchSetup = (worksheet) => fetch(spreadsheets.SETUP_ID, `/values/${worksheet}`);
export const fetchGameWeeks = () => fetch(spreadsheets.SETUP_ID, `/values/GameWeeks`);
export const fetchPlayers = () => fetch(spreadsheets.SETUP_ID, `/values/Players`);
export const savePremierLeagueTransfers = (data = []) => saveRows(spreadsheets.TRANSFERS_ID, `premierLeague`, data);
export const saveChampionshipTransfers = (data = []) => saveRows(spreadsheets.TRANSFERS_ID, `championship`, data);
export const saveLeagueOneTransfers = (data = []) => saveRows(spreadsheets.TRANSFERS_ID, `leagueOne`, data);
export const saveLeagueTwoTransfers = (data = []) => saveRows(spreadsheets.TRANSFERS_ID, `leagueTwo`, data);
export const saveTransfers = (worksheet, data = []) => saveRows(spreadsheets.TRANSFERS_ID, worksheet, data);
export const saveCupTeam = (data = []) => saveRows(spreadsheets.TRANSFERS_ID, 'cupSubmissions', data);

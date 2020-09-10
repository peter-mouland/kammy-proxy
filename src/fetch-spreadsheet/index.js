const { getJSON } = require('../fetchr');
const { spreadsheets } = require('./constants');
const googleSpreadsheet = require('./lib/GoogleSpreadsheet');

const saveRows = async (spreadsheetId, worksheetName, data) => {
    const { addRows } = await googleSpreadsheet(spreadsheetId)
    return await addRows(worksheetName, data);
};

const ACCESS_KEY = process.env.SPREADSHEET_ACCESS_KEY;

const fetch = (spreadsheet, endpoint, opts = {}) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet}${endpoint}`;
    const fullUrl = Object.keys(opts).reduce((prev, opt) => (
        `${prev}${opts[opt] === true ? `&${opt}=true` : ''}`
    ), `${url}?key=${ACCESS_KEY}`);
    return getJSON(fullUrl);
};

module.exports = {
    fetch,
    fetchTransfers: (division) => fetch(spreadsheets.TRANSFERS_ID, `/values/${division}`),
    fetchPremierLeagueTransfers: () => fetch(spreadsheets.TRANSFERS_ID, `/values/premierLeague`),
    fetchChampionshipTransfers: () => fetch(spreadsheets.TRANSFERS_ID, `/values/championship`),
    fetchLeagueOneTransfers: () => fetch(spreadsheets.TRANSFERS_ID, `/values/leagueOne`),
    fetchLeagueTwoTransfers: () => fetch(spreadsheets.TRANSFERS_ID, `/values/leagueTwo`),
    fetchCup: () => fetch(spreadsheets.TRANSFERS_ID, `/values/cup`),
    fetchCupSubmissions: () => fetch(spreadsheets.TRANSFERS_ID, `/values/cupSubmissions`),

    fetchDraft: (worksheet) => fetch(spreadsheets.DRAFT_ID, `/values/${worksheet}`),
    fetchDivisions: () => fetch(spreadsheets.DRAFT_ID, `/values/Divisions`),

    fetchSetup: (worksheet) => fetch(spreadsheets.SETUP_ID, `/values/${worksheet}`),
    fetchGameWeeks: () => fetch(spreadsheets.SETUP_ID, `/values/GameWeeks`),
    fetchPlayers: () => fetch(spreadsheets.SETUP_ID, `/values/Players`),

    savePremierLeagueTransfers: (data = []) => saveRows(spreadsheets.TRANSFERS_ID, `premierLeague`, data),
    saveChampionshipTransfers: (data = []) => saveRows(spreadsheets.TRANSFERS_ID, `championship`, data),
    saveLeagueOneTransfers: (data = []) => saveRows(spreadsheets.TRANSFERS_ID, `leagueOne`, data),
    saveLeagueTwoTransfers: (data = []) => saveRows(spreadsheets.TRANSFERS_ID, `leagueTwo`, data),
    saveTransfers: (worksheet, data = []) => saveRows(spreadsheets.TRANSFERS_ID, worksheet, data),
    saveCupTeam: (data = []) => saveRows(spreadsheets.TRANSFERS_ID, 'cupSubmissions', data),
};

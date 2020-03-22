const { getJSON } = require('../fetchr');
const { spreadsheets } = require('./constants');

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
    fetchCup: () => fetch(spreadsheets.TRANSFERS_ID, `/values/cup`),

    fetchDraft: (worksheet) => fetch(spreadsheets.DRAFT_ID, `/values/${worksheet}`),
    fetchDivisions: () => fetch(spreadsheets.DRAFT_ID, `/values/Divisions`),

    fetchSetup: (worksheet) => fetch(spreadsheets.SETUP_ID, `/values/${worksheet}`),
    fetchGameWeeks: () => fetch(spreadsheets.SETUP_ID, `/values/GameWeeks`),
    fetchPlayers: () => fetch(spreadsheets.SETUP_ID, `/values/Players`),
};

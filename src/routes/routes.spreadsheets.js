import Router from 'koa-router';

import handleError from '../koa-middleware-handler-error';
import {
    fetchTransfers,
    fetchPremierLeagueTransfers,
    fetchChampionshipTransfers,
    fetchLeagueOneTransfers,
    fetchCup,
    fetchDraft,
    fetchDivisions,
    fetchSetup,
    fetchGameWeeks,
    fetchPlayers,
    fetch,
} from '../fetch-spreadsheet';


const responder = (ctx, next) => (data) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = data;
  next();
};

export default () => {
    const router = Router({ prefix: '/spreadsheets' });
    router.use(handleError());

    router.get('/', (ctx) => {
        ctx.type = 'json';
        ctx.status = 200;
        ctx.response.body = { status: 'healthy' };
    });

    router.get('/transfers/:division', (ctx, next) => {
        const { division } = ctx.params;
        return fetchTransfers(division).then(responder(ctx, next))
    });
    router.get('/premierLeagueTransfers', (ctx, next) => fetchPremierLeagueTransfers().then(responder(ctx, next)));
    router.get('/championshipTransfers', (ctx, next) => fetchChampionshipTransfers().then(responder(ctx, next)));
    router.get('/leagueOneTransfers', (ctx, next) => fetchLeagueOneTransfers().then(responder(ctx, next)));
    router.get('/cup', (ctx, next) => fetchCup().then(responder(ctx, next)));
    router.get('/draft/:sheet', (ctx, next) => {
        const { sheet } = ctx.params;
        fetchDraft(sheet).then(responder(ctx, next))
    });
    router.get('/divisions', (ctx, next) => fetchDivisions().then(responder(ctx, next)));
    router.get('/setup/:sheet', (ctx, next) => {
        const { sheet } = ctx.params;
        return fetchSetup(sheet).then(responder(ctx, next))
    });
    router.get('/gameWeeks', (ctx, next) => fetchGameWeeks().then(responder(ctx, next)));
    router.get('/players', (ctx, next) => fetchPlayers().then(responder(ctx, next)));

    // fall through to direct 1:1 proxy...
    router.get('/:spreadsheet/values/:endpoint', (ctx, next) => {
        const { spreadsheet, endpoint } = ctx.params;
        return fetch(spreadsheet, `/values/${endpoint}`).then(responder(ctx, next))
    });
    return router;
};

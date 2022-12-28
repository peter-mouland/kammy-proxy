import Router from 'koa-router';

import handleError from '../koa-middleware-handler-error/index.mjs';
import { getJSON } from '../fetchr/index.mjs';

const responder = (ctx, next) => (data) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = data;
  next();
};

export default () => {
  const router = Router({ prefix: '/skysports' });
  router.use(handleError());

  router.get('/', (ctx) => {
    ctx.type = 'json';
    ctx.status = 200;
    ctx.response.body = { status: 'healthy' };
  });

  router.get('/scores', (ctx, next) => getJSON('https://fantasyfootball.skysports.com/scoring/scores.json').then(responder(ctx, next)));
  router.get('/fixtures', (ctx, next) => getJSON('https://fantasyfootball.skysports.com/cache/json_fixtures.json').then(responder(ctx, next)));
  router.get('/player_stats', (ctx, next) => getJSON(`https://fantasyfootball.skysports.com/cache/json_player_stats_${code}.json`).then(responder(ctx, next)));
  router.get('/players', (ctx, next) => {
    // ctx.compress = false;
    return getJSON('https://fantasyfootball.skysports.com/cache/json_players.json').then(responder(ctx, next))
  });

  router.get('/player/:code', (ctx, next) => {
    const { code } = ctx.params;
    return getJSON(`https://fantasyfootball.skysports.com/cache/json_player_stats_${code}.json`).then(responder(ctx, next));
  });

  return router;
};

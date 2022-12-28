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
  const router = Router({ prefix: '/fpl' });
  router.use(handleError());

  router.get('/', (ctx) => {
    ctx.type = 'json';
    ctx.status = 200;
    ctx.response.body = { status: 'healthy' };
    ctx.response.headers['access-control-allow-origin'] = '*';
  });

  router.get('/bootstrap-static', (ctx, next) => getJSON('https://fantasy.premierleague.com/api/bootstrap-static/').then(responder(ctx, next)));
  router.get('/fixtures', (ctx, next) => getJSON('https://fantasy.premierleague.com/api/fixtures/').then(responder(ctx, next)));
  router.get('/element-summary/:code', (ctx, next) => {
    const { code } = ctx.params;
    return getJSON(`https://fantasy.premierleague.com/api/element-summary/${code}/`).then(responder(ctx, next));
  });

  return router;
};

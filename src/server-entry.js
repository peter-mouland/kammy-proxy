import './polyfills';
import './config/config';

import Koa from 'koa';
import compress from 'koa-compress';
import session from 'koa-session';
import convert from 'koa-convert';
import qs from 'koa-qs';
import Router from 'koa-router';
import koaStatic from 'koa-static';

import headers from './koa-middleware-headers';

import skySportsRouter from './routes/routes.skysports';
import { DIST } from './config/paths';

const YEAR = 100 * 60 * 60 * 24 * 7 * 52;
const server = new Koa();
const router = new Router();
const staticRoute = koaStatic(DIST, { immutable: true, maxage: YEAR });
const skySportsRoutes = skySportsRouter();

qs(server);

staticRoute._name = 'koaStatic /dist'; // eslint-disable-line no-underscore-dangle
server.keys = ['Shh, its a session!'];
server.use(convert(session({
  key: 'session', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
}, server)));

server.use(compress());
server.use(headers());

router
    .use(skySportsRoutes.routes())
    .use(skySportsRoutes.allowedMethods())
    .use(staticRoute);
server.use(router.routes());
server.listen(process.env.DEV_PORT || process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line no-console
});

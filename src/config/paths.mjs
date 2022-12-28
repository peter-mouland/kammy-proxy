import path from 'node:path';

export const ROOT = path.join(process.cwd());
export const SRC = path.join(ROOT, 'src');
export const SERVER = path.join(SRC, 'server');
export const COMPILED = path.join(ROOT, 'compiled');
export const DIST = path.join(COMPILED, 'dist');
export const STATIC = path.join(DIST, 'static');
export const APP = path.join(SRC, 'app');
export const ICONS = path.join(SRC, 'icons');
export const STYLES = path.join(SRC, 'styles');
export const TESTS = path.join(ROOT, 'tests');
export const ASSET_FILE = path.join(DIST, 'webpack-assets.json');

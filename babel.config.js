module.exports = function babelConfig(api) {
  api.cache(true);

  return {
    presets: [['@babel/preset-env', {
      targets: { node: '10' },
    }]],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      [
        '@babel/plugin-transform-runtime',
        {
          absoluteRuntime: false,
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
        },
      ],
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-class-properties',
    ],
  };
};

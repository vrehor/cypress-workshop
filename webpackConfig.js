const nrwlConfig = require('@nrwl/react/plugins/webpack.js');

module.exports = (config, context) => {
  nrwlConfig(config);

  return {
    ...config,
    module: {
      ...config.module,
      rules: [...config.module.rules],
    },
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
      },
    },
    plugins: [...config.plugins],
  };
};

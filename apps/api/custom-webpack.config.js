// Helper for combining webpack config objects
const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.hbs$/,
          loader: 'raw-loader',
          options: {
            esModule: false,
          },
        },
        {
          test: /\.ya?ml$/,
          use: 'yaml-loader',
        },
      ],
    },
  });
};

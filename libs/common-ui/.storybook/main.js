const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [
    ...rootMain.stories,
    '../src/components/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    ...rootMain.addons,
    '@nrwl/react/plugins/storybook',
    'storybook-dark-mode/register',
  ],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    // add your own webpack tweaks if needed
    config.module.rules.push({
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['@babel/react'],
        plugins: [['import', { libraryName: 'antd', style: true }]],
      },
    });

    // Overwrite existng less-loader
    for (const nestedRule of config.module.rules.find(rule =>
      rule.test.toString().includes('.less')
    ).oneOf) {
      if (nestedRule.test.toString().includes('.less')) {
        const lessLoader = nestedRule.use.find(({ loader }) =>
          loader.includes('less-loader')
        );
        lessLoader.options.lessOptions = {
          javascriptEnabled: true,
          modifyVars: { ...require('../src/themes/antd') },
        };
      }
    }

    return config;
  },
};

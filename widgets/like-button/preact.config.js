const { parsed } = require('dotenv').config();

export default (config, env, helpers) => {
  const postCssLoaders = helpers.getLoadersByName(config, 'postcss-loader');
  postCssLoaders.forEach(({ loader }) => {
    const plugins = loader.options.plugins;

    // Add tailwind css at the top.
    plugins.unshift(require('tailwindcss'));
  });

  const [{ plugin }] = helpers.getPluginsByName(config, 'DefinePlugin');

  plugin.definitions = {
    ...plugin.definitions,
    ...Object.keys(parsed).reduce(
      (env, key) => ({
        ...env,
        [`process.env.${key}`]: JSON.stringify(parsed[key]),
      }),
      {},
    ),
  };

  if (env.production) {
    config.output.libraryTarget = 'umd';
  }

  return config;
};

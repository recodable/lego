import { DefinePlugin } from 'webpack';

export default (config, env, helpers) => {
  const postCssLoaders = helpers.getLoadersByName(config, 'postcss-loader');
  postCssLoaders.forEach(({ loader }) => {
    const plugins = loader.options.plugins;

    // Add tailwind css at the top.
    plugins.unshift(require('tailwindcss'));
  });

  // config.plugins.push(
  //   new DefinePlugin({
  //     API_URL: env.production ? '' : 'http://localhost:3000',
  //   }),
  // );

  if (env.production) {
    config.output.libraryTarget = 'umd';
  }

  return config;
};

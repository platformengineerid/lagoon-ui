const webpackShared = require('./webpack.shared-config');
require('dotenv-extended').load();

const withCSS = require('@zeit/next-css');

const taskBlocklist =
  (process.env.LAGOON_UI_TASK_BLOCKLIST &&
    process.env.LAGOON_UI_TASK_BLOCKLIST.split(',')) ||
  [];

module.exports = withCSS({
  publicRuntimeConfig: {
    GRAPHQL_API: process.env.GRAPHQL_API,
    GRAPHQL_API_TOKEN: process.env.GRAPHQL_API_TOKEN,
    KEYCLOAK_API: process.env.KEYCLOAK_API,
    LAGOON_UI_ICON: process.env.LAGOON_UI_ICON,
    LAGOON_UI_TASK_BLOCKLIST: taskBlocklist,
    LAGOON_VERSION: process.env.LAGOON_VERSION,
    LAGOON_UI_DEPLOYMENTS_LIMIT: process.env.LAGOON_UI_DEPLOYMENTS_LIMIT,
    LAGOON_UI_DEPLOYMENTS_LIMIT_MESSAGE: process.env.LAGOON_UI_DEPLOYMENTS_LIMIT_MESSAGE,
    LAGOON_UI_TASKS_LIMIT: process.env.LAGOON_UI_TASKS_LIMIT,
    LAGOON_UI_TASKS_LIMIT_MESSAGE: process.env.LAGOON_UI_TASKS_LIMIT_MESSAGE,
    LAGOON_UI_BACKUPS_LIMIT: process.env.LAGOON_UI_BACKUPS_LIMIT,
    LAGOON_UI_BACKUPS_LIMIT_MESSAGE: process.env.LAGOON_UI_BACKUPS_LIMIT_MESSAGE,
  },
  distDir: '../build',
  webpack(config, options) {
    // Add aliases from shared config file.
    Object.keys(webpackShared.alias).forEach(name => config.resolve.alias[name] = webpackShared.alias[name]);

    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./lib/polyfills.js')
      ) {
        entries['main.js'].unshift('./lib/polyfills.js');
      }

      return entries;
    };

    // Debug config.
    // console.dir(config, { depth: null });

    return config;
  }
});

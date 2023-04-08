const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "erp-products-mef": "http://localhost:4201/remoteEntry.js",
    "erp-supply-mef": "http://localhost:4202/remoteEntry.js",
    "erp-employees-mef": "http://localhost:4203/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});

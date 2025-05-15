const { override } = require("customize-cra");

module.exports = override((config, env) => {
  // No Webpack changes here
  return config;
});

// Fix deprecated Webpack Dev Server options
module.exports.devServer = function (configFunction) {
  return function (proxy, allowedHost) {
    const config = configFunction(proxy, allowedHost);

    // Replace deprecated middleware options
    config.setupMiddlewares = (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }
      return middlewares;
    };

    return config;
  };
};

const ExtraWatchWebpackPlugin = require("extra-watch-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  webpack: (config, options, webpack) => {
    config.plugins.push(
      new ExtraWatchWebpackPlugin({
        files: ["src/**/*.graphql"]
      })
    );
    config.plugins.push(
      new Dotenv({
        path: "./.env.development"
      })
    );

    config.resolve.alias = {
      src: path.join(__dirname, "./src")
    };

    config.module.rules.push({
      exclude: /node_modules/,
      test: /\.graphql$/,
      use: [{ loader: "graphql-import-loader" }]
    });

    return config;
  }
};

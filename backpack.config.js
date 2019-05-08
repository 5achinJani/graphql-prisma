const ExtraWatchWebpackPlugin = require("extra-watch-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const NODE_ENV = process.env.NODE_ENV;

const env_path = {
  development: "./.development.env",
  test: "./.test.env",
  production: "./.production.env"
};

module.exports = {
  webpack: (config, options, webpack) => {
    config.plugins.push(
      new ExtraWatchWebpackPlugin({
        files: ["src/**/*.graphql"]
      })
    );
    config.plugins.push(
      new Dotenv({
        path: env_path[NODE_ENV]
      })
    );
    config.plugins.push(
      new CopyPlugin([{ from: "src/services/emails", to: "emails" }])
    );

    config.resolve.alias = {
      src: path.join(__dirname, "./src")
    };

    config.module.rules.push({
      exclude: /node_modules/,
      test: /\.graphql$/,
      use: [{ loader: "graphql-import-loader" }]
    });

    config.node = {
      ...config.node,
      __dirname: true
    };

    return config;
  }
};

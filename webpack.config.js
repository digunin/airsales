const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: isDev ? "[name].[contenthash].js" : "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ca]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "index.html",
      title: "Airsales",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  devtool: "source-map",
  devServer: {
    port: 5500,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};

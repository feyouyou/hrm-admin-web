const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDev ? "development" : "production",
  devtool: "source-map",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name]-[chunkhash:5].js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@common": path.resolve(__dirname, "./src/common"),
    },
  },
  devServer: {
    open: false,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|webp|svg|gif)$/,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "images/[name]-[contenthash:5][ext]",
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    ...(isDev
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: "css/[name]-[chunkhash:5].css",
          }),
        ]),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxSize: 100000,
    },
  },
  stats: {
    modules: false,
  },
};

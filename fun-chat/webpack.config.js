const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = isDev =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          hot: true,
          port: 8080,
          historyApiFallback: {
            rewrites: [{ from: /^\/$/, to: '/index.html#/' }]
          },
          compress: true
        }
      };

const esLintPlugin = isDev => (isDev ? [] : [new ESLintPlugin({ extensions: ['ts', 'js'] })]);

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  entry: {
    main: './src/index.ts'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext]'
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(mp3|wav|mpe?g|ogg)?$/i,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    ...esLintPlugin(development),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlWebpackPlugin({
      title: 'Fun Chat',
      favicon: './public/favicon.ico'
    }),
    new CopyPlugin({
      patterns: [{ from: 'public' }]
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },

  ...devServer(development)
});

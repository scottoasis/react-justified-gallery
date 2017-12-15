const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './index.tsx'
  ],
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.d.ts', '.tsx', '.ts', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [
          'babel-loader?presets[]=es2015'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.tsx?$/,
        loaders: [
          'babel-loader?presets[]=es2015',
          'ts-loader'
        ],
        exclude: /node_modules/
      }
    ],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: '6100',
    inline: false,
    contentBase: resolve(__dirname, 'build'),
    disableHostCheck: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
        AWS_S3_BUCKET: JSON.stringify(process.env.AWS_S3_BUCKET),
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'ejs-render-loader!./index.ejs',
      inject: true,
      options: {
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      }
    })
  ]
};

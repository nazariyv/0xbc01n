const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  node: {
    fs: "empty"
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    proxy: {
      "/api": {
        "target": "http://backend:8080",
        "secure": false,
      },
    },
  },
  // TODO: below is for how to serve the production
  // https://stackoverflow.com/questions/43907196/proxying-request-from-webpack-2-using-webpack-dev-server-to-backend-api-in-docke
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: {
  //         host: "backend",
  //         protocol: 'http:',
  //         port: 8080
  //       },
  //       ignorePath: true,
  //       changeOrigin: true,
  //       secure: false
  //     },
  //   },
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     IEX_PUB_KEY: JSON.stringify('pk_8f71a3eefdbb49fa8fb7596473b191ef')
  //   })
  // ],
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}

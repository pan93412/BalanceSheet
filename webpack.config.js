const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    publicJS: './src/index.js',
    publicCSS: './src/css.js',
    money: './src/money.js'
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.s(?:c|a)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(?:svg|png|eot|woff2|woff|ttf|jpg)/,
        use: 'file-loader'
      }
    ]
  }
}

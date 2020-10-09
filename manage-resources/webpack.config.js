const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js'
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // css解析
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // 图片解析
      {
        test: /\.(png|svg|j[g|gif])$/,
        use: [
          'file-loader'
        ]
      },
      // 字体解析
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      // 数据解析
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      },
      {
        test: /\.xls$/,
        use: [
          'excel-loader'
        ]
      }
    ]
  }
}
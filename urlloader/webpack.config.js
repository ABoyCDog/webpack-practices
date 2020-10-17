const path = require('path')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './input.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'output.bundle.js'
  },
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // limit: 8192 // 说明小于8192字节也就是8k才会执行
              limit: 1024000
            }
          }
        ]
      }
    ]
  }
}
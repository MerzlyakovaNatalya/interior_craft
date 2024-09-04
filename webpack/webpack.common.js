const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'), // точка входа вашего приложения
  resolve: {
    //расширения файлов, которые Webpack будет искать при разрешении модулей
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    //объект определяет, как Webpack должен обрабатывать различные типы файлов
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    //созданные бандлы будут сохранены в каталоге ./build и будут названы bundle.js
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
    publicPath: 'auto',
  },
  plugins: [
    // массив содержит список плагинов, которые используются в процессе сборки
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
      favicon: path.resolve(__dirname, '..', './src/favicon.ico/'),
    })
  ],
}
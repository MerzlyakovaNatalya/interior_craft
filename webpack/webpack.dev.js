const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
    port: 8081,
    proxy: [
      {
        context: ['/api/**'],
        target: 'https://natamnata.amocrm.ru/',
        secure: false,
        changeOrigin: true,
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Vishwas'),
    }),
  ],
}
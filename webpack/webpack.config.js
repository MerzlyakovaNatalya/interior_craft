const { merge } = require('webpack-merge') // Функция merge используется для объединения двух или более объектов конфигурации Webpack в один.
const commonConfig = require('./webpack.common.js')

module.exports = (envVars) => {
  const { env } = envVars
  const envConfig = require(`./webpack.${env}.js`)
  const config = merge(commonConfig, envConfig)
  return config
}
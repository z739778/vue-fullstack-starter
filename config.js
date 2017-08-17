const path = require('path')
const _ = require('lodash')
const backendBase = {
  root: path.normalize(__dirname),
  port: process.env.PORT || 9000,
  secret: {
    session: process.env.SECRET || 'vue-fullstack-demo-secret'
  },
  userRoles: ['admin', 'user'],
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
}
const development = {
  frontend: {
    port: 9001,
    assetsRoot: path.resolve(__dirname, './client/src'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://localhost:' + backendBase.port,
        changeOrigin: true
      },
      '/socket.io': {
        target: 'http://localhost:' + backendBase.port,
        changeOrigin: true,
        ws: true
      },
      cssSourceMap: false
    },
    backend: _.merge({},backendBase,{
      mongo:{
        uri:'mongodb://localhost/vue-fulstack-demo-dev'
      }
    })
  }
}
const production = {
  frontend: {
    index: path.resolve(__dirname, './client/dist/index.html'),
    assetsRoot: path.resolve(__dirname, './client/dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    cssSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  backend: _.merge({}, backendBase, {
    serverFrontend: true,
    ip: process.env.APP_HOST || process.env.APP_IP || process.env.HOST || process.env.IP,
    port: process.env.APP_PORT || process.env.PORT,
    mongo: {
      uri: process.env.MONGODB_URI || process.env.MONGOHQ_URI ||
           'mongodb://localhost/vue-fullstack-demo'
    },
    frontend: path.resolve(__dirname, './client/dist')
  })
}
const config = process.env.NODE_ENV === 'production' ? production : development

module.exports = _.assign({}, config)

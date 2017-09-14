const Koa = require('koa')
const {Nuxt, Builder} = require('nuxt')
const Redis = require('ioredis')
const redis = new Redis()
const bunyan = require('bunyan')
const mkdirp = require('mkdirp')
const koaBunyan = require('koa-bunyan')
const koaLogger = require('koa-bunyan-logger')
// const io = require('socket.io')(server)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
// no-deprecation 静默输出
process.noDeprecation = true

const config = require('./nuxt.config')
config.dev = !(process.env.NODE_ENV === 'production')
const nuxt = new Nuxt(config)

// Start nuxt.js
const start = async () => {
  const app = new Koa()

  // loggin
  let logDir = process.env.LOG_DIR || '/var/tmp/log'
  mkdirp.sync(logDir)
  logDir = logDir.replace(/(\\|\/)$/, '') + '/'

  const access = {
    type: 'rotating-file',
    path: `${logDir}picker-access.log`,
    level: config.dev ? 'debug' : 'info',
    period: '1d',
    count: 4
  }
  const error = {
    type: 'rotating-file',
    path: `${logDir}picker-error.log`,
    level: 'error',
    period: '1d',
    count: 4
  }
}


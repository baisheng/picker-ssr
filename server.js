// const fs = require('fs')
const app = require('express')()
// eslint-disable-next-line new-cap
const server = require('http').Server(app)
// const Cookie = require('js-cookie')
const cookieParser = require('cookie-parser')
const Redis = require('ioredis')
const redis = new Redis()
// const io = require('socket.io')(server)
const {Nuxt, Builder} = require('nuxt')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
// no-deprecation 静默输出
process.noDeprecation = true

// extend
// const debounce = require('./utils/debounce')

app.set('port', port)

// Import and Set Nuxt.js options
const config = require('./nuxt.config')
config.dev = !(process.env.NODE_ENV === 'production')
const nuxt = new Nuxt(config)

app.use(cookieParser())

app.use(function (req, res, next) {
  redis.get('orgs', function (err, result) {
    // console.log(result);
    let orgs = JSON.parse(result)
    console.log(orgs)
    console.log(req.hostname)
    let orgId = orgs[req.hostname]
    // console.log(orgId + '----')
    // res.cookie('_org_id', orgId);
    // res.cookie('__api', 'http://api.picker.la/rest/orgs/' + orgId);
    // if (orgId !== null) {
    // Cookie.set('_org_id', orgId)
    // }
  });
  next();

  // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  // console.log(ip + '---')
  // console.log(req.hostname + 'xxx')
  // console.log(req.headers.host + '----')
  // console.log(request.ip)
  // if(request.url == "/") {
  //   response.send("Welcome to the homepage!");
  // }else {
  //   next();
  // }
})

// console.log(config.dev)
// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build().catch((error) => {
    // eslint-disable-line no-console
    console.error(error)
    process.exit(1)
  })
}
// Init Nuxt.js
app.use(nuxt.render)
console.log('come in ...')
// Listen the server
server.listen(port, host)
// eslint-disable-line no-console
console.log(`Nuxt.js SSR Server listening on ${host}:${port}, at ${new Date().toLocaleString()}`)

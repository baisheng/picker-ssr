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

  if (req) {
    redis.get('orgs', (err, result) => {
      let orgs = JSON.parse(result)
      let orgId = orgs[req.hostname]
      // 如果域存在
      if (orgId) {
        let cookie = req.cookies.__org_id;
        // console.log('cookie: ' + cookie + ', orgId: ' + orgId)
        if (cookie === undefined || cookie !== orgId.toString()) {
          console.log('reset cookie')
          // var _send = res.send;
          // var sent = false;
          // res.send = function(data){
          //   if(sent) return;
          //   _send.bind(res)(data);
          //   sent = true;
          // };
          res.cookie('__org_id', orgId, {maxAge: 60 * 60 * 24 * 7, httpOnly: true});
          // next()
          // return res.end()
          // return next()
        }
        return next()
      } else {
        // 404
        console.log('404...')
        res.redirect('/home')
        return next()
        // res.send("Welcome to the homepage!");
      }
      // Cookie.set('_org_id', orgId)
    });
  }
  return next()
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
// Listen the server
server.listen(port, host)
// eslint-disable-line no-console
console.log(`Nuxt.js SSR Server listening on ${host}:${port}, at ${new Date().toLocaleString()}`)

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle authentication /auth element                                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
import koaRouter from 'koa-router'
import consts from '../utils/consts'
import config from '../../api.config'
import axios from 'axios'
import OAuth from 'co-wechat-oauth'
// var OAuth = require('co-wechat-oauth');
// var client = new OAuth('your appid', 'your secret');
const fs = require('fs');
// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);

const router = koaRouter({
  prefix: '/api'
}) // router middleware for koa

const request = axios.create({
  baseURL: config.baseURL
})
// router.get('/wechat', async (ctx) => {
// })
router.post('/app/:appid/login', async(ctx) => {
  const data = ctx.request.body
  console.log(data)
  let option = await ctx.redis.get(`picker_${ctx.params.appid}_options`)
  if (option === null) {
    const response = await request.get(`/app/${ctx.params.appid}/options`)
    option = response.data.data
  }
  if (option !== null) {
    option = JSON.parse(option)
    const wechat = option.wechat
    // console.log(JSON.stringify(wechat))
    // 69ef69490d90f8c51c20039f6e29fb4e
    let client = new OAuth('wxca1f2b8b273d909e', '69ef69490d90f8c51c20039f6e29fb4e')
    // await ctx.session('code', data.code)
    // await client.getAuthorizeURL(`${config.baseURL}/api/app/${ctx.params.appid}/openid`, 'state', 'scope');
    console.log(data.code)
    const token = await client.getAccessToken(data.code);
    const accessToken = token.data.access_token;
    const openid = token.data.openid;

    console.log(token + ':' + accessToken + ':' + openid)
    return token
    // await client.getAuthorizeURL(`${config.baseURL}/api/app/${ctx.params.appid}/openid`, 'state', 'scope');
    // console.log(client)
  }
  // console.log(data)
})
router.get('/app/:appid/wechat', async (ctx) => {
  let option = await ctx.redis.get(`picker_${ctx.params.appid}_options`)
  if (option === null) {
    const response = await request.get(`/app/${ctx.params.appid}/options`)
    option = response.data.data
  }
  if (option !== null) {
    option = JSON.parse(option)
    const wechat = option.wechat
    // console.log(JSON.stringify(wechat))
    let client = new OAuth(wechat.appid, wechat.appsecret)
    await client.getAuthorizeURL(`${config.baseURL}/api/app/${ctx.params.appid}/openid`, 'state', 'scope');
    console.log(client)
  }

  ctx.body = Object.assign({}, {'hi': 'hello'})
  ctx.status = 200
})
router.get('/app/:appid/openid', async (ctx) => {
  console.log(ctx.get('code'))
  // let client = new OAuth(wechat.appid, wechat.appsecret)
  // let token = await client.getAccessToken('code');
})
module.exports = router.routes()

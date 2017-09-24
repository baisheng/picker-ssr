/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle authentication /auth element                                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
import koaRouter from 'koa-router'
import consts from '../utils/consts'
import config from '../../api.config'
// import querystring from 'querystring'
import axios from 'axios'
// import OAuth from 'co-wechat-oauth'
// var OAuth = require('co-wechat-oauth');
// var client = new OAuth('your appid', 'your secret');
const fs = require('fs');
// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);
// import WXBizDataCrypt from '../utils/WXBizDataCrypt'
import Verification from '../lib/verification'

const router = koaRouter({
  prefix: '/api'
}) // router middleware for koa

const request = axios.create({
  baseURL: config.baseURL
})
const getWxAppUserInfo = (encrypted_data, iv, code) => {

}

router.post('/app/:appid/login', async (ctx) => {
  // console.log(count++)
  const data = ctx.request.body
  // console.log(data)
  let option = await ctx.redis.get(`picker_${ctx.params.appid}_options`)
  if (option === null) {
    const response = await request.get(`/app/${ctx.params.appid}/options`)
    option = response.data.data
  }
  if (option !== null) {
    option = JSON.parse(option)
    const wx = option.wechat
    const verify = new Verification(wx.appid, wx.appsecret)
    let userInfo = await verify.getUserInfo(data.username, data.password, data.code)
    userInfo.approach = 'wxapp'
    const regUser = await request.post(`/app/${ctx.params.appid}/users`, userInfo)
    console.log(regUser)
  }
  ctx.status = 200
  // console.log(data)
})
// router.post('/app/:appid/autho/token?code')
router.get('/app/:appid/wechat', async (ctx) => {
  let option = await ctx.redis.get(`picker_${ctx.params.appid}_options`)
  if (option === null) {
    const response = await request.get(`/app/${ctx.params.appid}/options`)
    option = response.data.data
  }
  if (option !== null) {
    option = JSON.parse(option)
    const wx = option.wechat
    const verify = new Verification(wx.appid, wx.appsecret)
    await verify.getSessionKey()
    // console.log(JSON.stringify(wechat))
    // let client = new OAuth(wechat.appid, wechat.appsecret)
    // await client.getAuthorizeURL(`${config.baseURL}/api/app/${ctx.params.appid}/openid`, 'state', 'scope');
    // console.log(client)
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

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


/**
 * 获取应用配置
 *
 * @param ctx
 * @param next
 * @returns {Promise.<*>}
 */
const getOptions = async (ctx) => {
  // console.log(data)
  let options = await ctx.redis.get(`picker_${ctx.params.appid}_options`)
  if (options === null) {
    const response = await request.get(`/app/${ctx.params.appid}/options`)
    options = response.data.data
  }
  options = JSON.parse(options)
  return options
}

router.get('/app/:appid/options/:type', async (ctx) => {
  console.log('get options')
  if (ctx.params.type === 'wxapp') {
    const option = await getOptions(ctx)
// eslint-disable-next-line prefer-reflect
//     delete option._wxapp.config
// eslint-disable-next-line no-undef
    Reflect.deleteProperty(option._wxapp, 'config')
    ctx.body = {errno: 0, data: option._wxapp}
    ctx.status = 200
  }
})
router.post('/app/:appid/login', async (ctx) => {
  // console.log(count++)
  const data = ctx.request.body
  let option = await getOptions(ctx)
  // let option = await ctx.redis.get(`picker_${ctx.params.appid}_options`)
  // if (option === null) {
  //   const response = await request.get(`/app/${ctx.params.appid}/options`)
  //   option = response.data.data
  // }
  // console.log(option._wxapp)
  if (option !== null) {
    // console.log(option)
    // option = JSON.parse(option)
    // console.log(option._wxapp)
    const wx = option._wxapp.config
    // console.log(wx.appid)
    // console.log(wx.appsecret)
    // console.log('-----------')
    const verify = new Verification(wx.appid, wx.appsecret)

    const userInfo = await verify.getUserInfo(data.username, data.password, data.code)
    userInfo.approach = 'wxapp'
    const regUser = await request.post(`/app/${ctx.params.appid}/users`, userInfo)
    ctx.body = regUser.data
  }
  // ctx.body = 'lalaalal'
  ctx.status = 200
  // console.log(data)
})


module.exports = router.routes()

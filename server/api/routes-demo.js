/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle authentication /auth element                                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
import koaRouter from 'koa-router'
import consts from '../utils/consts'
import config from '../../api.config'
import axios from 'axios'

const router = koaRouter({
  prefix: '/api'
}) // router middleware for koa

const request = axios.create({
  baseURL: config.baseURL
})
router.get('/podcast/recommend', async function getActivities (ctx) {
  for (const item of ctx.org.apps) {
    if (item.type === 'podcasts') {
      ctx.appId = item.id
    }
  }
  console.log(ctx.appId)
  const response = await request.get(`/app/${ctx.appId}/posts`)
  ctx.body = Object.assign({}, response.data)
  ctx.status = 200
})


module.exports = router.routes()

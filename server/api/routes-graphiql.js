/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle authentication /auth element                                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
import koaRouter from 'koa-router'
import consts from '../utils/consts'
import config from '../../api.config'
import axios from 'axios'
import { graphiqlKoa } from 'apollo-server-koa';
const router = koaRouter({
  prefix: '/api'
}) // router middleware for koa

const request = axios.create({
  baseURL: config.baseURL
})
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

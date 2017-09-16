const consts = require('../../client/utils/consts')

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || '3000'

module.exports = Object.freeze({
  HOST,
  PORT,
  LB_ADDR: process.env.LB_ADDR || `http://${HOST}:${PORT}/api`,
  consts
})

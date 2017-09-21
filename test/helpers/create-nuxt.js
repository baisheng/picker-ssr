import {Nuxt} from 'nuxt'
// eslint-disable-next-line no-restricted-imports
import {resolve} from 'path'

export default function createNuxt () {
  const rootDir = resolve(__dirname, '../../')
  const config = require(resolve(rootDir, 'nuxt.config.js'))
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  const nuxt = new Nuxt(config)
  return nuxt
}

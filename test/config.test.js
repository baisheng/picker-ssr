import test from 'ava'
import createNuxt from './helpers/create-nuxt'

let nuxt = null

// Init nuxt.js and create server listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  nuxt = createNuxt()
  nuxt.listen(4000, 'localhost')
})

test('Vendor', async t => {
  const vendor = nuxt.options.build.vendor
  t.true(!!~vendor.indexOf('moment'), 'axios added to config')
  t.true(!!~vendor.indexOf('vue-awesome'), 'vue-awesome added to config')
  t.true(!!~vendor.indexOf('vee-validate'), 'vee-validate added to config')
})

// test('Plugin', async t => {
//   const plugins = nuxt.options.plugins
// })

// test('Middleware', async t => {
// })

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', t => {
  nuxt.close()
})

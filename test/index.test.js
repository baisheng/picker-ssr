import test from 'ava'
import moxios from 'moxios'
import createNuxt from './helpers/create-nuxt'

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null
const req = {
  headers: {
    'accept-language': 'zh'
  },
  session: {
  }
}

// Init nuxt.js and create server listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  // mock axios
  moxios.install()
  moxios.stubRequest('/api/captcha', {
    status: 200,
    data: '验证码 Mock'
  })
  nuxt = createNuxt()
  nuxt.listen(4000, 'localhost')
})

// Example of testing only generated html
// test('Route /', async t => {
//   const { html } = await nuxt.renderRoute('/', Object.assign({}, {req}))
//   t.true(html.includes('Application boilerplate based on Vue.js 2.x, Koa 2.x, Element-UI and Nuxt.js'))
// })

// test('Route /about', async t => {
//   const { html } = await nuxt.renderRoute('/about', Object.assign({}, {req}))
//   t.true(html.includes('<h1>About Page</h1>'))
// })

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', t => {
  moxios.uninstall()
  nuxt.close()
})


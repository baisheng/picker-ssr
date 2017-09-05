/* eslint-disable comma-dangle */
const nodeExternals = require('webpack-node-externals')
// const apiConfig = require('./api.config')
module.exports = {
  cache: {
    max: 20,
    maxAge: 600000
  },
  router: {
    middleware: 'check-auth'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'picker-ssr',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Picker manager ssr version'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/\.(?!(?:js|json)$).{1,5}$/i, /^vue-awesome/, /^vue-upload-component/]
          })
        ]
      }
    },
    vendor: ['vue-awesome', 'vee-validate']
  },
  // 为JS和Vue文件定制babel配置。https://nuxtjs.org/api/configuration-build/#analyze
  // babel: {
  //   presets: ['es2015', 'stage-2'],
  //   plugins: [
  //     'transform-async-to-generator',
  //     'transform-runtime'
  //   ],
  //   comments: true
  // },
  // dev: (process.env.NODE_ENV !== 'production'),
  // env: {
  //   baseUrl: apiConfig.baseUrl,
  //   HOST_URL: apiConfig.socketHost
  // },
  modules: [
    // Simple usage
    '@nuxtjs/axios',
    // With options
    ['@nuxtjs/axios', { credentials: false }]
  ],

  // You can optionally use global options instead of inline form
  axios: {
    credentials: false,
    redirectError: {
      401: '/login'
    },
    requestInterceptor: (config, { store }) => {
      if (store.state.token) {
        config.headers.common['Authorization'] = 'Bearer ' + store.state.token
      }
      return config
    }
  },
  plugins: [
    // '~plugins/axios.js',
    '~plugins/vue-awesome.js',
    '~plugins/vee-validate.js',
    '~plugins/vue-dnd.js',
    { src: '~plugins/a-player.js' }
  ],
  css: [
    {src: '~assets/stylesheets/style.scss', lang: 'scss'}
  ]
}

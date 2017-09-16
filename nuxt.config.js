/* eslint-disable comma-dangle */
const nodeExternals = require('webpack-node-externals')
const apiConfig = require('./api.config')
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
    // analyze: true,
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
    vendor: ['moment', 'vue-awesome', 'vee-validate']
  },
  // 为JS和Vue文件定制babel配置。https://nuxtjs.org/api/configuration-build/#analyze
  babel: {
    presets: ['es2015', 'stage-2'],
    plugins: [
      'transform-async-to-generator',
      'transform-runtime'
    ],
    comments: true
  },
  dev: process.env.NODE_ENV !== 'production',
  env: {
    // API_URL_BROWSER: apiConfig.baseURL,
    // browserBaseURL: apiConfig.baseURL,
    baseURL: apiConfig.baseURL,
    'socket': apiConfig.socketHost
  },
  modules: [
    // Simple usage
    '@nuxtjs/axios',
    // With options
    // ['@nuxtjs/axios', { credentials: false }],
    '@nuxtjs/proxy'
  ],
  proxy: [
    ['/api',
      {
        target: apiConfig.baseURL
        // pathRewrite: { '^/api': '/rest/orgs/' }
      }]
  ],
  // You can optionally use global options instead of inline form
  axios: {
    baseURL: apiConfig.baseURL,
    // options: {
    //   baseURL: apiConfig.baseURL,
    //   API_URL_BROWSER: apiConfig.baseURL,
    //   browserBaseURL: apiConfig.baseURL,
    // },
    credentials: false,
    redirectError: {
      401: '/login'
    },
    requestInterceptor: (config, {store}) => {
      if (store.state.token) {
        config.headers.common.Authorization = 'Bearer ' + store.state.token
      }
      return config
    }
  },
  plugins: [
    {src: '~/plugins/moment.js'},
    // '~plugins/axios.js',
    '~plugins/vue-awesome.js',
    '~plugins/vee-validate.js',
    '~plugins/vue-dnd.js',
    {src: '~plugins/a-player.js', ssr: true},
    {src: '~plugins/popover.js', ssr: false}
  ],
  css: [
    {src: '~assets/stylesheets/style.scss', lang: 'scss'}
  ]
}

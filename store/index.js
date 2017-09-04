/* eslint-disable no-undef,indent,spaced-comment */
// import Service from 'axios'
// import Service from 'axios'
import {setToken, unsetToken} from '~/utils/auth'

export const state = () => ({
  user: null,
  token: null
})

export const mutations = {
  SET_USER (state, user) {
    // state.token = user[''] || null
    state.user = user || null
  },
  SET_TOKEN (state, token) {
    state.token = token || null
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  }
}

const baseUrl = 'http://vanq.picker.la/api'
export const actions = {
  async nuxtServerInit (store, {app, params, route, isServer, req}) {
    store.strict = false
    // const ip = await app.$axios.$get('http://icanhazip.com')
    // commit('SET_IP', ip)
    store.dispatch('loadOrgInfo', {axios: app.$axios})
  },
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  // async nuxtServerInit (store, { commit }) {
  // if (req.session && req.session.user) {
  //   commit('SET_USER', req.session.user)
  // }
  // const initAppData = [
  // 配置数据
  // store.dispatch('loadAdminInfo'),
  // store.dispatch('loadGlobalOption'),
  // store.dispatch('loadOrgInfo', {axios: this.$axios})
  // 内容数据
  // store.dispatch('loadTagList'),
  // store.dispatch('loadCategories')
  // ]
  // return Promise.all(initAppData)
  // },
  // 全局服务初始化
  // nuxtServerInit (store, { params, route, isServer, req }) {
  // store.$axios.setToken(state.token, 'Bearer')
  // 检查设备类型
  // const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
  // const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/ig.test(userAgent)
  // store.commit('options/SET_MOBILE_LAYOUT', isMobile)
  // store.commit('options/SET_USER_AGENT', userAgent)
  // const initAppData = [
  // 配置数据
  // store.dispatch('loadAdminInfo'),
  // store.dispatch('loadGlobalOption'),
  // store.dispatch('loadOrgInfo', {axios: store.$axios})
  // 内容数据
  // store.dispatch('loadTagList'),
  // store.dispatch('loadCategories')
  // ]
  // 如果不是移动端的话，则请求热门文章
  // if (!isMobile) {
  //   initAppData.push(store.dispatch('loadHotArticles'))
  // }
  // 首次服务端渲染时渲染评论数据
  // const isGuestbook = Object.is(route.name, 'guestbook')
  // const post_id = params.article_id || (isGuestbook ? 0 : false)
  // if (!Object.is(post_id, false)) {
  //   initAppData.push(store.dispatch('loadCommentsByPostId', { post_id }))
  // }
  // console.log('全局服务初始化')
  // return Promise.all(initAppData)
  // },

  async loadOrgInfo ({commit}, {axios}) {
    commit('org/REQUEST_ORG_INFO')
    console.log('load org')
    await axios.get(baseUrl + '/org')
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.errno, 0)
        if (success) commit('org/REQUEST_ORG_INFO_SUCCESS', response.data)
        if (!success) commit('org/REQUEST_ORG_INFO_FAILURE')
      }, err => {
        console.log(err)
        commit('org/REQUEST_ORG_INFO_FAILURE', err)
      })
  },
  // 获取标签列表
  loadTagList ({commit}) {
  },
  // 获取分类列表
  loadCategories ({commit}) {
  },
  /**
   * 获取播客详情页
   * @param commit
   * @param axios
   * @param params
   * @returns {Promise.<void>}
   */
  async loadPodcastDetail ({commit}, {axios, params}) {
    commit('podcast/REQUEST_DETAIL')
    // console.log(JSON.stringify(params) + '===')
    // console.log(params)
    await axios.get(`${baseUrl}/podcast/${params.id}`)
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.errno, 0)
        if (success) commit('podcast/GET_DETAIL_SUCCESS', response.data)
        if (!success) commit('podcast/GET_DETAIL_FAILURE')
        return Promise.resolve(response.data)
      }, err => {
        commit('podcast/GET_DETAIL_FAILURE', err)
        console.log(err)
        return Promise.reject(err)
      })
  },
  // 获取文章列表
  async loadArticles ({commit}, {axios}, params = {page: 1}) {
    commit('article/REQUEST_LIST')
    await axios.get(baseUrl + '/posts', {params})
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.errno, 0)
        const isFirstPage = params.page && params.page > 1
        const commitName = `article/${isFirstPage ? 'ADD' : 'GET'}_LIST_SUCCESS`
        if (success) commit(commitName, response.data)
        if (!success) commit('article/GET_LIST_FAILURE')
      })
      .catch(err => {
        console.log(err)
        commit('article/GET_LIST_FAILURE', err)
      })
  },
  // 获取全局配置
  loadGlobalOption ({commit}) {
    commit('options/REQUEST_GLOBAL_OPTIONS')
    return $axios.get(baseUrl + '/options')
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.errno, 0)
        if (success) commit('options/REQUEST_GLOBAL_OPTIONS_SUCCESS', response.data)
        if (!success) commit('options/REQUEST_GLOBAL_OPTIONS_FAILURE')
      }, err => {
        commit('options/REQUEST_GLOBAL_OPTIONS_FAILURE', err)
      })
  },
  async login ({commit}, {form, axios}) {
    try {
      const {data} = await axios.post(baseUrl + '/signin', form)
      if (data.errno > 0) {
        // 发送出错误状态
        console.error(data.errmsg)
        return
      }
      setToken(data.data.token)
      commit('SET_TOKEN', data.data.token)
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({commit}) {
    // await Service.post('/api/logout')
    unsetToken()
    commit('SET_USER', null)
  }

}

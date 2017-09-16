/* eslint-disable no-undef,indent,spaced-comment */
// import Service from 'axios'
// import Service from 'axios'
import {setToken, unsetToken} from '~/utils/auth'
import Cookie from 'js-cookie'

export const state = () => ({
  user: null,
  token: null
})

export const mutations = {
  SET_ORG_ID (state, id) {
    state.orgId = id
  },
  SET_USER (state, user) {
    // state.token = user[''] || null
    state.user = user || null
  },
  SET_TOKEN (state, token) {
    state.token = token || null
  }
}

export const getters = {
  orgId (state) {
    return state.org.id
  },
  isAuthenticated (state) {
    return Boolean(state.user)
  },
  loggedUser (state) {
    return state.user
  }
}
// const __id = ''
let baseURL = ''
let orgAPI = ''
let count = 1
export const actions = {
  async nuxtServerInit (store, {app, env, params, route, isServer, req}) {
    count++
    console.log(count)
    // console.log('server init')
    // console.log(req.session)
    const orgId = req.session.orgId
    if (!orgId) {
      return
    }
    store.strict = false
    baseURL = env.baseURL
    // store.commit('SET_ORG_ID', {id: })
    store.commit('org/CONFIG', {id: orgId, baseURL: baseURL})
    // store.commit('org/CONFIG', {id: orgId.split('=')[1], baseURL: baseURL})
    orgAPI = store.state.org.api
    // if (req.headers.cookie) {
    //
    //   const orgId = req.headers.cookie.split(';').find(c => c.trim().startsWith('__org_id'))
    //   if (!orgId) {
    //     return
    //   }
    //   store.strict = false
    //   baseURL = env.baseURL
    //   store.commit('org/CONFIG', {id: orgId.split('=')[1], baseURL: baseURL})
    //   orgAPI = store.state.org.api
      // const ip = await app.$axios.$get('http://icanhazip.com')
      // commit('SET_IP', ip)
    // }
    // store.dispatch('loadOrgInfo', {axios: app.$axios})
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
  // async
  async loadOrgInfo ({commit}) {
    // console.log('load org info ...')
    commit('org/REQUEST_ORG_INFO')
    // const orgUrl = 'http://api.picker.la/rest/orgs/1'
    // console.log('load org')
    // $store.state.option.mobileLayout
    await this.$axios.get(this.getters.orgId + '/info')
      .then(response => {
        // console.log(JSON.stringify(response.data))
        const success = Boolean(response.status) && response.data && Object.is(response.data.errno, 0)
        if (success) {
          // console.log(JSON.stringify(response.data))
          commit('org/REQUEST_ORG_INFO_SUCCESS', response.data)
        }
        if (!success) {
          commit('org/REQUEST_ORG_INFO_FAILURE')
        }
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
  async loadPodcastDetail ({commit}, {axios, params}) {
    commit('podcast/REQUEST_DETAIL')
    // console.log(JSON.stringify(params) + '===')
    // console.log(params)
    await axios.get(`${orgAPI}/podcast/${params.id}`)
      .then(response => {
        const success = Boolean(response.status) && response.data && Object.is(response.data.errno, 0)
        if (success) {
          commit('podcast/GET_DETAIL_SUCCESS', response.data)
        }
        if (!success) {
          commit('podcast/GET_DETAIL_FAILURE')
        }
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
    await axios.get(orgAPI + '/posts', {params})
      .then(response => {
        const success = Boolean(response.status) && response.data && Object.is(response.data.errno, 0)
        const isFirstPage = params.page && params.page > 1
        const commitName = `article/${isFirstPage ? 'ADD' : 'GET'}_LIST_SUCCESS`
        if (success) {
          commit(commitName, response.data)
        }
        if (!success) {
          commit('article/GET_LIST_FAILURE')
        }
      })
      .catch(err => {
        console.log(err)
        commit('article/GET_LIST_FAILURE', err)
      })
  },
  // 获取全局配置
  loadGlobalOption ({commit}) {
    commit('options/REQUEST_GLOBAL_OPTIONS')
    return $axios.get(orgAPI + '/options')
      .then(response => {
        const success = Boolean(response.status) && response.data && Object.is(response.data.errno, 0)
        if (success) {
          commit('options/REQUEST_GLOBAL_OPTIONS_SUCCESS', response.data)
        }
        if (!success) {
          commit('options/REQUEST_GLOBAL_OPTIONS_FAILURE')
        }
      }, err => {
        commit('options/REQUEST_GLOBAL_OPTIONS_FAILURE', err)
      })
  },
  async login ({commit}, {form}) {
    // console.log(this.getters.orgId + 'xxx---')
    // console.log(orgId + '-----')
    try {
      const {data} = await this.$axios.post(this.getters.orgId + '/signin', form)
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
  },
  async loadEpisodeList ({commit}, {axios, params}) {
    console.log('load episode')
    commit('podcast/REQUEST_EPISODE_LIST')
    await axios.get(orgAPI + '/posts', {params})
      .then(response => {
        const success = Boolean(response.status) && response.data && Object.is(response.data.errno, 0)
        const isFirstPage = params.page && params.page > 1
        const commitName = `podcast/${isFirstPage ? 'ADD' : 'GET'}_EPISODE_LIST_SUCCESS`
        if (success) {
          commit(commitName, response.data)
        }
        if (!success) {
          commit('podcast/GET_EPISODE_LIST_FAILURE')
        }
      })
      .catch(err => {
        console.log(err)
        commit('podcast/GET_EPISODE_LIST_FAILURE', err)
      })
  },
  // 节目创建
  async episodeCreate ({commit}, {data, axios}) {
    commit('podcast/CREATE_EPISODE')
    await axios.post(orgAPI + '/posts', data)
      .then(response => {
        const success = Boolean(response.status) && response.data && Object.is(response.data.errno, 0)
        if (success) {
          commit('podcast/CREATE_EPISODE_SUCCESS', response.data)
        }
        if (!success) {
          commit('podcast/CREATE_EPISODE_FAILURE')
        }
      }, err => {
        commit('podcast/CREATE_EPISODE_FAILURE', err)
      })
  },
  async episodeDelete ({commit}, {id, axios}) {
    commit('podcast/DELETE_EPISODE')
    await axios.delete(orgAPI + '/posts/' + id)
      .then(response => {
        const success = Boolean(response.status) && response.data && Object.is(response.data.errno, 0)
        if (success) {
          commit('podcast/DELETE_EPISODE_SUCCESS')
        }
        if (!success) {
          commit('posts/DELETE_EPISODE_FAILURE')
        }
      })
  },
  async saveEpisode ({commit}, {data, axios}) {
    // commit('podcast/U')
  },
  // POSTS
  async postsCreate ({commit}, {data}) {
    commit('posts/CREATE')
    await this.$axios.post(orgAPI + '/posts', data)
      .then(response => {
        const success = Boolean(response.status) && response.data && Object.is(response.data.errno, 0)
        if (success) {
          commit('posts/CREATE_SUCCESS', response.data)
        }
        if (!success) {
          commit('posts/CREATE_FAILURE')
        }
      }, err => {
        commit('posts/CREATE_FAILURE', err)
      })
  },
  async postsDelete ({commit}, {id}) {
    commit('posts/DELETE')
    await this.$axios.delete(orgAPI + '/posts/' + id)
      .then(response => {
        const success = Boolean(response.status) && response.data && !Object.is(response.data.errno, 0)
        if (success) {
          commit('posts/DELETE_SUCCESS')
        }
        if (!success) {
          commit('posts/DELETE_FAILURE')
        }
      })
  },
  async loadPosts ({commit}, params = {type: 'podcast', page: 1}) {
    commit('posts/REQUEST_LIST')
    let data = (await this.$axios.get(this.getters.orgId + '/posts', {params})).data
    if (data && data.errno === 0) {
      const isFirstPage = params.page && params.page > 1
      const commitName = `posts/${isFirstPage ? 'ADD' : 'GET'}_LIST_SUCCESS`
      commit(commitName, data)

    } else {
      commit('posts/GET_LIST_FAILURE')
    }
  }

}

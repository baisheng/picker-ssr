/* eslint-disable no-undef,indent,spaced-comment,radix */
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
  SET_USER_AVATAR (state, avatar) {
    state.user.avatar = avatar
  },
  SET_TOKEN (state, token) {
    state.token = token || null
  }
}

export const getters = {
  orgId (state) {
    return state.org.detail.data.id
  },
  appId (state) {
    return state.org.currentApp.id
  },
  isAuthenticated (state) {
    return Boolean(state.user)
  },
  loggedUser (state) {
    return state.user
  }
}
export const actions = {
  async nuxtServerInit (store, {app, env, params, route, isServer, req}) {
    const org = req.session.org
    if (!org) {
      return
    }
    // console.log('nuxt server init ...')

    store.strict = false
    if (req.session.currentApp) {
      await store.commit('org/SET_CURRENT_APP', req.session.currentApp)
    }
    await store.commit('org/SET_ORG_DETAIL', org)
    // await store.commit('org/CONFIG', {id: orgId})
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
    commit('org/REQUEST_ORG_INFO')
    const data = (await this.$axios.get(`/org/${this.getters.orgId}/info`)).data
    if (data && data.errno === 0) {
      commit('org/REQUEST_ORG_INFO_SUCCESS', data)
    } else {
      commit('org/REQUEST_ORG_INFO_FAILURE')
    }
  },
  // 获取机构的应用列表
  async loadOrgApps ({commit}) {
    commit('org/REQUEST_ORG_APPS')
    const data = (await this.$axios.get(`/org/${this.getters.orgId}/apps`)).data
    if (data && data.errno === 0) {
      commit('org/REQUEST_ORG_APPS_SUCCESS', data)
    } else {
      commit('org/REQUEST_ORG_APPS_FAILURE')
    }
  },
  // 获取标签列表
  loadTagList ({commit}) {
  },
  // 获取分类列表
  loadCategories ({commit}) {
  },
  async loadPodcastDetail ({commit}, {axios, params}) {
    commit('podcast/REQUEST_DETAIL')

    await axios.get(`/app/${this.getters.appId}/podcast/${params.id}`)
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
    await axios.get(`/app/${this.getters.appId}/posts`, {params})
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
    return this.$axios.get(`/org/${this.getters.orgId}/options`)
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
      const {data} = await this.$axios.post(`/org/${this.getters.orgId}/signin`, form)
      if (data.errno > 0) {
        // 发送出错误状态
        console.error(data.errmsg)
        return
      }
      setToken(data.data.token)
      commit('SET_TOKEN', data.data.token.value)
      commit('SET_USER', data.data.user)
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
  // async updatePodcastAuthor ({commit}, form) {
  // const form = {
  //   author: author.id
  // }
  // const {data} = await this.$axios.put(`/app/${this.getters.appId}/posts/${form.id}`, form)
  // await actions.updatePodcast({commit}, form)
  // commit('podcast/SET_AUTHOR', form.authorInfo)
  // },
  /// App Podcast
  async getPodcast ({commit}, id) {
    commit('podcast/REQUEST_DETAIL')
    const data = (await this.$axios.get(`/app/${this.getters.appId}/podcast/${id}`)).data
    // console.log(JSON.stringify(data))
    if (data && data.errno === 0) {
      commit('podcast/GET_DETAIL_SUCCESS', data)
    } else {
      commit('podcast/GET_DETAIL_FAILURE')
    }
    return data
  },
  async updatePodcast ({commit}, form) {
    commit('podcast/UPDATE_DETAIL')
    const {data} = await this.$axios.put(`/app/${this.getters.appId}/posts/${form.id}`, form)
    if (data.errno > 0) {
      commit('podcast/UPDATE_DETAIL_FAILURE')
    } else {
      commit('podcast/UPDATE_DETAIL_SUCCESS', form)
    }
    return data
  },
  // POSTS
  async createPodcast ({commit}, form) {
    commit('podcast/CREATE')
    const {data} = await this.$axios.post(`/app/${this.getters.appId}/posts`, form)
    if (data.errno > 0) {
      commit('podcast/CREATE_FAILURE')
    } else {
      // console.log(JSON.stringify(data.data))
      const podcast = Object.assign(form, {id: data.data})
      // form.id = data.data
      commit('podcast/CREATE_SUCCESS', podcast)
    }
    return data
  },
  async loadEpisodeList ({commit}, params) {
    commit('podcast/REQUEST_EPISODE_LIST')
    const {data} = await this.$axios.get(`/app/${this.getters.appId}/podcast`, {params})
    if (data.errno > 0) {
      commit('podcast/GET_EPISODE_LIST_FAILURE')
    } else {
      const isFirstPage = params.page && params.page > 1
      const commitName = `podcast/${isFirstPage ? 'ADD' : 'GET'}_EPISODE_LIST_SUCCESS`
      commit(commitName, data)
    }
    // console.log(JSON.stringify(data))
    // return data
  },
  // 节目创建
  async episodeCreate ({commit}, form) {
    commit('podcast/CREATE_EPISODE')
    const {data} = await this.$axios.post(`/app/${this.getters.appId}/posts`, form)
    // console.log('create')
    // console.log(JSON.stringify(data))
    if (data.errno === 0) {
      form = Object.assign({id: data.data}, form)
      commit('podcast/CREATE_EPISODE_SUCCESS', form)
    } else {
      commit('podcast/CREATE_EPISODE_FAILURE')
    }
    // 返回添加的内容 id
    return data.data
    // const {data} = await this.$axios.put(`/app/${this.getters.appId}/users`, )
    // await this.$axios.post(`/app/${this.getters.appId}/posts`, data)
    //   .then(response => {
    //     const success = Boolean(response.status) && response.data && Object.is(response.data.errno, 0)
    //     if (success) {
    //       commit('podcast/CREATE_EPISODE_SUCCESS', response.data)
    //     }
    //     if (!success) {
    //       commit('podcast/CREATE_EPISODE_FAILURE')
    //     }
    //   }, err => {
    //     commit('podcast/CREATE_EPISODE_FAILURE', err)
    //   })
  },
  async episodeDelete ({commit}, {id, axios}) {
    commit('podcast/DELETE_EPISODE')
    await axios.delete(`/app/${this.getters.appId}/posts/${id}`)
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
    await this.$axios.post(`/app/${this.getters.appId}/posts`, {data})
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
    await this.$axios.delete(`/app/${this.getters.appId}/posts/${id}`)
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
    params.type = 'podcast'
    if (!params.page) {
      params.page = 1
    }
    commit('posts/REQUEST_LIST')
    const data = (await this.$axios.get(`/app/${this.getters.appId}/posts`, {params})).data
    if (data && data.errno === 0) {
      const isFirstPage = params.page && params.page > 1
      const commitName = `posts/${isFirstPage ? 'ADD' : 'GET'}_LIST_SUCCESS`
      commit(commitName, data)

    } else {
      commit('posts/GET_LIST_FAILURE')
    }
  },
  async addUser ({commit}, {form}) {
    commit('users/CREATE')
    try {
      const {data} = await this.$axios.post(`/app/${this.getters.appId}/users`, form)
      if (data.errno > 0) {
        // 发送出错误状态
        commit('users/CREATE_FAILURE')
        return
      } else if (data.data.type === 'exist') {
        commit('users/CREATE_FAILURE_EXIST')
      } else {
        commit('users/CREATE_SUCCESS', data)
      }
      // setToken(data.data.token)
      // commit('SET_TOKEN', data.data.token)
      // commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async updateUser ({commit}, {form}) {
    console.log(JSON.stringify(form))
    commit('users/UPDATE_DETAIL')
    const {data} = await this.$axios.put(`/app/${this.getters.appId}/users`, form)
    if (data.errno > 0) {
      // console.log('update failure')
      // commit('users/UPDATE_FAILURE')
    } else {
      // commit('users/UPDATE_DETAIL', form)
      // commit('users/UPDATE_SUCCESS')
    }
    return data
  },

  async updatePassword ({commit}, {form}) {

  },
  async loadUsers ({commit}, params = {page: 1}) {
    const {data} = await this.$axios.get(`/app/${this.getters.appId}/users`, {params})
    // console.warn(data)
    if (data && data.errno === 0) {
      const isFirstPage = params.page && params.page > 1
      // console.log('load data .....')
      const commitName = `users/${isFirstPage ? 'ADD' : 'GET'}_LIST_SUCCESS`
      commit(commitName, data)
    } else {
      commit('users/GET_LIST_FAILURE')
    }
  },
  async getUser ({commit}, id) {
    commit('users/REQUEST_DETAIL')
    const data = (await this.$axios.get(`/app/${this.getters.appId}/users/${id}`)).data
    if (data && data.errno === 0) {
      commit('users/GET_DETAIL_SUCCESS', data)
    } else {
      commit('users/GET_DETAIL_FAILURE')
    }
  },
  async getPodcastsByTerm ({commit}, termId) {
    const data = (await this.$axios.get(`/app/${this.getters.appId}/podcasts/`, {params: {term: termId}})).data
    return data
  },
  async getTermsByTaxonomy ({commit}, params = {type: 'category'}) {
    const data = (await this.$axios.get(`/app/${this.getters.appId}/taxonomy/`, {params})).data
    console.log(JSON.stringify(data))
    return data
  }
}

import axios from 'axios'
import {setToken, unsetToken} from '~/utils/auth'

export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
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

const baseUrl = 'http://picker.la'
export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  // nuxtServerInit ({ commit }, { req }) {
  //   if (req.session && req.session.authUser) {
  //     commit('SET_USER', req.session.authUser)
  //   }
  // },
  async login ({ commit }, { user_login, user_pass }) {
    try {
      const { data } = await axios.post(baseUrl + '/api/signin', { user_login, user_pass })
      setToken(data.data.token)
      // console.log(JSON.stringify(data))
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    // await axios.post('/api/logout')
    unsetToken()
    commit('SET_USER', null)
  }

}

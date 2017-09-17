// const apiConfig = require('~~/api.config.js')
// console.log(apiConfig.baseURL + '----')
// import apiConfig from '../api.config'

/*
*
* 全局设置数据状态
*
*/
export const state = () => {
  return {
    id: '',
    api: '',
    // 机构信息
    orgInfo: {
      fetching: false,
      data: {}
    }
  }
}

export const mutations = {
  CONFIG (state, action) {
    state.id = action.id
    // state.api = action.baseURL + '/rest/orgs/' + action.id
  },
  SET_ID (state, action) {
    state._id = action.id
  },
  // 获取服务端配置的管理员信息
  REQUEST_ORG_INFO (state) {
    state.orgInfo.fetching = true
  },
  REQUEST_ORG_INFO_SUCCESS (state, action) {
    state.orgInfo.fetching = false
    state.orgInfo.data = action.data
  },
  REQUEST_ORG_INFO_FAILURE (state) {
    state.orgInfo.fetching = false
    state.orgInfo.data = {}
  }
}

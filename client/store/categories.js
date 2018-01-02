export const state = () => {
  return {
    id: '',
    api: '',
    detail: {
      fetching: false,
      data: {}
    },
    currentApp: null,
    // 机构信息
    orgInfo: {
      fetching: false,
      data: {}
    },
    data: {
      fetching: false,
      list: []
    }
  }
}

export const mutations = {
  SET_ORG_DETAIL (state, action) {
    state.detail.data = action
  },
  SET_CURRENT_APP (state, action) {
    state.currentApp = action
  },
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
  },

  NEW_CATEGORY_SUCCESS (state, action) {
    // console.log(JSON.stringify(action))
    state.data.list.unshift(action)
    // state.data.list.push(action)
    // state.data.list = state.data.list.concat(action.data)
  },
  // 获取机构的应用列表
  REQUEST_CATEGORIES (state) {
    state.data.fetching = true
  },
  REQUEST_CATEGORIES_SUCCESS (state, action) {
    // state.categories = Object.assign({fetching: false}, action)
    state.data.fetching = false
    state.data.list = action.data.categories
  },
  REQUEST_CATEGORIES_FAILURE (state) {
    state.categories.fetching = false
    state.categories.data = []
  },

  UPDATE_CATEGORY_SUCCESS (state, action) {
    state.detail.status = 'success'
    for (let item of state.data.list) {
      if (item.term_id === action.term_id) {
        item = Object.assign(item, action)
      }
    }
  },
  UPDATE_CATEGORY_FAILURE (state) {
    state.detail.status = 'error'
  }
}

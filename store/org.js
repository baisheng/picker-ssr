/*
*
* 全局设置数据状态
*
*/

export const state = () => {
  return {
    // 机构信息
    orgInfo: {
      fetching: false,
      data: {}
    }
  }
}

export const mutations = {
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

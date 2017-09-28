/* eslint-disable prefer-reflect,prefer-spread */
/*
*
* 文章数据状态
*
*/
export const state = () => {
  return {
    creating: false,
    saving: false,
    detail: {
      type: '',
      status: '',
      del: '',
      fetching: false,
      creating: false,
      saving: false,
      deleting: false,
      data: {
        id: 0
      }
    },
    list: {
      fetching: false,
      data: {
        'count': 0,
        'totalPages': 0,
        'pagesize': 10,
        'currentPage': 1,
        'data': []
      }
    }
  }
}

export const mutations = {
  SET_POST (state, detail) {
    state.detail = detail
  },
  DELETE (state) {
    state.detail.del = 'start'
  },
  DELETE_SUCCESS (state) {
    state.detail.del = 'success'
  },
  DELETE_FAILURE (state) {
    state.detail.del = 'error'
  },
  CREATE (state) {
    state.detail.creating = true
  },
  CREATE_SUCCESS (state, action) {
    // state.detail.creating = true
    state.detail.data.id = action.data
    // Object.assign(state.detail, detail);
  },
  CREATE_FAILURE (state) {
    state.detail.creating = false
  },
  CREATE_FAILURE_EXIST (state) {
    state.detail.creating = false
    state.detail.data.type = 'exist'
  },
  CREATE_CANCEL (state) {
    state.detail.creating = false
  },
  UPDATE_ITEM (state) {
    // console.log('saving.. item')
    state.saving = true
  },
  UPDATE_ITEM_SUCCESS (state) {
    // console.log('saving.. success')
    state.item.saving = false
  },
  // List
  CLEAR_LIST (state) {
    state.list.data = {
      result: {
        pagination: {
          current_page: 0
        },
        data: []
      }
    }
  },
  UPLOAD_FEATURED_IMAGE (state) {
  },
  REQUEST_LIST (state) {
    // console.log('request Posts list')
    state.list.fetching = true
  },
  GET_LIST_FAILURE (state) {
    // console.log('get article listfailure ')
    state.list.fetching = false
  },
  GET_LIST_SUCCESS (state, action) {
    // console.log('Get Posts list success ')
    state.list.fetching = false
    state.list.data = action.data
    // console.log(action.data)
  },
  ADD_LIST_SUCCESS (state, action) {
    state.list.fetching = false
    state.list.data.data.push.apply(state.list.data.data, action.result.data)
    state.list.data.pagination = action.result.pagination
  },

  // Hot
  REQUEST_HOT_LIST (state) {
    state.hot.fetching = true
  },
  GET_HOT_LIST_FAILURE (state) {
    state.hot.fetching = false
  },
  GET_HOT_LIST_SUCCESS (state, action) {
    state.hot.fetching = false
    state.hot.data = action.result
  },

  // 喜欢某篇文章
  LIKE_ARTICLE (state, action) {
    const article = state.detail.data
    if (Object.is(article.id, action.id)) {
      state.detail.data.meta.likes++
    }
  }
}

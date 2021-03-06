/* eslint-disable prefer-reflect,prefer-spread,func-style */
/*
*
* 文章数据状态
*
*/

// import {filter, find} from "lodash";

export const state = () => {
  return {
    saving: false,
    episode: {
      status: '',
      del: '',
      creating: false,
      saving: false,
      deleting: false,
      id: 0,
      data: {
        id: 0
      }
    },
    episodeList: {
      fetching: false,
      status: 'all',
      data: {}
    },
    hot: {
      fetching: false,
      data: { data: [] }
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
    },
    detail: {
      status: 'init',
      fetching: false,
      data: {
        author: {}
      }
    }
  }
}

export const mutations = {
  INIT (state) {
    state.detail = {
      status: 'init',
      fetching: false,
      data: {
        authorInfo: {}
      }
    }
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
    state.detail.data.id = action.id
    state.detail.data = action
    // Object.assign(state.user, user);
  },
  CREATE_FAILURE (state) {
    state.detail.creating = false
  },
  CREATE_CANCEL (state) {
    state.detail.creating = false
  },
  // 设置作者信息
  SET_AUTHOR (state, data) {
    state.detail.data.authorInfo = data
  },
  // 更新 podcast 关联的 item 的状态
  CHANGE_EPISODE_STATUS (state, {episode, status}) {
    for (const item of state.detail.data.items) {
      if (item.id === episode.id.toString() || item.id === episode.id) {
        item.status = status
      }
    }
  },
  // changeCommentStatus
  PUSH_EPISODE (state, data) {
    if (Object.is(state.detail.data.children, undefined)) {
      state.detail.data.children = []
    }
    state.detail.data.children.push(data)
    // state.detail.data.children.push(data)
    // state.detail.data.children.push.apply(state.detail.data.children, data)
  },
  SET_EPISODE_LIST (state, list) {
    state.detail.data.children = list
  },
  DELETE_EPISODE (state) {
    state.episode.del = 'start'
  },
  DELETE_EPISODE_SUCCESS (state, data) {
    state.detail.data.items = data
    state.episode.del = 'success'
  },
  DELETE_EPISODE_FAILURE (state) {
    state.episode.del = 'error'
  },
  CREATE_EPISODE (state) {
    state.episode.creating = true
  },
  UPDATE_PODCAST_ITEMS (state, data) {
    state.detail.data.items = data
  },
  CREATE_EPISODE_SUCCESS (state, data) {
    // state.episode.creating = true
    state.episode.id = data.id
    state.detail.data.items.unshift({id: data.id, status: 'unapproved'})
    // state.detail.data.children.push(data)
    // Object.assign(state.user, user);
  },
  CREATE_EPISODE_FAILURE (state) {
    state.episode.creating = false
  },
  CREATE_EPISODE_CANCEL (state) {
    state.episode.creating = false
  },
  FILTER_EPISODES (state, action)  {
    state.episodeList.status = action
  },
  REQUEST_EPISODE_LIST (state) {
    state.episodeList.fetching = true
  },
  GET_EPISODELIST_FAILURE (state) {
    state.episodeList.fetching = false
  },
  UPDATE_EPISODE_LIST(state, list) {
    state.episodeList.data.data = list
  },
  GET_EPISODE_LIST_SUCCESS (state, action) {
    state.episodeList.fetching = false
    state.episodeList.data = action
  },
  UPDATE_EPISODE (state) {
    // state.detail.data = Object.assign({}, action.data)
    // state.detail.data = action.data
    state.episode.saving = true
  },
  UPDATE_EPISODE_SUCCESS (state, action) {
    state.episode.saving = false
    state.episode = action.data
    // state.episode = Object.assign({}, action.data)
  },
  // UPDATE_ITEM (state) {
    // state.saving = true
  // },
  // UPDATE_ITEM_SUCCESS (state) {
  //   state.item.saving = false
  // },
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
  REQUEST_LIST (state) {
    state.list.fetching = true
  },
  GET_LIST_FAILURE (state) {
    state.list.fetching = false
  },
  GET_LIST_SUCCESS (state, action) {
    state.list.fetching = false
    state.list.data = action.data
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

  // Detail
  CLEAR_DETAIL (state) {
    state.detail.data = {}
  },
  UPDATE_DETAIL (state) {
    state.detail.status = 'saving'
    // state.detail.data = Object.assign({}, action.data)
    // state.detail.data = action.data
  },
  UPDATE_DETAIL_FAILURE (state, action) {
    state.detail.status = 'error'
    // state.detail.data = Object.assign({}, action.data)
    // state.detail.data = action.data
  },
  UPDATE_DETAIL_SUCCESS (state, action) {
    state.detail.status = 'success'
    state.detail.data = action
    // console.log(JSON.stringify(action))
    // state.detail.data = Object.assign(state.detail.data, action)
    // console.log(JSON.stringify(action) + 'x--x-x')
    // state.detail.data = action.data
  },
  REQUEST_DETAIL (state) {
    state.detail.fetching = true
  },
  GET_DETAIL_FAILURE (state) {
    state.detail.fetching = false
    state.detail.data = {}
  },
  GET_DETAIL_SUCCESS (state, action) {
    state.detail.fetching = false
    state.detail.data = action.data
  },

  // 喜欢某篇文章
  LIKE_ARTICLE (state, action) {
    const article = state.detail.data
    if (Object.is(article.id, action.id)) {
      state.detail.data.meta.likes++
    }
  }
}

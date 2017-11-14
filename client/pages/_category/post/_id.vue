<template>
  <main class="main">
    <!-- Navbar -->
    <header-cake compact backHref="/podcasts" :title="title"></header-cake>
    <!-- Header -->
    <podcast-header :podcast.sync="detail"></podcast-header>
    <!-- Content-from -->
    <podcast-content-form :podcast="detail" :users="users.data" :termSlug="category" :terms="categories" @save="save"></podcast-content-form>
    <!-- Episode-list -->
    <episode-list :parent="detail" :episodeList="episodeList" v-if="detail.id"
                  @load="loadEpisodeList"></episode-list>
  </main>
</template>

<script>
  /* eslint-disable quotes,indent,no-undef,no-multi-spaces,no-implicit-coercion */
  import HeaderCake from '~/components/header-cake'
  import PodcastHeader from '~/components/podcast/header'
  import PodcastContentForm from '~/components/podcast/podcast-content-form'
  import EpisodeList from '~/components/episodes/episode-list'
  import {debounce} from 'lodash'

  export default {
    middleware: 'authenticated',
    layout: 'podcast',
    async fetch ({store, params}) {
      await store.dispatch('loadCategories')
    },
    async asyncData ({app, params}) {
      console.log(JSON.stringify(params))
      await app.store.dispatch('loadUsers')
//      const terms = await app.store.dispatch('getTermsByTaxonomy')
      if (params.id && !Object.is(Number(params.id), NaN)) {
        // 获取 post 内容
        await app.store.dispatch('getPodcast', params.id)

        const query = {
          type: 'post_format',
          parent: params.id,
          page: 1
        }
        const data = (await app.$axios.$get(`/apps/${app.store.getters.appId}/posts`, {params: query})).data
        return {
          episodeList: data.data
        }
      } else {
        await app.store.commit('podcast/INIT')
        return {
          episodeList: [],
          category: params.category
        }
      }
    },
    data () {
      return {
        status: 'default',
        curItem: null,
        headers: {
          'Authorization': 'Bearer ' + this.token
        },
        category: 'youdao',
        terms: [{}],
        episodeList: [],
        podcast: {
          author: '',
          title: '',
          content: '',
          children: []
        },
        post: {
          title: '无标题',
          content: ''
        }
      }
    },
    // 获取 ID的 问题
//    validate ({params}) {
//      return !!params.id && !Object.is(Number(params.id), NaN)
//    },
//    async asyncData ({app, params}) {
//      if (!Object.is(params.id, undefined)) {
//        const baseUrl = 'http://api.picker.la/rest/orgs/1'
//        const data = (await app.$axios.get(`${this.orgId}/posts/${params.id}`)).data
//        console.log(JSON.stringify(data))
//        return {
//          podcast: data.data
//        }
//      }
//    },
    props: {},
    components: {
      HeaderCake,
      PodcastHeader,
      PodcastContentForm,
      EpisodeList
    },
    computed: {
      categories () {
        return this.$store.state.categories.data.list
      },
      title () {
        return this.detail.title ? `修改 - 【${this.detail.title}】` : '创建新节目'
      },
      user () {
        return this.$store.state.user
      },
      users () {
        return this.$store.state.users.list.data
      },
      detail () {
        return this.$store.state.podcast.detail.data
      },
      appId () {
        return this.$store.getters.appId
      },
      orgId () {
        return this.$store.getters.orgId
      },
      token () {
        return this.$store.state.token
      }
    },
    mounted () {
    },
    methods: {
      async loadEpisodeList (params) {
        if (!params.page) {
          params.type = 'podcast'
          params.page = 1
        }
        const data = (await this.$axios.$get(`/apps/${this.appId}/posts/new`, {params})).data
        this.episodeList = data.data
//        if (data !== null) {
//          this.episodeList = data
//        } else {
//          this.episodeList = []
//        }
      },
      async save (data, id) {
        this.status = 'saving'
        if (Object.is(this.detail.id, undefined)) {
//        this.post.autoExcerpt = this.autoExcerpt
          const res = await this.$store.dispatch('createPodcast', data)
          if (res.errno === 0) {
            history.pushState({state: 1}, 'Auto Save State', `/${this.category}/post/${res.data.id}`)
          }
        } else {
          if (data) {
            await this.update(data, this.detail.id)
          }
        }
      },
      async update (data, id) {
        if (id !== undefined) {
          data.id = id
        }
        await this.$store.dispatch('updatePodcast', data)
      }
    }
  }
</script>


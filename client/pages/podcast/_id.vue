<template>
  <main class="connected-applications main">

    <!-- Navbar -->
    <header-cake compact backHref="/podcasts" :title="title"></header-cake>
    <!-- Header -->
    <podcast-header :podcast.sync="detail"></podcast-header>
    <!-- Content-from -->
    <podcast-content-form :podcast.sync="detail" :users="users.data" @save="save"></podcast-content-form>
    <!-- Episode-list -->
    <episode-list :parent="detail" :episodeList="episodeList"  v-if="detail.id"
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
//    async fetch ({store, params}) {
//      if (params.id && !Object.is(Number(params.id), NaN)) {
//        await store.dispatch('getPodcast', params.id)
//        await store.dispatch('loadEpisodeList', {parent: params.id, page: 1})
//      }
//      await store.dispatch('loadUsers')
//    },
    async asyncData ({app, params}) {
      await app.store.dispatch('loadUsers')
      if (params.id && !Object.is(Number(params.id), NaN)) {
        await app.store.dispatch('getPodcast', params.id)
        const query = {
          parent: params.id,
          page: 1
        }
        const data = (await app.$axios.$get(`/app/${app.store.getters.appId}/podcast`, {params: query})).data
        return {
          episodeList: data
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
//    mounted() {
//      this.podcast = this.detail
//      console.log(this.detail)
//    },
    watch: {
//      'podcast': {
//        handler: (val, oldVal) => {
//          this.save()
//        },
//       深度观察
//        deep: true
//      }
    },
    mounted () {
//      this.$nextTick(async () => {
//        await this.loadEpisodeList(this.detail.id, 1)
//      })
    },
    computed: {
//      episodeList () {
//        return this.$store.state.podcast.episodeList.data
//      },
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
//      episodes () {
//        if (!Object.is(this.podcast.children, undefined)) {
//          return this.podcast.children
//        } else {
//          return []
//        }
//      },
      token () {
        return this.$store.state.token
//        config.headers.common['Authorization'] = 'Bearer ' + store.state.token
//        return
      }
    },
    methods: {
      async loadEpisodeList (params) {
//        if (!params.parent) {
//          params.parent = this.detail.id
//        }
        if (!params.page) {
          params.page = 1
        }
//        const query = {
//          parent: params.id,
//          page: 1
//        }
        const data = (await this.$axios.$get(`/app/${this.appId}/podcast`, {params})).data
        this.episodeList = data
      },
      async save (data, id) {
        this.status = 'saving'
        if (Object.is(this.detail.id, undefined)) {
//        this.post.autoExcerpt = this.autoExcerpt
          const res = await this.$store.dispatch('createPodcast', data)
          if (res.errno === 0) {
            history.pushState({state: 1}, 'Auto Save State', '/podcast/' + res.data + '')
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


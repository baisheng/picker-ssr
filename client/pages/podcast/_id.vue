<template>
  <main data-reactroot="" class="connected-applications main" role="main">

    <!-- Navbar -->
    <header-cake compact backHref="/podcasts">
      <span v-if="podcast.id">更新内容</span>
      <span v-else>添加内容</span>
    </header-cake>
    <!-- Header -->
    <podcast-header :podcast="podcast" @featured_image_upload="save" @change_status="save"></podcast-header>
    <!-- Content-from -->
    <podcast-content-form :podcast="podcast" :users="users.data" @content_update="save" :status="podcastStatus"></podcast-content-form>
    <!-- Episode-list -->
    <episode-list :podcast="podcast" @podcast_item_update="update"></episode-list>
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
      console.log('lalalal ...')
      console.log(JSON.stringify(params))
      if (params.id && !Object.is(Number(params.id), NaN)) {
        console.log(JSON.stringify(params))
        await store.dispatch('getPodcast', params.id)
      }
      await store.dispatch('loadUsers')
    },
    data () {
      return {
        status: 'default',
        curItem: null,
        headers: {
          'Authorization': 'Bearer ' + this.token
        },
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
    computed: {
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
      },
      podcastStatus () {
        return this.$store.state.podcast.detail.status
      },
      detailData: {
        get () {
// eslint-disable-next-line indent
//          return this.$store.state.podcast.detail.data
        },
        set (value) {
//          this.$store.commit('podcast/UPDATE_DETAIL', value)
        }
      }
    },
    mounted () {
//      this.$on('featured_image_upload', (data) => {
//        this.update(data)
//      })
      // 初始化
//      this.podcast = this.detail

      this.$nextTick(() => {
        if (JSON.stringify(this.detail.data) !== '{}') {
          this.podcast = Object.assign(this.podcast, this.detail)
        }
      })
      this.$watch('podcast.title', () => {
        this.save()
      })
      this.$watch('podcast.content', () => {
        this.save()
      })
//      this.$watch('podcast.author', () => {
//        this.save()
//      })
    },
    methods: {
      async save (data, id) {
        console.log(JSON.stringify(data) + '--data--')
        this.status = 'saving'
//        if (!this.post.id && this.post.content === null) return
        if (Object.is(this.podcast.id, undefined)) {
//        this.post.autoExcerpt = this.autoExcerpt
//          const baseUrl = 'http://api.picker.la/rest/orgs/1'
          await this.$axios.post(`/app/${this.appId}/posts`, this.podcast)
            .then(response => {
              const postId = response.data.data
              if (!Object.is(postId, null)) {
                this.podcast.id = postId
                // 更新浏览器地址栏
                history.pushState({state: 1}, 'Auto Save State', '/podcast/' + postId + '')
              }
//            const success = !!response.status && response.data && Object.is(response.data.errno, 0)
//            if (success) commit('posts/CREATE_SUCCESS', response.data)
//            if (!success) commit('posts/CREATE_FAILURE')
            }, err => {
//            commit('posts/CREATE_FAILURE', err)
            })
        } else {
          await this.update(this.podcast, this.podcast.id)
        }
      },
      async update (data, id) {
//        let podcastId = this.podcast.id
        if (id !== undefined) {
//          podcastId = id
          data.id = id
        }
        await this.$store.dispatch('updatePodcast', data)
        console.log(JSON.stringify(data))
//        console.log(this.isSaving + 'adfasdfsdaf')

//        console.log(JSON.stringify(data))
//        const that = this
//        await this.$store.dispatch('updatePodcast', data)
//        await this.$axios.put(`/app/${this.appId}/posts/${podcastId}`, data)
//          .then(r => {
//            that.status = 'success'
//            console.log(this.isSaving + 'asdjflkasdjflkjds')
//            console.log('----- success.....')
//            console.log(JSON.stringify(r))
//            this.podcast.saving = false
//            console.log(r.status)
            // 执行 vux store 状态
//            delete data.post_thumbnail
//            that.$emit('update_success')
//            this.$store.commit('podcast/UPDATE_EPISODE_SUCCESS', r)
//          })
//          .catch(e => console.log(e))
      }
    }
  }
</script>


<template>
  <main data-reactroot="" class="connected-applications main" role="main">

    <!-- Navbar -->
    <header-cake compact>
      添加内容
    </header-cake>
    <!-- Header -->
    <podcast-header :podcast="podcast" @featured_image_upload="update"></podcast-header>
    <!-- Content-from -->
    <podcast-content-form :podcast="podcast" @content_update="update"></podcast-content-form>
    <playlist :podcast="podcast" @podcast_item_update="update"></playlist>
  </main>
</template>

<script>
  /* eslint-disable quotes,indent,no-undef,no-multi-spaces */
  //  import EditorSidebar from '~/components/editor/sidebar'
  import HeaderCake from '~/components/header-cake'
  //  import AudioPlayer from '~/components/aplayer'
  import PodcastHeader from '~/components/podcast/header'
  import PodcastContentForm from '~/components/podcast/podcast-content-form'
  import Playlist from '~/components/podcast/playlist'

  export default {
    middleware: 'authenticated',
    data () {
      return {
        curItem: null,
        headers: {
          'Authorization': 'Bearer ' + this.token
        },
        podcast: {
          content: ''
        },
        post: {
          title: '无标题',
          content: ''
        }
      }
    },
    validate ({params}) {
      return (!!params.id && !Object.is(Number(params.id), NaN))
    },
    async asyncData ({app, params}) {
      const baseUrl = 'http://vanq.picker.la/api'
      let data = (await app.$axios.get(`${baseUrl}/podcast/${params.id}`)).data
//      console.log(data)
      return {
        podcast: data.data
      }
    },
    props: {},
    components: {
      HeaderCake,
      PodcastHeader,
      PodcastContentForm,
      Playlist
    },
    watch: {
//      'podcast': {
//        handler: (val, oldVal) => {
//          console.log(val)
//        },
      // 深度观察
//        deep: true
//      }
    },
    computed: {
      token () {
        return this.$store.state.token
//        config.headers.common['Authorization'] = 'Bearer ' + store.state.token
//        return
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
    },
    methods: {
      async update (data, id) {
        let podcastId = this.podcast.id
        if (id !== undefined) {
          podcastId = id
        }
//        let api = 'http://vanq.picker.la/api/podcast'
        await this.$axios.put('http://vanq.picker.la/api/posts/' + podcastId, data)
          .then(r => {
            console.log(r.status)
            // 执行 vux store 状态
//            delete data.post_thumbnail
//            that.$emit('update_success')
            this.$store.commit('posts/UPDATE_ITEM_SUCCESS')
          })
          .catch(e => console.log(e))
      }
    }
  }
</script>


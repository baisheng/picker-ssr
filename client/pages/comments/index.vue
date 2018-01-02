<template>
  <main data-reactroot="" class="comments main is-wide-layout" role="main">
    <comment-list :list="comments.data"></comment-list>
  </main>
</template>
<script>
  import {CommentList} from '~/components/comments'
  // import CommentNavigationTab from '~/components/comments/comment-navigation'
  export default {
    middleware: 'authenticated',
    name: 'comments',
    data () {
      return {
        filter: 'publish',
        collapsed: true
      }
    },
    components: {
      CommentList
    },
    async fetch ({store, params}) {
      await store.dispatch('getComments')
    },
    watch: {
//      '$route' (to, from) {
//        console.log('lalla ...')
      // 获取最新的id 调用获取数据方法
//        this.getData(传入id)
//      }
    },
    mounted () {
//      this.$nextTick()
    },
    computed: {
      isNotEmpty () {
        return true
        // return this.posts.data.length > 0
      },
//      timestamp: function () {
//        return this.$moment(this.posts.attributes.modified).format('YYYY-MM-DD [at] hh:mm')
//      },
      comments () {
        return this.$store.state.comments.list.data
      },
      options () {
        return this.$store.state.options.globalOption.data
      },
      classes () {
        return [
          'post-image',
          {
            'is-collapsed': this.collapsed
          }
        ]
      }
    },
    methods: {
//      async filterStatus (status) {
//        const params = {
//          status: status
//        }
//        console.log(JSON.stringify(params))
//        await this.$store.dispatch('loadPosts', params)
//      },
      handleClick () {
        this.collapsed = !this.collapsed
      }
    }
  }
</script>

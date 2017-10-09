<style>
  .empty-content__title {
    font-size: 34px;
  }
</style>
<template>
  <main data-reactroot="" class="main is-wide-layout" role="main"><!-- react-empty: 695 --><!-- react-empty: 696 -->
    <header class="current-section"><a>
      <svg class="gridicon gridicons-chevron-left" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24">
        <g>
          <path d="M14 20l-8-8 8-8 1.414 1.414L8.828 12l6.586 6.586"></path>
        </g>
      </svg>
      <div class="site-icon is-blank" style="height: 32px; width: 32px; line-height: 32px; font-size: 32px;">
        <svg class="gridicon gridicons-globe" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <g>
            <path
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
          </g>
        </svg>
      </div>
      <div><p class="current-section__site-title"></p>
        <h1 class="current-section__section-title"></h1></div>
    </a></header>
    <podcasts-browser-main-header></podcasts-browser-main-header>
    <span>
      <podcasts-browser-list v-for="term in terms" :key="term.id" :term="term" v-if="terms"></podcasts-browser-list>
    </span>
  </main>
</template>
<script>
  //  import ActionMenu from '../../components/podcast/podcast-action'
  import {PodcastsList, PodcastsBrowserMainHeader, PodcastsBrowserList} from '~/components/podcasts'

  export default {
    middleware: 'authenticated',
    name: 'podcast',
    data () {
      return {
        filter: 'publish',
        collapsed: true
      }
    },
    components: {
      PodcastsBrowserMainHeader,
      PodcastsBrowserList,
      PodcastsList
//      ActionMenu
    },
    async asyncData ({app, store, params}) {
      // Default type `podcast` page `1`
      const terms = (await app.$axios.$get(`/app/${app.store.getters.appId}/taxonomy/category`)).data
      await store.dispatch('loadPosts', params)
      return {
        terms: terms,
        filter: params.status
      }
    },

    computed: {
      user () {
        return this.$store.state.user
      },
      emptyTitle () {
        switch (this.filter) {
          case 'publish': {
            return '没有节目内容'
          }
          case 'drafts': {
            return '没有待审核的内容'
          }
          case 'off': {
            return '没有下架内容'
          }
          case 'trashed': {
            return '没有已放入回收站的内容'
          }
          default: {
            return '还没节目内容'
          }
        }
      },
      publishCount () {
//        for (let i in this.posts) {
//
//        }
      },
      isNotEmpty () {
        return this.posts.data.length > 0
      },
//      timestamp: function () {
//        return this.$moment(this.posts.attributes.modified).format('YYYY-MM-DD [at] hh:mm')
//      },
      posts () {
        return this.$store.state.posts.list
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

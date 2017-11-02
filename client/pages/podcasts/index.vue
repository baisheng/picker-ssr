<style>
  .empty-content__title {
    font-size: 34px;
  }
  /*.v--modal {*/
    /*text-align: center;*/
    /*padding: 50px;*/
  /*}*/
</style>
<template>
  <main class="main is-wide-layout">
    <v-dialog />

    <podcasts-browser-main-header />
    <!--<modal name="foo" :width="300" :height="140">-->
      <!--Woot-->
    <!--</modal>-->
    <!--<button @click="$modal.show('foo')">-->
      <!--Open modal-->
    <!--</button>-->
    <podcasts-browser-list v-for="term in categories" :key="term.id" :term="term" v-if="categories"/>
  </main>
</template>
<script>
  //  import ActionMenu from '../../components/podcast/podcast-action'
  import {PodcastsBrowserMainHeader, PodcastsBrowserList} from '~/components/podcasts'

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
      PodcastsBrowserList
    },
    async fetch ({store, params}) {
      await store.dispatch('loadCategories')
    },
    mounted () {
    },
    computed: {
      categories () {
        return this.$store.state.categories.data.list
      },
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

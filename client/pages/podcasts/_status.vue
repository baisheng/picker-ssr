<style>
  .empty-content__title {
    font-size: 34px;
  }
</style>
<template>
  <main data-reactroot="" class="main is-wide-layout" role="main">
    <podcasts-browser-main-header></podcasts-browser-main-header>
    <podcasts-list :list="list.data"></podcasts-list>
    <!--<span>-->
      <!--<podcasts-browser-list :term="term" :expandedLink="false" :slug="true"></podcasts-browser-list>-->
    <!--</span>-->
  </main>
</template>
<script>
  import {PodcastsList, PodcastsBrowserMainHeader, PodcastsBrowserList} from '~/components/podcasts'

  export default {
    name: 'PodcastStatus',
    layout: 'podcast',
    data () {
      return {
        filter: 'publish',
        collapsed: true
      }
    },
    middleware: 'authenticated',
    components: {
      PodcastsBrowserMainHeader,
      PodcastsBrowserList,
      PodcastsList
    },
    // 获取 ID的 问题
    validate ({params}) {
      return !!params.status
    },
    async asyncData ({app, params}) {
      if (!Object.is(params.status, undefined)) {
        const data = (await app.$axios.$get(`/app/${app.store.getters.appId}/posts?term=category&status=${params.status}`)).data
        return {
          list: data
        }
      }
    }
  }
</script>

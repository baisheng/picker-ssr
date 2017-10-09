<template>
  <div class="podcasts-borwser-list">
    <div class="card section-header is-compact">
      <div class="section-header__label"><span
        class="section-header__label-text">{{term.name}}</span>
      </div>
      <div class="section-header__actions">
        <nuxt-link class="button is-link podcasts-borwser-list__select-all" :to="'/podcasts/term/' + term.slug" v-if="expandedLink">
          查看全部
          <svg class="gridicon gridicons-chevron-right" height="18" width="18"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
              <path
                d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586"></path>
            </g>
          </svg>
        </nuxt-link></div>
    </div>
    <div class="card podcasts-borwser-list__elements">
      <li class="podcasts-borwser-item" v-for="item in list" :key="item.id">
        <nuxt-link :to="'/podcast/' + item.id" class="podcasts-borwser-item__link">
          <div class="podcasts-borwser-item__info">
            <div class="plugin-icon">
              <img class="plugin-icon__img"
                   :src="item.featured_image">
            </div>
            <div class="podcasts-borwser-item__title">{{item.title}}</div>
            <div class="podcasts-borwser-item__author">{{ item.authorInfo.user_nicename }}</div>
          </div>
        </nuxt-link>
      </li>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PodcastsBrowserList',
    props: {
      expandedLink: {
        type: Boolean,
        default: true
      },
      slug: {
        type: Boolean,
        default: false
      },
      term: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        list: []
      }
    },
    mounted () {

      (async () => {
        await this.load()
      })()

    },
    methods: {
      async load () {
        const params = {
          term: !this.slug ? this.term.id : '',
          slug: this.slug ? this.term.slug : ''
        }
        this.list = (await this.$axios.get(`/app/${this.$store.getters.appId}/podcasts/`, {params})).data.data
      }
    }
  }
</script>

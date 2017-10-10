<template>
  <div>

    <foldable-card class="is-compact">
      <div class="connected-application-item__header is-p" slot="header">
        <div class="plugin-icon connected-application-icon animate__appear">
          <img
            class="plugin-icon__img"
            src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=96&d=mm&r=G">
        </div>
        <h3>{{ term.name }}</h3>

      </div>

      <div slot="summary">
        <nuxt-link class="button is-compact" style="margin-right: 8px;" :to="'/podcast' + term.slug">
          <svg class="gridicon gridicons-add-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <g>
              <path
                d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"></path>
            </g>
          </svg>
          添加
        </nuxt-link>
        <nuxt-link class="button is-compact is-action" :to="'/podcasts/term/' + term.slug"
                   v-if="expandedLink && isNotEmpty">
          查看全部
        </nuxt-link>
      </div>

      <div slot="expandedSummary">

      </div>
      <div class="site-settings">
        <div class="site-settings__site-options">
          <div class="site-settings__site-title-tagline">
            <fieldset class="form-fieldset"><label for="blogname" class="form-label"><!-- react-text: 3528 -->站点标题
              <!-- /react-text --></label><input type="text" name="blogname" id="blogname"
                                                 data-tip-target="site-title-input" value="caixieblog"
                                                 class="form-text-input"></fieldset>
            <fieldset class="form-fieldset"><label for="blogdescription" class="form-label"><!-- react-text: 3532 -->
              站点副标题<!-- /react-text --></label><input type="text" name="blogdescription" id="blogdescription"
                                                      data-tip-target="site-tagline-input"
                                                      value="Welcome to your new home on WordPress.com"
                                                      class="form-text-input">
              <p class="form-setting-explanation">简要描述该站点。</p></fieldset>
          </div>
          <fieldset class="site-icon-setting form-fieldset"><label class="site-icon-setting__heading form-label">
            <!-- react-text: 3537 -->站点图标<!-- /react-text --><span class="info-popover"><svg
            class="gridicon gridicons-info-outline needs-offset" height="18" width="18"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
            d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg>
            <!-- react-empty: 3542 --></span></label>
            <button type="button" class="site-icon-setting__icon">
              <div class="site-icon is-blank" style="height: 96px; width: 96px; line-height: 96px; font-size: 96px;">
                <svg class="gridicon gridicons-globe" height="74" width="74" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                  </g>
                </svg>
              </div>
            </button>
            <button type="button" class="button site-icon-setting__button is-compact">更改</button>
            <!-- react-empty: 4164 --></fieldset>
        </div>
      </div>
    </foldable-card>
    <div class="podcasts-browser-list">
      <div class="card podcasts-browser-list__elements" v-if="isNotEmpty">
        <li class="podcasts-browser-item" v-for="item in list" :key="item.id">
          <nuxt-link :to="'/podcast/' + item.id" class="podcasts-browser-item__link">
            <div class="podcasts-browser-item__info">
              <div class="plugin-icon">
                <img class="plugin-icon__img"
                     :src="item.featured_image">
              </div>
              <div class="podcasts-browser-item__title">{{item.title}}</div>
              <div class="podcasts-browser-item__author">{{ item.authorInfo.user_nicename }}</div>
              <div class="podcasts-browser-item__published" v-if="item.status === 'publish'">
                <svg class="gridicon gridicons-checkmark" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path d="M9 19.414l-6.707-6.707 1.414-1.414L9 16.586 20.293 5.293l1.414 1.414"></path>
                  </g>
                </svg>
                已发布
              </div>
            </div>
          </nuxt-link>
        </li>
      </div>
      <div class="card" v-else>
        <empty-content class="" title="此分类下没有内容" style="padding:15px;" :action="emptyAction"></empty-content>
      </div>
    </div>
  </div>

</template>

<script>
  import FoldableCard from '~/components/foldable-card'
  import EmptyContent from '~/components/empty-content'

  export default {
    name: 'PodcastsBrowserList',
    components: {
      FoldableCard,
      EmptyContent
    },
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
        list: [],
        emptyAction: {
          title: '添加节目',
          url: '/podcast'
        }
      }
    },
    mounted () {

      (async () => {
        await this.load()
      })()

    },
    computed: {
      isNotEmpty () {
        return this.list.length > 0
      }
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

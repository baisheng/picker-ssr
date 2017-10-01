<style>
  .empty-content__title {
    font-size: 34px;
  }
</style>
<template>
  <main class="posts is-multisite main">

    <div class="posts__primary">
      <div class="section-nav has-pinned-items">
        <div class="section-nav__mobile-header">
          <span class="section-nav__mobile-header-text">
          <span>
            <span>已发布</span>
            <small>所有人</small>
          </span>
          </span>
        </div>
        <div class="section-nav__panel">
          <div class="section-nav-group">
            <div class="section-nav-tabs has-siblings">
              <h6 class="section-nav-group__label">状态</h6>
              <ul class="section-nav-tabs__list" role="menu">
                <nuxt-link to="/podcasts/my" class="is-publish section-nav-tab" tag="li">
                  <a class="section-nav-tab__link" tabindex="0" aria-selected="true"
                     role="menuitem">
                    <span class="section-nav-tab__text">
                      已发布
                    </span>
                  </a>
                </nuxt-link>
                <nuxt-link to="/podcasts/my/drafts" class="is-publish section-nav-tab" tag="li">

                  <a class="section-nav-tab__link" tabindex="0" aria-selected="false"
                     role="menuitem">
                  <span class="section-nav-tab__text">
                  待审核
                  </span>
                  </a>
                </nuxt-link>
                <nuxt-link to="/podcasts/my/off" class="is-publish section-nav-tab" tag="li">

                  <a class="section-nav-tab__link" tabindex="0" aria-selected="false"
                     role="menuitem">
                  <span class="section-nav-tab__text">
                  已下架
                  </span>
                  </a>
                </nuxt-link>
                <nuxt-link to="/podcasts/my/trashed" class="is-trash section-nav-tab" tag="li">

                  <a class="section-nav-tab__link" tabindex="0" aria-selected="false"
                     role="menuitem">
                  <span class="section-nav-tab__text">
                  已放入回收站
                  </span>
                  </a>
                </nuxt-link>

              </ul>
            </div>
          </div>
          <div class="section-nav-group section-nav__segmented has-siblings">
            <h6 class="section-nav-group__label">
              作者</h6>
            <ul class="segmented-control" role="radiogroup">
              <nuxt-link to="/podcasts/my" tag="li" class="segmented-control__item">
                <a class="segmented-control__link" role="radio"
                   tabindex="0" aria-selected="false">
                            <span class="segmented-control__text">
                                个人
                              <img alt="bluepx" class="gravatar"
                                   :src="user.avatar"
                                   width="16"
                                   height="16">
                            </span>
                </a>
              </nuxt-link>

              <nuxt-link to="/podcasts" tag="li" class="segmented-control__item">
                <a class="segmented-control__link" role="radio" tabindex="0" aria-selected="true">
                            <span class="segmented-control__text">
                              所有人
                            </span>
                </a>
              </nuxt-link>
            </ul>
          </div>
          <div class="is-expanded-to-container has-open-icon search" role="search">
            <div class="spinner" style="">
              <svg class="spinner__image" width="20" height="20" viewBox="0 0 100 100">
                <defs>
                  <mask id="maskBorder19">
                    <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
                    <circle r="46%" cx="50%" cy="50%" fill="black"></circle>
                  </mask>
                  <mask id="maskDonut19">
                    <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
                    <circle r="46%" cx="50%" cy="50%" fill="white"></circle>
                    <circle r="30%" cx="50%" cy="50%" fill="black"></circle>
                  </mask>
                  <mask id="maskLeft19">
                    <rect x="0" y="0" width="50%" height="100%" fill="white"></rect>
                  </mask>
                  <mask id="maskRight19">
                    <rect x="50%" y="0" width="50%" height="100%" fill="white"></rect>
                  </mask>
                </defs>
                <circle class="spinner__border" r="50%" cx="50%" cy="50%" mask="url( #maskBorder19 )"></circle>
                <g mask="url( #maskDonut19 )">
                  <g mask="url( #maskLeft19 )">
                    <rect class="spinner__progress is-left" x="0" y="0" width="50%" height="100%"></rect>
                  </g>
                  <g mask="url( #maskRight19 )">
                    <rect class="spinner__progress is-right" x="50%" y="0" width="50%" height="100%"></rect>
                  </g>
                </g>
              </svg>
            </div>
            <div class="search__icon-navigation" tabindex="0" aria-controls="search-component-11"
                 aria-label="打开“搜索”">
              <svg class="gridicon gridicons-search search__open-icon" height="24" width="24"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                  <path
                    d="M21 19l-5.154-5.154C16.574 12.742 17 11.42 17 10c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7c1.42 0 2.742-.426 3.846-1.154L19 21l2-2zM5 10c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5z"></path>
                </g>
              </svg>
            </div>
            <div class="search__input-fade">
              <input type="search" id="search-component-11" class="search__input"
                     placeholder="Search 已发布..." role="search" value=""
                     aria-label="搜索" aria-hidden="true" autocapitalize="none"></div>
          </div>
        </div>
      </div>
      <podcasts-list :list="posts.data" v-if="isNotEmpty"></podcasts-list>
      <div class="empty-content" v-else>
        <img src="/images/posts/illustration-posts.svg" width="150" class="empty-content__illustration">
        <h2 class="empty-content__title">{{ emptyTitle }}</h2>
        <h3 class="empty-content__line">要发布内容吗？</h3>
        <a class="empty-content__action button is-primary"
           href="/podcast">开始创建节目</a></div>

    </div>

  </main>
</template>
<script>
  //  import ActionMenu from '../../components/podcast/podcast-action'
  import {PodcastsList} from '~/components/podcasts'

  export default {
    name: 'podcast',
    layout: 'podcast',
    data () {
      return {
        filter: 'publish',
        collapsed: true
      }
    },
    middleware: 'authenticated',
    components: {
      PodcastsList
//      ActionMenu
    },
    async asyncData ({store, params}) {
      // Default type `podcast` page `1`
      await store.dispatch('loadPosts', params)
      return {filter: params.status}
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

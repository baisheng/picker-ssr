<style>
  .empty-content__title {
    font-size: 34px;
  }
</style>
<template>
  <main class="podcasts is-multisite main">
    <div class="podcasts__primary">
      <button class="button button podcast-library__source-button is-borderless" title="选择媒体库来源" type="button">
        <svg class="gridicon gridicons-my-sites" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <g>
            <path
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM3.5 12c0-1.232.264-2.402.736-3.46L8.29 19.65C5.456 18.272 3.5 15.365 3.5 12zm8.5 8.5c-.834 0-1.64-.12-2.4-.345l2.55-7.41 2.613 7.157c.017.042.038.08.06.117-.884.31-1.833.48-2.823.48zm1.172-12.485c.512-.027.973-.08.973-.08.458-.055.404-.728-.054-.702 0 0-1.376.108-2.265.108-.835 0-2.24-.107-2.24-.107-.458-.026-.51.674-.053.7 0 0 .434.055.892.082l1.324 3.63-1.86 5.578-3.096-9.208c.512-.027.973-.08.973-.08.458-.055.403-.728-.055-.702 0 0-1.376.108-2.265.108-.16 0-.347-.003-.547-.01C6.418 5.025 9.03 3.5 12 3.5c2.213 0 4.228.846 5.74 2.232-.037-.002-.072-.007-.11-.007-.835 0-1.427.727-1.427 1.51 0 .7.404 1.292.835 1.993.323.566.7 1.293.7 2.344 0 .727-.28 1.572-.646 2.748l-.848 2.833-3.072-9.138zm3.1 11.332l2.597-7.506c.484-1.212.645-2.18.645-3.044 0-.313-.02-.603-.057-.874.664 1.21 1.042 2.6 1.042 4.078 0 3.136-1.7 5.874-4.227 7.347z"></path>
          </g>
        </svg>
        <span class="screen-reader-text">WordPress 库</span><!-- react-empty: 1116 --></button>

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
                <nuxt-link to="/podcasts" class="is-publish section-nav-tab" tag="li">
                  <a class="section-nav-tab__link" tabindex="0" aria-selected="true"
                     role="menuitem">
                    <span class="section-nav-tab__text">
                      已发布
                    </span>
                  </a>
                </nuxt-link>
                <nuxt-link to="/podcasts/drafts" class="is-publish section-nav-tab" tag="li">

                  <a class="section-nav-tab__link" tabindex="0" aria-selected="false"
                     role="menuitem">
                  <span class="section-nav-tab__text">
                  待审核
                  </span>
                  </a>
                </nuxt-link>
                <nuxt-link to="/podcasts/off" class="is-publish section-nav-tab" tag="li">

                  <a class="section-nav-tab__link" tabindex="0" aria-selected="false"
                     role="menuitem">
                  <span class="section-nav-tab__text">
                  已下架
                  </span>
                  </a>
                </nuxt-link>
                <nuxt-link to="/podcasts/trashed" class="is-trash section-nav-tab" tag="li">

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
      console.log(params)
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

<template>
  <main data-reactroot="" class="main" role="main">
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
      <div><p class="current-section__site-title">bluepx</p>
        <h1 class="current-section__section-title">站点页面</h1></div>
    </a></header>
    <div class="section-nav has-pinned-items">
      <div class="section-nav__mobile-header"><span class="section-nav__mobile-header-text">开播中</span></div>
      <div class="section-nav__panel">
        <div class="section-nav-group">
          <div class="section-nav-tabs"><h6 class="section-nav-group__label">状态</h6>
            <ul class="section-nav-tabs__list" role="menu">
              <li class="is-selected section-nav-tab">
                <a href="/pages/published/bluepx.wordpress.com"
                   class="section-nav-tab__link" tabindex="0" aria-selected="true"
                   role="menuitem"><span class="section-nav-tab__text"><!-- react-text: 3173 -->
                  连载中
                  <!-- /react-text --></span></a></li>
              <li class="section-nav-tab"><a href="/pages/drafts/bluepx.wordpress.com" class="section-nav-tab__link"
                                             tabindex="0" aria-selected="false" role="menuitem"><span
                class="section-nav-tab__text"><!-- react-text: 3177 -->已完结<!-- /react-text --></span></a></li>
              <li class="section-nav-tab"><a href="/pages/scheduled/bluepx.wordpress.com" class="section-nav-tab__link"
                                             tabindex="0" aria-selected="false" role="menuitem"><span
                class="section-nav-tab__text"><!-- react-text: 3181 -->预发布<!-- /react-text --></span></a></li>
              <li class="section-nav-tab"><a href="/pages/trashed/bluepx.wordpress.com" class="section-nav-tab__link"
                                             tabindex="0" aria-selected="false" role="menuitem"><span
                class="section-nav-tab__text"><!-- react-text: 3185 -->已停播<!-- /react-text --></span></a></li>
            </ul>
          </div>
        </div>
        <div class="is-expanded-to-container has-open-icon search" role="search">
          <div class="spinner" style="">
            <svg class="spinner__image" width="20" height="20" viewBox="0 0 100 100">
              <defs>
                <mask id="maskBorder52">
                  <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
                  <circle r="46%" cx="50%" cy="50%" fill="black"></circle>
                </mask>
                <mask id="maskDonut52">
                  <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
                  <circle r="46%" cx="50%" cy="50%" fill="white"></circle>
                  <circle r="30%" cx="50%" cy="50%" fill="black"></circle>
                </mask>
                <mask id="maskLeft52">
                  <rect x="0" y="0" width="50%" height="100%" fill="white"></rect>
                </mask>
                <mask id="maskRight52">
                  <rect x="50%" y="0" width="50%" height="100%" fill="white"></rect>
                </mask>
              </defs>
              <circle class="spinner__border" r="50%" cx="50%" cy="50%" mask="url( #maskBorder52 )"></circle>
              <g mask="url( #maskDonut52 )">
                <g mask="url( #maskLeft52 )">
                  <rect class="spinner__progress is-left" x="0" y="0" width="50%" height="100%"></rect>
                </g>
                <g mask="url( #maskRight52 )">
                  <rect class="spinner__progress is-right" x="50%" y="0" width="50%" height="100%"></rect>
                </g>
              </g>
            </svg>
          </div>
          <div class="search__icon-navigation" tabindex="0" aria-controls="search-component-27" aria-label="打开“搜索”">
            <svg class="gridicon gridicons-search search__open-icon" height="24" width="24"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g>
                <path
                  d="M21 19l-5.154-5.154C16.574 12.742 17 11.42 17 10c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7c1.42 0 2.742-.426 3.846-1.154L19 21l2-2zM5 10c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5z"></path>
              </g>
            </svg>
          </div>
          <div class="search__input-fade"><input type="search" id="search-component-27" class="search__input"
                                                 placeholder="搜索已发布内容…" role="search" value="" aria-label="搜索"
                                                 aria-hidden="true" autocapitalize="none"></div>
        </div>
      </div>
    </div>
    <div><!-- react-empty: 3197 -->
      <div id="pages" class="pages__page-list"><a href="https://bluepx.wordpress.com" target="_blank"
                                                  rel="noopener noreferrer" class="card blog-posts-page is-card-link">
        <svg class="gridicon gridicons-external card__link-indicator" height="24" width="24"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path
              d="M19 13v6c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2V7c0-1.105.895-2 2-2h6v2H5v12h12v-6h2zM13 3v2h4.586l-7.793 7.793 1.414 1.414L19 6.414V11h2V3h-8z"></path>
          </g>
        </svg>
        <div class="blog-posts-page__details">
          <div class="blog-posts-page__title">孩子，把你的手给我</div>
          <div class="blog-posts-page__info"><span><svg
            class="gridicon gridicons-house blog-posts-page__front-page-icon" height="12" width="12"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
            d="M22 9L12 1 2 9v2h2v10h5v-4c0-1.657 1.343-3 3-3s3 1.343 3 3v4h5V11h2V9z"></path></g></svg>
            <!-- react-text: 3210 -->首页显示您最近发布的文章。<!-- /react-text --></span></div>
        </div>
      </a>
        <div class="card page is-compact">
          <div class="page__main"><a class="page__title" href="/page/bluepx.wordpress.com/1" title="编辑About">
            <!-- react-text: 3214 -->About<!-- /react-text --></a>
            <div class="page-card-info">
              <div><span class="page-card-info__item"><svg class="gridicon gridicons-time page-card-info__item-icon"
                                                           height="12" width="12" xmlns="http://www.w3.org/2000/svg"
                                                           viewBox="0 0 24 24"><g><path
                d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.8 13.4L13 11.667V7h-2v5.333l3.2 4.266 1.6-1.2z"></path></g></svg><span
                class="page-card-info__item-text">7 天前</span></span></div>
            </div>
          </div>
          <svg class="gridicon gridicons-ellipsis page__actions-toggle" height="24" width="24"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
              <path
                d="M7 12c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm12-2c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-7 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z"></path>
            </g>
          </svg><!-- react-empty: 3249 --><span></span></div>
      </div>
    </div>
  </main>
</template>
<script>
  export default {
    data () {
      return {
        collapsed: true
      }
    },
    middleware: 'authenticated',
    components: {
    },
    async fetch ({store}) {
      await store.dispatch('loadArticles', {axios: store.$axios})
    },
    computed: {
      article () {
        return this.$store.state.article.list
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
      handleClick () {
        this.collapsed = !this.collapsed
      }
    }
  }
</script>

<template>
  <div class="podcasts-browser__main-header">
    <div class="section-nav">
      <div class="section-nav__mobile-header"><span class="section-nav__mobile-header-text">建议搜索</span></div>
      <div class="section-nav__panel">
        <div class="section-nav-group">
          <div class="section-nav-tabs has-siblings"><h6 class="section-nav-group__label">Suggested Searches</h6>
            <ul class="section-nav-tabs__list" role="menu">
              <nuxt-link to="/podcasts" tag="li" class="section-nav-tab">
                <a class="section-nav-tab__link">
                  <span class="section-nav-tab__text">
                  全部类别
                  </span>
                </a>
              </nuxt-link>
              <nuxt-link to="/podcasts/publish" tag="li" class="section-nav-tab">
                <a class="section-nav-tab__link">
                  <span class="section-nav-tab__text">
                  已发布的内容
                  </span>
                </a>
              </nuxt-link>
              <!--
              <li class="section-nav-tab"><a class="section-nav-tab__link" tabindex="0" role="menuitem"><span
                class="section-nav-tab__text">
                  待审核
                </span></a></li>
              <li class="section-nav-tab"><a class="section-nav-tab__link" tabindex="0" role="menuitem"><span
                class="section-nav-tab__text">
                 草稿
                </span></a></li>
              <li class="section-nav-tab"><a class="section-nav-tab__link" tabindex="0" role="menuitem"><span
                class="section-nav-tab__text">&lt;!&ndash; react-text: 743 &ndash;&gt;撰写&lt;!&ndash; /react-text &ndash;&gt;</span></a></li>-->
            </ul>
          </div>
        </div>
        <div class="is-expanded-to-container has-open-icon search" role="search">
          <div class="spinner" style="">
            <svg class="spinner__image" width="20" height="20" viewBox="0 0 100 100">
              <defs>
                <mask id="maskBorder2">
                  <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
                  <circle r="46%" cx="50%" cy="50%" fill="black"></circle>
                </mask>
                <mask id="maskDonut2">
                  <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
                  <circle r="46%" cx="50%" cy="50%" fill="white"></circle>
                  <circle r="30%" cx="50%" cy="50%" fill="black"></circle>
                </mask>
                <mask id="maskLeft2">
                  <rect x="0" y="0" width="50%" height="100%" fill="white"></rect>
                </mask>
                <mask id="maskRight2">
                  <rect x="50%" y="0" width="50%" height="100%" fill="white"></rect>
                </mask>
              </defs>
              <circle class="spinner__border" r="50%" cx="50%" cy="50%" mask="url( #maskBorder2 )"></circle>
              <g mask="url( #maskDonut2 )">
                <g mask="url( #maskLeft2 )">
                  <rect class="spinner__progress is-left" x="0" y="0" width="50%" height="100%"></rect>
                </g>
                <g mask="url( #maskRight2 )">
                  <rect class="spinner__progress is-right" x="50%" y="0" width="50%" height="100%"></rect>
                </g>
              </g>
            </svg>
          </div>
          <div class="search__icon-navigation" tabindex="0" aria-controls="search-component-2" aria-label="打开“搜索”">
            <svg class="gridicon gridicons-search search__open-icon" height="24" width="24"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g>
                <path
                  d="M21 19l-5.154-5.154C16.574 12.742 17 11.42 17 10c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7c1.42 0 2.742-.426 3.846-1.154L19 21l2-2zM5 10c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5z"></path>
              </g>
            </svg>
          </div>
          <div class="search__input-fade"><input type="search" id="search-component-2" class="search__input"
                                                 placeholder="搜索插件" role="search" value="" aria-label="搜索"
                                                 aria-hidden="true" autocapitalize="none"></div>
        </div>
      </div>
    </div>
    <div class="podcasts__header-buttons ">
      <nuxt-link to="/podcast" class="button header-button" aria-label="发布节目">
        <!--        <svg class="gridicon gridicons-cloud-upload" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path>
                  </g>
                </svg>-->
        <span class="header-button__text">创建分类</span></nuxt-link>
      <nuxt-link to="/podcast" class="button header-button" aria-label="发布节目">
        <!--        <svg class="gridicon gridicons-cloud-upload" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path>
                  </g>
                </svg>-->
        <span class="header-button__text">添加节目</span></nuxt-link>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'PodcastsBrowserMainHeader'
  }
</script>

<template>
  <div :class="classes" ref="layout">
    <logged-in v-if="!isLogged"/>
    <div class="layout__loader is-active">
      <pulsing-dot :active="true"></pulsing-dot>
      <!--<div class="pulsing-dot"></div>-->
    </div>
    <div id="content" class="layout__content">
      <div id="primary" class="layout__primary">
        <nuxt/>
      </div>
      <div id="secondary" class="layout__secondary">
        <div class="sites-navigation">
          <div><!-- react-empty: 79 -->
            <div class="site-selector sites-list is-hover-enabled">
              <div class="is-open has-open-icon search" role="search">
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
                <div class="search__icon-navigation" aria-controls="search-component-2" aria-label="打开“搜索”">
                  <svg class="gridicon gridicons-search search__open-icon" height="24" width="24"
                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g>
                      <path
                        d="M21 19l-5.154-5.154C16.574 12.742 17 11.42 17 10c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7c1.42 0 2.742-.426 3.846-1.154L19 21l2-2zM5 10c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5z"></path>
                    </g>
                  </svg>
                </div>
                <div class="search__input-fade"><input type="search" id="search-component-2" class="search__input"
                                                       placeholder="搜索…" role="search" value="" aria-label="搜索"
                                                       aria-hidden="false" autocapitalize="none"></div>
              </div>
              <div class="site-selector__sites">
                <div class="all-sites"><a class="site__content"><span class="count">4</span>
                  <div class="site__info"><span class="site__title">所有应用</span><!-- react-text: 97 -->
                    <!-- /react-text -->
                    <div class="all-sites-icon has-4-icons">
                      <div class="site-icon is-blank"
                           style="height: 14px; width: 14px; line-height: 14px; font-size: 14px;">
                        <svg class="gridicon gridicons-globe" height="11" width="11" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                          <g>
                            <path
                              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                          </g>
                        </svg>
                      </div>
                      <div class="site-icon is-blank"
                           style="height: 14px; width: 14px; line-height: 14px; font-size: 14px;">
                        <svg class="gridicon gridicons-globe" height="11" width="11" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                          <g>
                            <path
                              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                          </g>
                        </svg>
                      </div>
                      <div class="site-icon is-blank"
                           style="height: 14px; width: 14px; line-height: 14px; font-size: 14px;">
                        <svg class="gridicon gridicons-globe" height="11" width="11" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                          <g>
                            <path
                              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                          </g>
                        </svg>
                      </div>
                      <div class="site-icon is-blank"
                           style="height: 14px; width: 14px; line-height: 14px; font-size: 14px;">
                        <svg class="gridicon gridicons-globe" height="11" width="11" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                          <g>
                            <path
                              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </a></div>
                <div class="site" v-for="app in apps">
                  <a class="site__content" :href="`/${app.type}/home`">
                    <div class="site-icon is-blank"
                         style="height: 32px; width: 32px; line-height: 32px; font-size: 32px;">
                      <img :src="app.meta.basic.logo_url" v-if="app.meta.basic.logo_url">
                      <svg class="gridicon gridicons-globe" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 24 24" v-else>
                        <g>
                          <path
                            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                        </g>
                      </svg>
                    </div>
                    <div class="site__info">
                      <div class="site__title">
                        {{ app.meta.basic.name}} - {{ app.type }}
                      </div>
                      <div class="site__domain">
                        {{ app.meta.basic.description }}
                      </div>
                    </div>
                  </a>
                </div>

                <div class="site"><a class="site__content" title="选择站点 bluepx.wordpress.com"
                                     aria-label="选择站点 bluepx.wordpress.com">
                  <div class="site-icon is-blank"
                       style="height: 32px; width: 32px; line-height: 32px; font-size: 32px;">
                    <svg class="gridicon gridicons-globe" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                      <g>
                        <path
                          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                      </g>
                    </svg>
                  </div>
                  <div class="site__info">
                    <div class="site__title"><!-- react-text: 123 -->bluepx<!-- /react-text --></div>
                    <div class="site__domain">bluepx.wordpress.com</div>
                  </div>
                </a>
                  <div class="site-indicator__wrapper"></div>
                </div>
                <div class="site"><a class="site__content" title="选择站点 caixieblog.wordpress.com"
                                     aria-label="选择站点 caixieblog.wordpress.com">
                  <div class="site-icon is-blank"
                       style="height: 32px; width: 32px; line-height: 32px; font-size: 32px;">
                    <svg class="gridicon gridicons-globe" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                      <g>
                        <path
                          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                      </g>
                    </svg>
                  </div>
                  <div class="site__info">
                    <div class="site__title"><!-- react-text: 134 -->caixieblog<!-- /react-text --></div>
                    <div class="site__domain">caixieblog.wordpress.com</div>
                  </div>
                </a>
                  <div class="site-indicator__wrapper"></div>
                </div>
                <div class="site"><a class="site__content" title="选择站点 pickerweb.wordpress.com"
                                     aria-label="选择站点 pickerweb.wordpress.com">
                  <div class="site-icon is-blank"
                       style="height: 32px; width: 32px; line-height: 32px; font-size: 32px;">
                    <svg class="gridicon gridicons-globe" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                      <g>
                        <path
                          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                      </g>
                    </svg>
                  </div>
                  <div class="site__info">
                    <div class="site__title"><!-- react-text: 145 -->Site Title<!-- /react-text --></div>
                    <div class="site__domain">pickerweb.wordpress.com</div>
                  </div>
                </a>
                  <div class="site-indicator__wrapper"></div>
                </div>
                <div class="site"><a class="site__content" title="选择站点 baishengblog.wordpress.com"
                                     aria-label="选择站点 baishengblog.wordpress.com">
                  <div class="site-icon is-blank"
                       style="height: 32px; width: 32px; line-height: 32px; font-size: 32px;">
                    <svg class="gridicon gridicons-globe" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                      <g>
                        <path
                          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                      </g>
                    </svg>
                  </div>
                  <div class="site__info">
                    <div class="site__title"><!-- react-text: 156 -->站点标题<!-- /react-text --></div>
                    <div class="site__domain">baishengblog.wordpress.com</div>
                  </div>
                </a>
                  <div class="site-indicator__wrapper"></div>
                </div>
              </div>
              <span class="site-selector__add-new-site"><a href="/start?ref=calypso-selector"
                                                           class="button is-borderless"><svg
                class="gridicon gridicons-add-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"><g><path
                d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"></path></g></svg>
                <!-- react-text: 164 --> <!-- /react-text --><!-- react-text: 165 -->添加新站点
                <!-- /react-text --></a></span></div>
          </div>


          <ul class="sidebar has-regions notouch" data-tip-target="sidebar">
            <div class="sidebar__region">
              <div class="card current-site">
                <span class="current-site__switch-sites">
                  <button type="button" class="button is-compact is-borderless" @click="switchApps">
                    <svg class="gridicon gridicons-arrow-left needs-offset-y" height="18" width="18"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                      d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g></svg>
                  切换应用
                </button>
                </span>
                <div>
                  <div class="site">
                    <a class="site__content" title="选择站点 bluepx.wordpress.com"
                       aria-label="选择站点 bluepx.wordpress.com">
                      <div class="site-icon is-blank"
                           style="height: 32px; width: 32px; line-height: 32px; font-size: 32px;">
                        <icon name="globe" class="gridicon" style="width: 24px; height: 24px;"></icon>
                      </div>
                      <div class="site__info">
                        <!-- TODO: 加载每次请求中 -->
                        <div class="site__title">育儿柚道</div>
                        <div class="site__domain">播客-小程序</div>
                      </div>
                    </a>
                    <div class="site-indicator__wrapper"></div>
                  </div>
                </div>
                <div class="site__notices"></div>
              </div>
              <div>
                <li class="sidebar__menu">
                  <h2 class="sidebar__heading">管理</h2>
                  <ul>
                    <nuxt-link to="/podcast/home" tag="li">
                      <a>
                        <icon name="dot-circle-o" class="gridicon"></icon>
                        <span class="menu-link-text">节目管理</span>
                      </a>
                      <a href="/podcast" class="sidebar__button">添加</a>
                    </nuxt-link>

                    <li class="" data-post-type="media"><a href="/media/bluepx.wordpress.com">
                      <icon name="photo" class="gridicon"></icon>
                      <span class="menu-link-text">媒体</span></a>
                      <form class="media-library__upload-button button sidebar__button">
                        添加
                        <input type="file"
                               accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.ppt,.odt,.pptx,.docx,.pps,.ppsx,.xls,.xlsx,.key,.ogv,.mp4,.m4v,.mov,.wmv,.avi,.mpg,.3gp,.3g2"
                               multiple="" class="media-library__upload-button-input">
                      </form>
                    </li>
                    <li class="">
                      <a href="/comments">
                        <icon name="comments" class="gridicon"></icon>
                        <span class="menu-link-text">评论</span></a>
                    </li>
                    <li>
                      <a>
                        <icon name="life-ring" class="gridicon">
                        </icon>
                        <span class="menu-link-text">问答</span>
                      </a>
                    </li>
                  </ul>
                </li>

                <li class="sidebar__menu">
                  <h2 class="sidebar__heading">配置</h2>
                  <ul>
                    <nuxt-link class="users" to="/people/team" tag="li">
                      <a>
                        <svg class="gridicon gridicons-user" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                          <g>
                            <path
                              d="M12 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 16s8 0 8-2c0-2.4-3.9-5-8-5s-8 2.6-8 5c0 2 8 2 8 2z"></path>
                          </g>
                        </svg>
                        <span class="menu-link-text">人员</span></a>
                      <a href="/people/new" class="sidebar__button">添加</a>
                    </nuxt-link>
                    <nuxt-link class="settings" to="/podcast/settings/general" tag="li">
                      <a>
                        <svg class="gridicon gridicons-cog" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                          <g>
                            <path
                              d="M20 12c0-.568-.06-1.122-.174-1.656l1.834-1.612-2-3.464-2.322.786c-.82-.736-1.787-1.308-2.86-1.657L14 2h-4l-.48 2.396c-1.07.35-2.04.92-2.858 1.657L4.34 5.268l-2 3.464 1.834 1.612C4.06 10.878 4 11.432 4 12s.06 1.122.174 1.656L2.34 15.268l2 3.464 2.322-.786c.82.736 1.787 1.308 2.86 1.657L10 22h4l.48-2.396c1.07-.35 2.038-.92 2.858-1.657l2.322.786 2-3.464-1.834-1.613c.113-.535.174-1.09.174-1.657zm-8 4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path>
                          </g>
                        </svg>
                        <span class="menu-link-text">设置</span></a>
                    </nuxt-link>
                  </ul>
                </li>
              </div>
            </div>
            <div class="sidebar__footer">
              <a class="button sidebar__footer-help is-borderless" href="/help" title="帮助">
                <icon name="question-circle-o" class="gridicon"></icon>
              </a>
            </div>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import LoggedIn from './masterbar/logged-in'
  import LoggedOut from './masterbar/logged-out'

  export default {
    data () {
      return {
        isLogged: false
      }
    },
    components: {
      LoggedIn,
      LoggedOut
    },
    computed: {
      apps () {
        return this.$store.state.org.apps.data
      },
      org () {
        return this.$store.state.org.orgInfo
      },
      currentLayoutFocus () {
        return this.$store.state.options.layoutFocus
      },
      classes () {
        let focus = this.$store.state.options.layoutFocus
        return [
          'notouch',
          'layout',
          'is-group-sites',
          'is-section-posts-pages',
          focus === 'sites' ? 'focus-sites' : 'focus-sidebar'
        ]
      }
    },
    methods: {
      switchApps (event) {
        event.preventDefault();
        event.stopPropagation();
        this.$store.dispatch('loadOrgApps')
        this.$store.commit('options/SET_LAYOUT_FOCUS', 'sites')
//        this.props.setLayoutFocus( 'sites' );
      },
      scrollToTop: function () {
        document.getElementById('secondary').scrollTop = 0
        window.scrollTo(0, 0)
      },
      closePicker: function () {
        if (this.currentLayoutFocus === 'sites') {
          this.$store.commit('options/SET_LAYOUT_FOCUS', 'sidebar')
          this.scrollToTop()
        }
//        if (this.props.currentLayoutFocus === 'sites') {
//          this.props.setLayoutFocus('sidebar');
//          this.scrollToTop();
//        }
      },
      handleClickOutside: function () {
        this.closePicker();
      },
      onClose: function (event) {
        if (event.key === 'Escape') {
          this.closePicker();
        } else {
          // We use setNext here, because on mobile we want to show sidebar
          // instead of Stats page after picking a site
//          this.props.setNextLayoutFocus('sidebar');
          this.$store.commit('options/SET_NEXT_LAYOUT_FOCUS', 'sidebar')
          this.scrollToTop();
        }
//        this.onClose(event);
      },
    }
  }
</script>

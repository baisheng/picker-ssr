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
          <ul class="sidebar has-regions notouch" data-tip-target="sidebar">
            <div class="sidebar__region">
              <div class="card current-site">
                <span class="current-site__switch-sites"><button type="button" class="button is-compact is-borderless"><svg
                  class="gridicon gridicons-arrow-left needs-offset-y" height="18" width="18"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                  d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g></svg>
                  切换应用
                </button></span>
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
                    <nuxt-link class="settings" to="/settings/general" tag="li">
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
      classes () {
        let focus = this.$store.state.options.layoutFocus
        return [
          'layout',
          'is-group-sites',
          'is-section-posts-pages',
          focus === 'sites' ? 'focus-sites' : 'focus-sidebar'
        ]
      },
      org () {
        return this.$store.state.org.orgInfo
      }
    }
  }
</script>

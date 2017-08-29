<template>
  <div class="layout focus-sidebar">
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
        <div id="secondary" class="layout__secondary">
          <div data-reactroot="" class="sites-navigation">
            <ul class="sidebar has-regions" data-tip-target="sidebar">
              <div class="sidebar__region">
                <div class="card current-site">
                  <div>
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
                        <div class="site__title">育儿柚道</div>
                        <div class="site__domain">zhiyou.picker.cc</div>
                      </div>
                    </a>
                      <div class="site-indicator__wrapper"></div>
                    </div>
                  </div><!-- react-empty: 114 -->
                  <div class="site__notices"><!-- react-empty: 116 --><!-- react-empty: 117 --></div>
                </div>
                <div>
                  <li class="sidebar__menu"><h2 class="sidebar__heading">管理</h2>
                    <ul><!-- react-empty: 140 -->
                      <li class="" data-post-type="page"><a href="/pages/bluepx.wordpress.com">
                        <svg class="gridicon gridicons-pages" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                          <g>
                            <path
                              d="M16 8H8V6h8v2zm0 2H8v2h8v-2zm4-6v12l-6 6H6c-1.105 0-2-.895-2-2V4c0-1.105.895-2 2-2h12c1.105 0 2 .895 2 2zm-2 10V4H6v16h6v-4c0-1.105.895-2 2-2h4z"></path>
                          </g>
                        </svg>
                        <span class="menu-link-text">文章</span></a><a href="/page/bluepx.wordpress.com"
                                                                     class="sidebar__button">添加</a></li>
                      <li class="selected" data-post-type="post"><a href="/posts/my/bluepx.wordpress.com">
                        <svg class="gridicon gridicons-posts" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                          <g>
                            <path
                              d="M16 19H3v-2h13v2zm5-10H3v2h18V9zM3 5v2h11V5H3zm14 0v2h4V5h-4zm-6 8v2h10v-2H11zm-8 0v2h5v-2H3z"></path>
                          </g>
                        </svg>
                        <span class="menu-link-text">专辑</span></a><a href="/post/bluepx.wordpress.com"
                                                                     class="sidebar__button">添加</a></li>
                      <li class="" data-post-type="media"><a href="/media/bluepx.wordpress.com">
                        <svg class="gridicon gridicons-image" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                          <g>
                            <path
                              d="M13 9.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5zM22 6v12c0 1.105-.895 2-2 2H4c-1.105 0-2-.895-2-2V6c0-1.105.895-2 2-2h16c1.105 0 2 .895 2 2zm-2 0H4v7.444L8 9l5.895 6.55 1.587-1.85c.798-.932 2.24-.932 3.037 0L20 15.426V6z"></path>
                          </g>
                        </svg>
                        <span class="menu-link-text">媒体</span></a>
                        <form class="media-library__upload-button button sidebar__button"><!-- react-text: 162 -->添加
                          <!-- /react-text --><input type="file"
                                                     accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.ppt,.odt,.pptx,.docx,.pps,.ppsx,.xls,.xlsx,.key,.ogv,.mp4,.m4v,.mov,.wmv,.avi,.mpg,.3gp,.3g2"
                                                     multiple="" class="media-library__upload-button-input"></form>
                      </li>
                      <li class="" data-post-type="comments"><a href="/comments/bluepx.wordpress.com">
                        <svg class="gridicon gridicons-chat" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                          <g>
                            <path
                              d="M2 6v4.9c0 1.3.6 2.5 1.7 3.3L7 16.5V13h2v-2c0-1.7 1.3-3 3-3h2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2z"></path>
                            <path
                              d="M12 9h8c1.1 0 2 .9 2 2v4.9c0 1.3-.6 2.5-1.7 3.3L17 21.5V18h-5c-1.1 0-2-.9-2-2v-5c0-1.1.9-2 2-2z"></path>
                          </g>
                        </svg>
                        <span class="menu-link-text">评论</span></a><!-- react-empty: 171 --></li>
                      <li class="" data-post-type="comments"><a href="/comments/bluepx.wordpress.com">
                        <svg class="gridicon gridicons-chat" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                          <g>
                            <path
                              d="M2 6v4.9c0 1.3.6 2.5 1.7 3.3L7 16.5V13h2v-2c0-1.7 1.3-3 3-3h2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2z"></path>
                            <path
                              d="M12 9h8c1.1 0 2 .9 2 2v4.9c0 1.3-.6 2.5-1.7 3.3L17 21.5V18h-5c-1.1 0-2-.9-2-2v-5c0-1.1.9-2 2-2z"></path>
                          </g>
                        </svg>
                        <span class="menu-link-text">问答</span></a><!-- react-empty: 171 --></li>
                    </ul>
                  </li>
                  <li class="sidebar__menu"><h2 class="sidebar__heading">配置</h2>
                    <ul>
                      <li class="users"><a href="/people/team/bluepx.wordpress.com">
                        <svg class="gridicon gridicons-user" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                          <g>
                            <path
                              d="M12 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 16s8 0 8-2c0-2.4-3.9-5-8-5s-8 2.6-8 5c0 2 8 2 8 2z"></path>
                          </g>
                        </svg>
                        <span class="menu-link-text">人员</span></a><a href="/people/new/bluepx.wordpress.com"
                                                                     class="sidebar__button">添加</a></li>

                      <li class="settings" data-tip-target="settings"><a href="/settings/general/bluepx.wordpress.com">
                        <svg class="gridicon gridicons-cog" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                          <g>
                            <path
                              d="M20 12c0-.568-.06-1.122-.174-1.656l1.834-1.612-2-3.464-2.322.786c-.82-.736-1.787-1.308-2.86-1.657L14 2h-4l-.48 2.396c-1.07.35-2.04.92-2.858 1.657L4.34 5.268l-2 3.464 1.834 1.612C4.06 10.878 4 11.432 4 12s.06 1.122.174 1.656L2.34 15.268l2 3.464 2.322-.786c.82.736 1.787 1.308 2.86 1.657L10 22h4l.48-2.396c1.07-.35 2.038-.92 2.858-1.657l2.322.786 2-3.464-1.834-1.613c.113-.535.174-1.09.174-1.657zm-8 4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path>
                          </g>
                        </svg>
                        <span class="menu-link-text">设置</span></a></li>
                    </ul>
                  </li>
                </div>
              </div>
              <div class="sidebar__footer"><a class="button sidebar__footer-help is-borderless" href="/help" title="帮助">
                <svg class="gridicon gridicons-help-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4 8c0-2.21-1.79-4-4-4s-4 1.79-4 4h2c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2c-.552 0-1 .448-1 1v2h2v-1.14c1.722-.447 3-1.998 3-3.86zm-3 6h-2v2h2v-2z"></path>
                  </g>
                </svg>
              </a></div>
            </ul>
          </div>
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
    }
  }
</script>

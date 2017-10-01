<template>
  <div :class="classes" ref="layout">
    <logged-in v-if="!isLogged"/>
    <div id="content" class="layout__content">
      <div id="primary" class="layout__primary">
        <nuxt/>
      </div>

      <div id="secondary" class="layout__secondary">
        <ul data-reactroot="" class="sidebar" data-tip-target="sidebar">
          <div class="profile-gravatar">
            <div>
              <div class="animate__appear">
                <img alt="bluepx" class="gravatar"
                     :src="user.avatar"
                     width="150" height="150" />
              </div>
            </div>
            <h2 class="profile-gravatar__user-display-name">
              {{ user.user_nicename }}
            </h2>
            <div class="profile-gravatar__user-secondary-info">
              @{{user.user_login}}
            </div>
          </div>
          <div class="me-sidebar__signout">
            <button class="button me-sidebar__signout-button is-compact" title="注销 WordPress.com" type="button">登出
            </button>
          </div>
          <li class="sidebar__menu"><h2 class="sidebar__heading">个人资料</h2>
            <ul>
              <li class="selected"><a href="/me">
                <svg class="gridicon gridicons-user" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M12 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 16s8 0 8-2c0-2.4-3.9-5-8-5s-8 2.6-8 5c0 2 8 2 8 2z"></path>
                  </g>
                </svg>
                <span class="menu-link-text">我的个人资料</span></a></li>
              <li class=""><a href="/me/account">
                <svg class="gridicon gridicons-cog" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M20 12c0-.568-.06-1.122-.174-1.656l1.834-1.612-2-3.464-2.322.786c-.82-.736-1.787-1.308-2.86-1.657L14 2h-4l-.48 2.396c-1.07.35-2.04.92-2.858 1.657L4.34 5.268l-2 3.464 1.834 1.612C4.06 10.878 4 11.432 4 12s.06 1.122.174 1.656L2.34 15.268l2 3.464 2.322-.786c.82.736 1.787 1.308 2.86 1.657L10 22h4l.48-2.396c1.07-.35 2.038-.92 2.858-1.657l2.322.786 2-3.464-1.834-1.613c.113-.535.174-1.09.174-1.657zm-8 4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path>
                  </g>
                </svg>
                <span class="menu-link-text">帐户设置</span></a></li>
              <li class=""><a href="/me/purchases">
                <svg class="gridicon gridicons-credit-card" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M20 4H4c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2V6c0-1.105-.895-2-2-2zm0 2v2H4V6h16zM4 18v-6h16v6H4zm2-4h7v2H6v-2zm9 0h3v2h-3v-2z"></path>
                  </g>
                </svg>
                <span class="menu-link-text">管理购买</span></a></li>
              <li class=""><a href="/me/security">
                <svg class="gridicon gridicons-lock" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M18 8h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v1H6c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2V10c0-1.105-.895-2-2-2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm4 8.723V18h-2v-2.277c-.595-.346-1-.984-1-1.723 0-1.105.895-2 2-2s2 .895 2 2c0 .738-.405 1.376-1 1.723z"></path>
                  </g>
                </svg>
                <span class="menu-link-text">安全性</span></a></li>
              <li class=""><a href="/me/notifications">
                <svg class="gridicon gridicons-bell" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M6.14 14.97l2.828 2.827c-.362.362-.862.586-1.414.586-1.105 0-2-.895-2-2 0-.552.224-1.052.586-1.414zm8.867 5.324L14.3 21 3 9.7l.706-.707 1.102.157c.754.108 1.69-.122 2.077-.51l3.885-3.884c2.34-2.34 6.135-2.34 8.475 0s2.34 6.135 0 8.475l-3.885 3.886c-.388.388-.618 1.323-.51 2.077l.157 1.1z"></path>
                  </g>
                </svg>
                <span class="menu-link-text">通知设置</span></a></li>
            </ul>
          </li>

          <div class="sidebar__footer"><a class="button sidebar__footer-help is-borderless" href="/help" title="帮助">
            <svg class="gridicon gridicons-help-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g>
                <path
                  d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4 8c0-2.21-1.79-4-4-4s-4 1.79-4 4h2c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2c-.552 0-1 .448-1 1v2h2v-1.14c1.722-.447 3-1.998 3-3.86zm-3 6h-2v2h2v-2z"></path>
              </g>
            </svg>
          </a>
          </div>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
  import LoggedIn from './masterbar/logged-in'
  import LoggedOut from './masterbar/logged-out'
  import ClickOutside from '~/directives/click-outside'
  import vueEsc from '~/directives/vue-esc'

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
      user () {
        return this.$store.state.user
      },
      curApp () {
        return this.$store.state.org.currentApp
      },
      apps () {
        return this.$store.state.org.apps.data
      },
      org () {
        return this.$store.state.org.detail.data
      },
      currentLayoutFocus () {
        return this.$store.state.options.layoutFocus
      },
      classes () {
        const focus = this.$store.state.options.layoutFocus
        return [
          'notouch',
          'layout',
          'is-group-me',
          'is-section-me',
          focus === 'sites' ? 'focus-content' : 'focus-sidebar'
        ]
      }
    },
    methods: {
      toAppHome (event) {
        event.preventDefault();
        event.stopPropagation();
        this.$router.push('/apps')
        this.closePicker()
      },
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
          this.$store.commit('options/SET_NEXT_LAYOUT_FOCUS', 'sidebar')
          this.scrollToTop();
        }
//        this.onClose(event);
      }
    },
    directives: {
      ClickOutside,
      vueEsc
    }
  }
</script>

<template>
  <main class="invite-people main">
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
      <div><p class="current-section__site-title">Picker</p>
        <h1 class="current-section__section-title">邀请用户</h1></div>
    </a>
    </header>
    <div class="card header-cake is-compact">
      <button class="button header-cake__back is-compact is-borderless" type="button">
        <svg class="gridicon gridicons-arrow-left needs-offset-y" height="18" width="18"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </g>
        </svg>
        返回
      </button>
      <div class="header-cake__title">添加用户</div>
      <button class="button header-cake__back is-spacer is-compact is-borderless" disabled="" type="button">
        <svg class="gridicon gridicons-arrow-left needs-offset-y" height="18" width="18"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </g>
        </svg>
        返回
      </button>
    </div>
    <div class="card">
      <div>
        <form @submit.prevent="handleSubmit">
          <div role="group" class="invite-people__token-field-wrapper">
            <label class="form-label">
              用户名
            </label>
            <div class="token-field" tabindex="-1">
              <div class="token-field__input-container" tabindex="-1">
                <input id="usernameOrEmail" name="user_login" class="form-text-input"
                       v-model="form.user_login" v-validate="'required|alpha'"
                       :class="{'input': true, 'is-danger': errors.has('user_login') }" type="text" placeholder="用户名">
                <form-input-validation :isError="errors.has('user_login')" v-show="errors.has('user_login')">
                  {{ errors.first('user_login') }}
                </form-input-validation>
              </div>
              <ul class="token-field__suggestions-list" tabindex="-1"></ul>
            </div>
            <!--<p class="form-setting-explanation">用户名必需为英文字符</p>-->
          </div>
          <div role="group" class="invite-people__token-field-wrapper">
            <label class="form-label">
              昵称
            </label>
            <div class="token-field" tabindex="-1">
              <div class="token-field__input-container" tabindex="-1">
                <input type="text" autocapitalize="none"
                       autocomplete="off" value="" placeholder="用户昵称"
                       size="1" class="token-field__input" v-model="form.user_nicename">
              </div>
              <ul class="token-field__suggestions-list" tabindex="-1"></ul>
            </div>
            <p class="form-setting-explanation"></p>
          </div>
          <div role="group" class="invite-people__token-field-wrapper">
            <label class="form-label">
              用户邮箱
            </label>
            <div class="token-field" tabindex="-1">
              <div class="token-field__input-container" tabindex="-1">
                <input type="text" autocapitalize="none"
                       autocomplete="off" value="" placeholder=""
                       size="1" class="token-field__input" v-model="form.user_email">
              </div>
              <ul class="token-field__suggestions-list" tabindex="-1"></ul>
            </div>
          </div>
          <div role="group" class="invite-people__token-field-wrapper">
            <label class="form-label">
              手机号
            </label>
            <div class="token-field" tabindex="-1">
              <div class="token-field__input-container" tabindex="-1">
                <input type="text" autocapitalize="none"
                       autocomplete="off" value="" placeholder=""
                       size="1" class="token-field__input" v-model="form.user_phone">
              </div>
              <ul class="token-field__suggestions-list" tabindex="-1"></ul>
            </div>
          </div>
          <fieldset class="form-fieldset">
            <label for="role">
              身份
            </label>
            <select id="role" name="role" class="form-select" v-model="form.role">
              <option value="author">作者</option>
              <option value="editor">编辑</option>
              <option value="administrator">管理员</option>
              <!--<option value="contributor">贡献者</option>-->
              <!--<option value="follower">微信粉丝</option>-->
            </select>
            <p class="form-setting-explanation">
              <a target="_blank"
                 rel="noopener noreferrer"
                 href="http://user-roles/">
                了解更多关于角色的信息</a>
            </p>
          </fieldset>
          <fieldset class="form-fieldset">
          </fieldset>
          <fieldset class="form-fieldset">
            <label for="summary" class="form-label">
              简介
            </label>
            <div class="counted-textarea">
              <textarea name="summary" id="summary" maxlength="500" placeholder=""
                        class="counted-textarea__input form-textarea" v-model="form.summary"></textarea>
              <!--<div class="counted-textarea__count-panel"></div>-->
            </div>
            <p class="form-setting-explanation"></p>
          </fieldset>
          <button type="submit" class="button form-button is-primary" :class="isSave ? 'is-busy' : ''">登录</button>
        </form>
      </div>
    </div>
  </main>
</template>
<script>
  import FormInputValidation from '~/components/forms/form-input-validation'

  export default {
    components: {
      FormInputValidation
    },
    data () {
      return {
        isSave: false,
        form: {
          approach: 'pc',
          user_login: '',
          user_pass: '111111',
          user_nicename: '',
          user_email: '',
          user_phone: '',
          summary: '',
          role: ''
        }
      }
    },
    computed: {
      newUser () {
        return this.$store.state.users.detail
      }
    },
    methods: {
      async handleSubmit () {
        const that = this
        that.isSave = true
        await this.$validator.validateAll().then(async (result) => {
          if (result) {
            await this.$store.dispatch('addUser', {form: this.form})
            that.isSave = false
            if (that.newUser.creating && that.newUser.type !== 'exist') {
              this.$router.replace('/people/team')
            } else {
              console.log('创建失败。。。')
            }
//            if (that.newUser.type !== '')
//            await this.$store.dispatch('login', {form: this.form})
//            that.isLogin = false
//            this.$router.replace('/apps')
            return
          }
          that.isSave = false
//          that.isLogin = false
          console.log('Correct them errors!')
        })
      },
    }
  }
</script>

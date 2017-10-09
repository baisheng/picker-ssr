<style>
  .gravatar {
    width: 150px;
    height: 150px;
  }

  .file-uploads {
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
</style>
<template>
  <main class="profile main">
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
    <!-- Navbar -->
    <header-cake compact backHref="/people/team">
      <span>更新信息</span>
      <!--<span v-if="user.id">更新内容</span>-->
      <!--<span v-else>添加内容</span>-->
    </header-cake>
    <div class="card me-profile-settings ">
      <div class="edit-gravatar">
        <div>
          <span class="file-picker">
            <div class="edit-gravatar__image-container">
              <div class="drop-zone">
              <div class="drop-zone__content">
          <div>
          <span class="drop-zone__content-icon">
            <svg
              class="gridicon gridicons-cloud-upload" height="48" width="48" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"><g><path
              d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path></g></svg>
          </span>
            <span
              class="drop-zone__content-text">拖放以上传个人资料照片</span>
          </div>
              </div>
              </div>

              <img class="gravatar"
                   :src="user.avatar"
                   width="150" height="150">
              <spinner v-show="!isUploading" :className="'edit-gravatar__spinner'"></spinner>
              <div class="edit-gravatar__label-container" v-show="isUploading">
                <file-upload
                  name="file"
                  :post-action="uploadAction"
                  v-model="files"
                  @input-file="input"
                  @input-filter="inputFilter"
                  :accept="accept"
                  :size="size || 0"
                  :headers="requestHeader"
                  ref="upload">
                  <!--Add upload files-->
                  <svg class="gridicon gridicons-cloud-upload"
                       height="36"
                       width="36"
                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g><path
                      d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path></g>
                  </svg>
                <span class="edit-gravatar__label">点击以更换照片</span>
                </file-upload>
        </div>

        </div>
        </span>
        </div>
        <div>
          <p class="edit-gravatar__explanation">个人资料照片处于公开状态。</p><span
          class="info-popover edit-gravatar__pop-over">
          <svg class="gridicon gridicons-info-outline needs-offset"

               height="18" width="18" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"><g><path
            d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg>
        </span>
        </div>
      </div>
      <!--<form>-->
      <!--<fieldset class="form-fieldset">-->
      <!--<label for="first_name" class="form-label">-->
      <!--&lt;!&ndash; react-text: 2677 &ndash;&gt;名字-->
      <!--&lt;!&ndash; /react-text &ndash;&gt;</label><input type="text" id="first_name" name="first_name" class="form-text-input"-->
      <!--value=""></fieldset>-->
      <!--<fieldset class="form-fieldset"><label for="last_name" class="form-label">&lt;!&ndash; react-text: 2681 &ndash;&gt;姓氏-->
      <!--&lt;!&ndash; /react-text &ndash;&gt;</label><input type="text" id="last_name" name="last_name" class="form-text-input"-->
      <!--value=""></fieldset>-->
      <!--<fieldset class="form-fieldset"><label for="display_name" class="form-label">&lt;!&ndash; react-text: 2685 &ndash;&gt;公共显示名称-->
      <!--&lt;!&ndash; /react-text &ndash;&gt;</label><input type="text" id="display_name" name="display_name" class="form-text-input"-->
      <!--value="bluepx"></fieldset>-->
      <!--<fieldset class="form-fieldset"><label for="description" class="form-label">&lt;!&ndash; react-text: 2689 &ndash;&gt;关于我-->
      <!--&lt;!&ndash; /react-text &ndash;&gt;</label><textarea id="description" name="description" class="form-textarea"></textarea>-->
      <!--</fieldset>-->
      <!--<p>-->
      <!--<button disabled="" type="submit" class="button form-button is-primary">保存个人资料详细信息</button>-->
      <!--</p>-->
      <!--</form>-->
      <form @submit.prevent="handleSubmit">
        <fieldset class="form-fieldset">

          <div role="group" class="invite-people__token-field-wrapper">
            <label class="form-label">
              用户名
            </label>
            <div class="token-field" tabindex="-1">
              <div class="token-field__input-container" tabindex="-1">
                <input id="usernameOrEmail" name="user_login" class="form-text-input"
                       v-model="user.user_login" v-validate="'required|alpha'"
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
                       size="1" class="token-field__input" v-model="user.user_nicename">
              </div>
              <ul class="token-field__suggestions-list" tabindex="-1"></ul>
            </div>
            <p class="form-setting-explanation"></p>
          </div>
        </fieldset>
        <div role="group" class="invite-people__token-field-wrapper">
          <label class="form-label">
            用户邮箱
          </label>
          <div class="token-field" tabindex="-1">
            <div class="token-field__input-container" tabindex="-1">
              <input type="text" autocapitalize="none"
                     autocomplete="off" value="" placeholder=""
                     size="1" class="token-field__input" v-model="user.user_email">
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
                     size="1" class="token-field__input" v-model="user.user_phone">
            </div>
            <ul class="token-field__suggestions-list" tabindex="-1"></ul>
          </div>
        </div>
        <fieldset class="form-fieldset">
          <label for="role">
            身份
          </label>
          <select id="role" name="role" class="form-select" v-model="user.role">
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
                        class="counted-textarea__input form-textarea" v-model="user.summary"></textarea>
            <!--<div class="counted-textarea__count-panel"></div>-->
          </div>
          <p class="form-setting-explanation"></p>
        </fieldset>
        <p>
          <button type="submit" class="button form-button is-primary" :class="isSave ? 'is-busy' : ''">保存</button>
        </p>
        <!--<button type="submit" class="button form-button is-primary" :class="isSave ? 'is-busy' : ''">保存</button>-->
      </form>
    </div>
    <div class="card delete-user__single-site">
      <form>
        <h3 class="form-section-heading">删除 {{ user.user_nicename }} </h3>
        <p class="delete-user__explanation">您可以选择重新分配 {{ user.user_nicename }} 创建的所有内容，也可以将相关内容全部删除。</p>
        <fieldset class="form-fieldset">
          <label class="form-label">
            <input type="radio" name="radioOption" value="reassign" class="form-radio">
            <span>
              将所有内容的作者修改为
            <span>
              <span class="author-selector__author-toggle" tabindex="-1">
                <span
                  class="delete-user__select-placeholder">选择用户</span>
                <svg class="gridicon gridicons-chevron-down"
                     height="16"
                     width="16" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"><g><path
                  d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg></span>
              <!-- react-empty: 176 --></span></span></label>
          <label class="form-label">
            <input type="radio"
                   name="radioOption"
                   value="delete"
                   class="form-radio">
            <span>删除 {{user.user_nicename}} 创建的所有内容</span>
          </label>
        </fieldset>
        <div class="form-buttons-bar">
          <button type="submit" class="button form-button is-primary">删除用户</button>
        </div>
      </form>
    </div>
  </main>
</template>
<script>
  import FormInputValidation from '~/components/forms/form-input-validation'
  import HeaderCake from '~/components/header-cake'
  import FileUpload from 'vue-upload-component/src'
  import Spinner from '~/components/spinner'

  export default {
    middleware: 'authenticated',
    layout: 'podcast',
    components: {
      HeaderCake,
      FormInputValidation,
      FileUpload,
      Spinner
    },
    async fetch ({store, params}) {
      if (params.id && !Object.is(Number(params.id), NaN)) {
        await store.dispatch('getUser', params.id)
      }
//      await store.dispatch('loadUsers')
//      await store.dispatch('getPodcast')
//      return Promise.all([
//        store.dispatch('loadEpisodeList', {axios: store.$axios, params: {parent: this.podcastId}})
//        store.dispatch('loadAnnouncements')
//      ])
    },
    data () {
      return {
        src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
        isSave: false,
        files: [],
        progress: 'success',
        uploadProgress: '',
        size: 1024 * 1024 * 10,
        accept: 'image/png,image/gif,image/jpeg,image/webp,audio/mp3',
        user: {
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
      isUploading () {
        return this.progress === 'success'
      },
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      },
      uploadAction () {
        const appId = this.$store.getters.appId
        const baseURL = process.env.baseURL
        return `${baseURL}/file`
      },
      detail () {
        return this.$store.state.users.detail.data
      },
      newUser () {
        return this.$store.state.users.detail
      }
    },
    mounted () {
      if (JSON.stringify(this.detail) !== '{}') {
        this.user = Object.assign({}, this.detail)
        this.user.approach = 'pc'
      }
      this.$on('avatar_upload', () => {
        this.$store.dispatch('updateUser', {form: this.user})
      })
    },
    methods: {
      imageuploaded (res) {
        if (res.errcode === 0) {
          this.src = res.data.src;
        }
      },
      async input (newFile, oldFile) {
        if (newFile && oldFile) {
          // console.log('update', newFile, oldFile)
          if (newFile.active && !oldFile.active) {
            // this.beforeSend(newFile)
            // min size
            if (newFile.size >= 0 && newFile.size < 100 * 1024) {
              // newFile = this.$refs.upload.update(newFile, {error: 'size'})
            }
          }
          if (newFile.progress !== oldFile.progress) {
            this.progress = newFile.progress
          }
          if (newFile.error && !oldFile.error) {
            // this.error(newFile)
            // console.log('error', newFile.error, newFile.response)
          }
          if (newFile.success && !oldFile.success) {
            // 文件上传成功后更新用户信息
            const data = newFile.response.data
            this.user.meta = {
              'avatar': data.id
            }
            this.$emit('avatar_upload', this.user)

            // 处理上传之后的头像异步加载显示，主要为了显示的体验更好。
            const readAndPreview = async (result) => {
              // Create XHR and FileReader objects
              const xhr = new XMLHttpRequest()
              const fileReader = new FileReader();

              xhr.open("GET", data.url, true);
              // Set the responseType to blob
              xhr.responseType = "blob";
              xhr.addEventListener("load", () => {
                if (xhr.status === 200) {
                  // onload needed since Google Chrome doesn't support addEventListener for FileReader
                  fileReader.onload = (evt) => {
                    // Read out file contents as a Data URL
                    // Set image src to Data URL
                    // 回调返回数据
                    typeof result === 'function' && result(evt.target.result)
                  };
                  // Load blob as Data URL
                  fileReader.readAsDataURL(xhr.response);
                }
              }, false);
              // Send XHR
              xhr.send();
            }

            await readAndPreview((result) => {
              this.user.avatar = result
              this.progress = 'success'
            })

          }
        }
        if (!newFile && oldFile) {
          // this.remove(oldFile)
          // console.log('remove', oldFile)
        }
        // 自动开始
        if (newFile && !oldFile && !this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      },
      inputFilter (newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
          // 过滤系疼文件 or 隐藏文件
          if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
            return prevent()
          }
          // 过滤 php html js 文件
          if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
            return prevent()
          }
          // 创建 blob 字段
          newFile.blob = ''
          const URL = window.URL || window.webkitURL
          if (URL && URL.createObjectURL) {
            newFile.blob = URL.createObjectURL(newFile.file)
          }
        }
      },
      async handleSubmit () {
        const that = this
        that.isSave = true
        console.log(JSON.stringify(this.user))
        await this.$validator.validateAll().then(async (result) => {
          if (result) {
            if (this.user.id) {
              await this.$store.dispatch('updateUser', {form: that.user})
              that.isSave = false
              this.$router.replace('/people/team')
            } else {
              await this.$store.dispatch('addUser', {form: that.user})
              that.isSave = false
              if (that.newUser.creating && that.newUser.type !== 'exist') {
                this.$router.replace('/people/team')
              } else {
                console.log('创建失败。。。')
              }
            }
          }
          that.isSave = false
          console.log('Correct them errors!')
        })
      },
    }
  }
</script>

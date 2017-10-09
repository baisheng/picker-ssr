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
  <main data-reactroot="" class="profile main" role="main">
    <header class="current-section"><a>
      <svg class="gridicon gridicons-chevron-left" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24">
        <g>
          <path d="M14 20l-8-8 8-8 1.414 1.414L8.828 12l6.586 6.586"></path>
        </g>
      </svg>
      <img alt="bluepx" class="gravatar"
           src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=400&amp;d=mm" width="30" height="30">
      <div><p class="current-section__me-title">我</p>
        <h1 class="current-section__section-title">我的个人资料</h1></div>
    </a>
    </header>
    <div class="card section-header is-compact">
      <div class="section-header__label">
        <span class="section-header__label-text">个人资料</span>
      </div>
      <div class="section-header__actions"></div>
    </div>
    <div class="card me-profile-settings">
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
      <form>
        <fieldset class="form-fieldset">
          <label for="first_name" class="form-label">
            账户名
          </label>
          <input type="text" id="first_name" name="first_name" class="form-text-input" :value="user.user_login"
                 disabled>
        </fieldset>

        <fieldset class="form-fieldset"><label for="display_name" class="form-label">
          公共显示名称
        </label>
          <input type="text" id="display_name" name="display_name" class="form-text-input" :value="user.user_nicename">
        </fieldset>
        <fieldset class="form-fieldset"><label for="description" class="form-label">
          关于我
        </label><textarea id="description" name="description" class="form-textarea"></textarea>
        </fieldset>
        <p>
          <button disabled="" type="submit" class="button form-button is-primary">保存个人资料</button>
        </p>
      </form>
      <p class="me-profile-settings__info-text">
        此信息将公开显示
      </p>
    </div>


    <div class="card me-security-settings security__settings"><p>
      要更新您的密码，请在下面输入一个新密码。密码不得少于 6 个字符。要提高密码强度，请使用大小写字母、数字和 ! " ? $ % ^ &amp; ) 等符号。</p>
      <form @submit.prevent="savePassword" class="account-password">

        <fieldset class="form-fieldset">
          <label for="password" class="form-label">
            新密码
          </label>
          <div class="form-password-input">
            <input type="password" autocapitalize="off" autocomplete="off"
                   autocorrect="off"
                   class="form-text-input account-password__password-field" id="password"
                   name="password">
            <span class="form-password-input__toggle form-password-input__toggle-visibility">
              <svg class="gridicon gridicons-not-visible" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24"><g><path
                d="M1 12s4.188-6 11-6c.947 0 1.84.12 2.678.322L8.36 12.64C8.133 12.14 8 11.586 8 11c0-.937.335-1.787.875-2.47C6.483 9.344 4.66 10.917 3.62 12c.68.707 1.696 1.62 2.98 2.398L5.15 15.85C2.498 14.13 1 12 1 12zm22 0s-4.188 6-11 6c-.946 0-1.836-.124-2.676-.323L5 22l-1.5-1.5 17-17L22 5l-3.147 3.147C21.5 9.87 23 12 23 12zm-2.615.006c-.678-.708-1.697-1.624-2.987-2.403L16 11c0 2.21-1.79 4-4 4l-.947.947c.31.03.624.053.947.053 3.978 0 6.943-2.478 8.385-3.994z"></path></g></svg></span>
          </div>
          <p class="form-setting-explanation">
          </p></fieldset>
        <div class="account-password__buttons-group form-buttons-bar">
          <button disabled="" type="submit" class="button form-button is-primary">保存密码</button>
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
    layout: 'profile',
    name: 'me',
    components: {
      HeaderCake,
      FormInputValidation,
      FileUpload,
      Spinner
    },
    data () {
      return {
        src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
        isSave: false,
        files: [],
        progress: 'success',
        uploadProgress: '',
        size: 1024 * 1024 * 10,
        accept: 'image/png,image/gif,image/jpeg',
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
      user () {
        return this.$store.state.user
      },
      org () {
        return this.$store.state.org.detail.data
      }
    },
    mounted () {
//      if (JSON.stringify(this.detail) !== '{}') {
//        this.user = Object.assign({}, this.detail)
//        this.user.approach = 'pc'
//      }
//      this.$on('avatar_upload', () => {
//        this.$store.dispatch('updateUser', {form: this.user})
//      })
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
      async savePassword () {
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

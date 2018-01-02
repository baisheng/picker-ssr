<template>
  <div>
    <!--<card>-->
    <!--<div class="section-header__label"><span class="section-header__label-text">精选</span></div>-->

    <!--</card>-->
    <foldable-card class="is-compact">
      <div class="connected-application-item__header is-p" slot="header">
        <div class="plugin-icon connected-application-icon animate__appear"
             :class="term.featured_image ? '' : 'site-icon is-blank'">
          <img
            class="plugin-icon__img"
            :src="term.featured_image" v-if="term.featured_image">
          <svg class="gridicon gridicons-globe" height="74" width="74" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24" v-else>
            <g>
              <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
            </g>
          </svg>
        </div>
        <h3> {{index + 1}} . {{ term.name }}</h3>
      </div>

      <div slot="summary">
        <nuxt-link class="button is-compact" style="margin-right: 8px;" :to="`/${term.slug}/post`">
          <svg class="gridicon gridicons-add-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <g>
              <path
                d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"></path>
            </g>
          </svg>
          添加内容
        </nuxt-link>
        <nuxt-link class="button is-compact is-action" :to="'/podcasts/term/' + term.slug"
                   v-if="expandedLink && isNotEmpty">
          查看全部
        </nuxt-link>
      </div>

      <div slot="expandedSummary">
        <button type="submit" class="button is-compact is-scary" @click="deleteCategory(term.slug)">
          删除分类
        </button>
        <!--<button style="margin-left: 5px;" type="submit" class="button is-compact is-empty">-->
          <!--设为默认-->
        <!--</button>-->
        <button style="margin-left: 5px;" type="submit" class="button is-compact is-empty" @click="save">
          保存
        </button>
      </div>
      <div class="site-settings">
        <div class="site-settings__site-options">
          <div class="site-settings__site-title-tagline">
            <fieldset class="form-fieldset">
              <label for="termname" class="form-label">
                分类名称
              </label>
              <input type="text" name="name" id="termname"
                     data-tip-target="site-title-input" :value="term.name"
                     class="form-text-input" @change="updateName">
            </fieldset>
            <fieldset class="form-fieldset">
              <label for="blogdescription" class="form-label">
                分类描述
              </label>
              <input type="text" name="blogdescription" id="blogdescription"
                     data-tip-target="site-tagline-input"
                     :value="term.description"
                     class="form-text-input" @change="updateDescription">
              <p class="form-setting-explanation">简要描述该分类。</p></fieldset>
          </div>
          <fieldset class="site-icon-setting form-fieldset">
            <label class="site-icon-setting__heading form-label">
              分类图标
              <span class="info-popover">
              <svg
                class="gridicon gridicons-info-outline needs-offset" height="18" width="18"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg>
            </span>
            </label>

            <div :class="classes" style="height: 96px; width: 96px; line-height: 96px; font-size: 96px;">
              <img class="site-icon__img image" :src="term.featured_image"
                   alt="" v-if="term.featured_image">
              <svg class="gridicon gridicons-globe" height="74" width="74" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24" v-else>
                <g>
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                </g>
              </svg>
              <spinner v-if="transient"></spinner>
            </div>
            <file-upload
              class="button site-icon-setting__button is-compact"
              name="file"
              :post-action="uploadAction"
              v-model="files"
              @input-file="input"
              @input-filter="inputFilter"
              :accept="accept"
              :size="size || 0"
              :headers="requestHeader"
              ref="upload">
              更改
              <!--<span class="edit-gravatar__label">点击以更换照片</span>-->
            </file-upload>

            <!--<button type="button" class="button site-icon-setting__button is-compact">更改</button>-->
            <button class="button site-icon-setting__button is-compact is-scary" type="button"
                    v-if="term.featured_image">移除
            </button>
          </fieldset>
        </div>
      </div>
    </foldable-card>
    <div class="podcasts-browser-list">
      <div class="card podcasts-browser-list__elements" v-if="isNotEmpty">
        <li class="podcasts-browser-item" v-for="item in list" :key="item.id">
          <nuxt-link :to="`${term.slug}/post/${item.id}`" class="podcasts-browser-item__link">
            <div class="podcasts-browser-item__info">
              <div class="plugin-icon" style="background: #ededed;">
                <img
                  class="plugin-icon__img"
                  :src="item.featured_image" v-if="item.featured_image">
                <svg class="gridicon gridicons-globe" height="74" width="74" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24" v-else>
                  <g>
                    <path
                      fill="#fff"
                      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                  </g>
                </svg>
              </div>
              <div class="podcasts-browser-item__title">{{item.title}}</div>
              <div class="podcasts-browser-item__author">{{ item.author.nicename }}</div>
              <div class="podcasts-browser-item__published" v-if="item.status === 'publish'">
                <svg class="gridicon gridicons-checkmark" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path d="M9 19.414l-6.707-6.707 1.414-1.414L9 16.586 20.293 5.293l1.414 1.414"></path>
                  </g>
                </svg>
                已发布
              </div>
            </div>
          </nuxt-link>
        </li>
      </div>
      <div class="card" v-else>
        <empty-content class="" title="此分类下没有内容" style="padding:15px;" :action="emptyAction"></empty-content>
      </div>
    </div>
  </div>

</template>

<script>
  /* eslint-disable key-spacing,comma-spacing,no-spaced-func */
  import {Card} from '~/components/card'
  import FoldableCard from '~/components/foldable-card'
  import EmptyContent from '~/components/empty-content'
  import FileUpload from 'vue-upload-component/src'
  import Spinner from '~/components/spinner'

  export default {
    name: 'PodcastsBrowserList',
    components: {
      Card,
      FoldableCard,
      EmptyContent,
      FileUpload,
      Spinner
    },
    props: {
      expandedLink: {
        type: Boolean,
        default: true
      },
      slug: {
        type: Boolean,
        default: false
      },
      term: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        files: [],
        progress: 'success',
        uploadProgress: '',
        size: 1024 * 1024 * 10,
        accept: 'image/png,image/gif,image/jpeg',
        list: [],
        emptyAction: {
          title: '添加节目',
          url: '/podcast'
        },
        transient: false,
        form: {},
        isChange: false
      }
    },
    mounted () {
      (async () => {
        await this.load()
      })()
    },
    computed: {
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      },
      uploadAction () {
        const appId = this.$store.getters.appId
        const baseURL = process.env.baseURL
        return `${baseURL}/apps/${appId}/file`
      },
      classes () {
        return [
          'site-icon',
          {
            'is-blank': !this.featuredImage,
            'is-transient': this.transient
          }
        ]
      },
      isNotEmpty () {
        return this.list.length > 0
      }
    },
    methods: {
      updateName (e) {
        this.form.name = e.target.value
        // this.isChange = true
      },
      updateDescription (e) {
        this.form.decription = e.target.value
        // this.isChange = true
      },
      async save () {
        this.form.slug = this.term.slug
        await this.$store.dispatch('saveCategory', {form: this.form})
        this.isChange = false
      },
      deleteCategory (slug) {
        this.$modal.show('dialog', {
          title: '确定删除分类吗？',
          text: '❗删除后不可恢复，分类中的内容会迁移至默认分类下，',
          buttons: [
            {
              title: '取消'
            },
            {
              title: '⭕ 确认',
              handler: async () => {
                const data = await this.$store.dispatch('deleteCategory', slug)
                if (data) {
                  this.$toast.error(data.errmsg)
                  this.$modal.hide('dialog')
                  return
                } else {
                  await this.$store.dispatch('loadCategories')
                  this.$toast.show('删除成功！👌')
                  this.$modal.hide('dialog')
                }
              }
            }
          ]
        })
      },
      async load () {
        // console.log(JSON.stringify(this.term) + '----xxx')
        const params = {
          term_id: this.term.term_id,
          term_slug: this.term.slug
          // term_id: this.term
//          type: 'podcast',
//           term_id: !this.slug ? this.term.term_id : '',
//           term_slug: this.slug ? this.term.slug : ''
        }
        if (this.slug) {
          // 详情
          const data = (await this.$axios.get(`/apps/${this.$store.getters.appId}/posts?pagesize=100`, {params})).data.data
          this.list = data.data
        } else {
          // 首页展示
          this.list = (await this.$axios.get(`/apps/${this.$store.getters.appId}/posts?category=${this.term.slug}&pagesize=6`)).data.data.data
          // console.log(JSON.stringify(this.list))
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
            this.transient = true
            this.progress = newFile.progress
          }
          if (newFile.error && !oldFile.error) {
            // this.error(newFile)
            // console.log('error', newFile.error, newFile.response)
          }
          if (newFile.success && !oldFile.success) {
            // 文件上传成功后更新用户信息
            const data = newFile.response.data
            // this.term.meta = {
            //   '_thumbnail_id': data.id
            // }
            this.form = {
              slug: this.term.slug,
              meta: {
                '_thumbnail_id': data.id
              }
            }
            await this.$store.dispatch('saveCategory', {form: this.form})
//            this.$emit('avatar_upload', this.user)
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
              this.transient = false
              this.term.featured_image = result
//              this.user.avatar = result
//              this.progress = 'success'
            })
            // 处理上传之后的头像异步加载显示，主要为了显示的体验更好。
            /*            const readAndPreview = async (result) => {
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
                          this.transient = true
                          this.term.featured_image = result
                          this.progress = 'success'
                        })*/

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
      }
    }
  }
</script>

<template>
  <div>
    <!-- Episode form header cake -->
    <div class="card header-cake is-compact">
      <button class="button header-cake__back is-compact is-borderless" type="button" @click="$emit('cancel')">
        <svg class="gridicon gridicons-arrow-left needs-offset-y" height="18" width="18"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </g>
        </svg>
        返回
      </button>
      <div class="header-cake__title">添加节目</div>
      <button class="button header-cake__back  disabled is-compact is-borderless" type="button" v-show="episode.id">
        节目内容已保存
      </button>
    </div>
    <!--- Episode form header -->
    <card class="section-header" compact v-if="episode.id">
      <div class="section-header__label">
        <span>{{ episode.title }}</span>
      </div>
      <div class="section-header__actions">
        <div class="button-group">
          <button class="button is-compact" @click="save">
            发布
          </button>
          <button class="button is-compact" @click="cancel">
            待审
          </button>
        </div>
      </div>
    </card>

    <card>
      <div class="connected-application-item__header" slot="header">

        <div class="order">
          <!--{{ index + 1 }}.-->
        </div>
        <h3> {{ episode.title }}</h3>
      </div>
      <button type="submit" class="button form-button is-compact is-active" slot="summary" @click="save">
        发布
      </button>
      <div slot="expandedSummary" class="section-header__actions">
        <span class="button-group">
        <button type="button" class="button is-error is-compact is-scary">
          <svg class="gridicon gridicons-trash needs-offset-y" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"><g><path
            d="M6.187 8h11.625l-.695 11.125C17.05 20.18 16.177 21 15.12 21H8.88c-1.057 0-1.93-.82-1.997-1.875L6.187 8zM19 5v2H5V5h3V4c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2v1h3zm-9 0h4V4h-4v1z"></path></g></svg>
          删除
        </button>
        <button type="button" class="button is-error is-compact">停播</button>
        </span>
      </div>
      <form>
        <div role="group" class="invite-people__token-field-wrapper">

          <label for="episode_title"
                 class="form-label">节目名称</label>
          <input id="episode_title" name="episode_title" class="form-text-input"
                 v-model="episode.title"
                 v-validate="'required'"
                 :class="{'input': true, 'is-danger': errors.has('episode_title') }"
                 type="text"
                 placeholder="请输入节目名称" @change="save">

          <form-input-validation :isError="errors.has('episode_title')" v-show="errors.has('episode_title')">
            {{ errors.first('episode_title') }}
          </form-input-validation>
        </div>
      </form>
      <div>
        <!--<card class="post-image is-placeholder is-compact"></card>-->
        <player mutex theme="#42b983" preload="metadata" mode="circulation"
                :music="episode" v-if="episode.url"></player>
        <div class="empty-content" v-else>
          <h2 class="empty-content__title">没有音频内容</h2>
          <h3 class="empty-content__line">是否要上传内容？</h3>
          <!--<button @click.prevent="addDirectory">Add upload directory</button>-->
          <file-upload
            :disabled="isDisabled"
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

          </file-upload>

          <button :disabled="isDisabled" class="media-library__upload-button button button is-primary"
                  @click.prevent="insertFile(episode)"
                  :class="uploadProgress ? 'is-busy' : ''">
              <span v-if="uploadProgress">
                {{uploadProgress}}
              </span>
            <span v-else>
                上传音频
            </span>
          </button>
          <button :disabled="isDisabled" class="media-library__upload-button button button is-primary"
                  @click.prevent="insertFile(episode)"
                  :class="uploadProgress ? 'is-busy' : ''">
              <span v-if="uploadProgress">
                {{uploadProgress}}
              </span>
            <span v-else>
                保存更改
            </span>
          </button>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
  import {Card} from '../card'
  import FileUpload from 'vue-upload-component/src'
  import FormInputValidation from '~/components/forms/form-input-validation'

  export default {
    name: 'EpisodeForm',
    props: {
      parent: {
        type: Object,
        required: true
      },
      sort: {
        type: Number,
        required: true
      }
    },
    components: {
      Card,
      FileUpload,
      FormInputValidation
    },
    data () {
      return {
        isDisabled: true,
        episode: {
          title: '',
          status: 'approve',
          content: '',
          term: 2
        },
        files: [],
        uploadProgress: '',
        accept: 'audio/mp3, audio/x-m4a, audio/m4a',
        size: 1024 * 1024 * 30
      }
    },
    computed: {
      uploadAction () {
        const appId = this.$store.getters.appId
        const baseURL = process.env.baseURL
        return `${baseURL}/apps/${appId}/file`
      },
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      }
    },
    methods: {
      // 创建节目 episode
      create () {
        const _sort = this.podcast.children.length + 1
        const newEpisode = {
          title: '无标题',
          author: this.podcast.author,
          parent: this.podcast.id,
          sort: _sort,
          status: 'draft',
          category: '5'
        }
        const res = this.$store.dispatch('episodeCreate', newEpisode)
        this.episode = Object.assign({}, newEpisode)
        this.episode.id = res
      },
      cancel () {
        this.$store.commit('podcast/CREATE_EPISODE_CANCEL')
      },
      save () {
        const that = this
        this.$validator.validateAll().then(async (result) => {
          if (result) {
            let form = {
              title: this.episode.title,
              parent: this.parent.id,
              sort: this.sort,
              status: 'draft',
              author: this.parent.author.id
            }
            // 保存数据
            const res = await that.$store.dispatch('episodeCreate', form)
            if (res) {
              this.episode.id = res
              this.isDisabled = false
              form = Object.assign(form, {id: res, author: this.parent.author.id})
              this.$emit('addEpisode', form)
            }
          }
        })
      },
      insertFile () {
        const input = this.$refs.upload.$el.querySelector('input')
        input.onclick = null
        input.click()
//        this.curItem = cur
      },
      input (newFile, oldFile) {
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
            this.uploadProgress = newFile.progress
          }
          if (newFile.error && !oldFile.error) {
            // this.error(newFile)
            // console.log('error', newFile.error, newFile.response)
          }
          if (newFile.success && !oldFile.success) {
            // this.success(newFile)
            const data = newFile.response.data
            this.episode.url = data.url
            this.episode.meta = {
              _audio_id: data.id
            }
            this.uploadProgress = ''
//            console.log(JSON.stringify(this.episode))
            // 如果不是新建就更新
//            if (!this.creating) {
//              this.$store.commit('podcast/UPDATE_EPISODE')
//            this.$emit('updateAudio', this.episode, this.episode.id)
//            }
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

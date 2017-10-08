<template>

  <card :class="classes">
    <episode-detail-header
      :isBulkEdit="isBulkEdit"
      :isExpanded="isExpanded"
      @delete="onDel"
      @trash="trash"
      @toggleApprove="toggleApprove"
      @toggleExpanded="toggleExpanded" :episode="episode" :order="order + 1"></episode-detail-header>

    <div class="episode-detail__content" v-if="isExpanded">
      <div class="episode-detail__post">
        <div class="episode-detail__post-info">
          <div class="emojify">{{ episode.title }}</div>
        </div>
        <div class="action">
          <file-upload
            :class="uploadProgress ? 'is-busy' : ''"
            class="button is-error is-compact"
            name="file"
            :post-action="uploadAction"
            v-model="files"
            @input-file="input"
            @input-filter="inputFilter"
            :accept="accept"
            :size="size || 0"
            :headers="requestHeader"
            ref="upload">

        <span v-if="uploadProgress">
                {{uploadProgress}}
              </span>
            <span>
                替换音频
              </span>
          </file-upload>
        </div>

      </div>

      <div>
        <!--
        <div class="episode-detail__episode">
          <div class="episode-detail__episode-content">
            <div class="episode-detail__author is-expanded">
              <div class="episode-detail__author-preview">
                <div class="episode-detail__author-avatar">
                  <div class="episode-detail__author-avatar">
                    <img alt="bluepx" class="gravatar"
                         :src="authorAvatar"
                         width="32" height="32"></div>
                </div>
                <div class="episode-detail__author-info">
                  <div class="episode-detail__author-info-element episode-detail__author-name"><strong>
                    <div class="emojify">{{ episode.authorInfo.user_login}}</div>
                  </strong>
                    <a href="http://bluepx.wordpress.com" class="external-link" rel="external">
                    <div class="emojify">bluepx.wordpress.com</div>
                    </a>
                  </div>
                  <a class="external-link episode-detail__author-info-element episode-detail__episode-date"
                     href="https://caixieblog.wordpress.com/2016/05/17/blog-post-title/episode-page-1/#episode-1"
                     rel="external">
                    {{ $moment(episode.modified).fromNow() }}
                  </a></div>

              </div>
              <div class="episode-detail__author-more-info">
                <div class="episode-detail__author-more-actions">
                  <div class="episode-detail__author-more-element episode-detail__author-more-element-author">
                    <svg class="gridicon gridicons-user-circle" height="24" width="24"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g>
                        <path
                          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18.5c-4.694 0-8.5-3.806-8.5-8.5S7.306 3.5 12 3.5s8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5zm0-8c-3.038 0-5.5 1.728-5.5 3.5s2.462 3.5 5.5 3.5 5.5-1.728 5.5-3.5-2.462-3.5-5.5-3.5zm0-.5c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"></path>
                      </g>
                    </svg>
                    <div class="episode-detail__author-info">
                      <div class="episode-detail__author-name"><strong>
                        <div class="emojify">bluepx</div>
                      </strong></div>
                      <div class="episode-detail__author-username">bluepx</div>
                    </div>
                  </div>
                  <div class="episode-detail__author-more-element">
                    <svg class="gridicon gridicons-mail" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                      <g>
                        <path
                          d="M20 4H4c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2V6c0-1.105-.895-2-2-2zm0 4.236l-8 4.882-8-4.882V6h16v2.236z"></path>
                      </g>
                    </svg>
                    <span>baisheng@outlook.com</span></div>
                  <div class="episode-detail__author-more-element">
                    <svg class="gridicon gridicons-link" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                      <g>
                        <path
                          d="M17 13H7v-2h10v2zm1-6h-1c-1.63 0-3.065.792-3.977 2H18c1.103 0 2 .897 2 2v2c0 1.103-.897 2-2 2h-4.977c.913 1.208 2.347 2 3.977 2h1c2.21 0 4-1.79 4-4v-2c0-2.21-1.79-4-4-4zM2 11v2c0 2.21 1.79 4 4 4h1c1.63 0 3.065-.792 3.977-2H6c-1.103 0-2-.897-2-2v-2c0-1.103.897-2 2-2h4.977C10.065 7.792 8.63 7 7 7H6c-2.21 0-4 1.79-4 4z"></path>
                      </g>
                    </svg>
                    <a href="http://bluepx.wordpress.com" class="external-link" rel="external">
                      <div class="emojify">bluepx.wordpress.com</div>
                    </a></div>
                  <div class="episode-detail__author-more-element">
                    <svg class="gridicon gridicons-globe" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                      <g>
                        <path
                          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                      </g>
                    </svg>
                    <span>45.78.30.99</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
            -->

        <div class="episode-detail__episode">
          <form>
            <div role="group" class="invite-people__token-field-wrapper"><label class="form-label">
              标题
            </label>
              <div tabindex="-1" class="token-field">
                <div tabindex="-1" class="token-field__input-container">
                  <input type="text" autocapitalize="none"
                         autocomplete="off" value=""
                         placeholder="请输入标题" size="1"
                         class="token-field__input"
                         v-model="episode.title"
                         :value="episode.title"
                         @change="update">
                </div>
                <ul tabindex="-1" class="token-field__suggestions-list"></ul>
              </div>
            </div>
          </form>
        </div>

        <div class="episode-detail__audio">
          <player mutex theme="#42b983" preload="metadata" mode="circulation"
                  :music="episode" v-if="episode.url"></player>
          <button class="media-library__upload-button button button is-primary" @click.prevent="insertFile()"
                  :class="uploadProgress ? 'is-busy' : ''" v-else>
              <span v-if="uploadProgress">
                {{uploadProgress}}
              </span>
            <span v-else>
                上传音频
              </span>
          </button>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
  import FileUpload from 'vue-upload-component/src'
  import FoldableCard from '../foldable-card'
  import {Card} from '../card'
  import EmptyContent from '../empty-content'
  import UpdateTemplate from '../update-post-status/update-template.vue'
  import EpisodeDetailHeader from './episode-detail-header.vue'

  export default {
    props: {
      isBulkEdit: {
        type: Boolean,
        default: false
      },
      episode: {
        type: Object,
        require: true
      },
      statusClass: String,
      order: {
        type: Number
      }
    },
    data () {
      return {
        isExpanded: false,
        status: '',
//        episode: {
//          title: '',
//          url: '',
//          status: 'unapproved'
//        },
        itemList: [],
        files: [],
        uploadProgress: '',
        accept: 'image/png,image/gif,image/jpeg,image/webp,audio/mp3,audio/mp4a-latm, audio/x-m4a, audio/m4a',
        size: 1024 * 1024 * 30,
        illustration: '/images/illustrations/videoAudioPosts.svg'
      }
    },
    computed: {
//      episodeStatus () {
//        return this.data !== 'approved' ? 'unapproved' : 'approved'
//      },
      authorAvatar () {
        if (this.episode.hasOwnProperty('authorInfo')) {
          const authorInfo = this.episode.authorInfo
          if (!authorInfo.hasOwnProperty('avatar')) {
            return '/images/people/mystery-person.svg'
          } else {
            return authorInfo.avatar
          }
        } else {
          return '/images/people/mystery-person.svg'
        }
      },
      isLoading () {
        return !this.episode
      },

      classes () {
        return [
          'episode-detail',
          {
            'episode-detail__placeholder': this.isLoading,
            'is-approved': this.episode.status === 'approved',
            'is-unapproved': this.episode.status !== 'approved',
            'is-bulk-edit': this.isBulkEdit,
            'is-expanded': this.isExpanded,
            'is-collapsed': !this.isExpanded,
            'is-trash': this.episode.status === 'trash'
          }
        ]
      },
      statusTitle () {
        switch (this.episode.status) {
          case 'publish': {
            return '已上架'
          }
          case 'off': {
            return '已下架'
          }
          case 'trash': {
            return '已删除'
          }
          case 'auto-draft': {
            return '草稿'
          }
          default: {
            return '草稿'
          }
        }
      },

//      creating () {
//        return this.$store.state.podcast.episode.creating
//      },
      uploadAction () {
        const appId = this.$store.getters.appId
        const baseURL = process.env.baseURL
        return `${baseURL}/app/${appId}/file`
      },
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      }
    },
    mounted () {
      this.episode.term = 2
//      this.episode = this.data
//      this.episode = Object.assign({}, this.data)
    },
    components: {
      Card,
      FoldableCard,
      FileUpload,
      EmptyContent,
      UpdateTemplate,
      EpisodeDetailHeader
    },
    methods: {
      async toggleApprove () {
        const status = this.episode.status
        this.episode.status = status === 'approved' ? 'approve' : 'approved'
        this.$emit('update', this.episode)
      },
      toggleExpanded () {
        this.isExpanded = !this.isExpanded
      },
      trash () {
        this.episode.status = 'trash'
        this.$emit('update', this.episode)
      },
      onDel () {
        this.status = 'deleting'
        this.$emit('episode-del', this.episode, this.order)
      },
      update () {
        this.$emit('update', this.episode)
      },
      insertFile () {
        const input = this.$refs.upload.$el.querySelector('input')
        input.onclick = null
        input.click()
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
            // 如果不是新建就更新
//            if (!this.creating) {
//              this.$store.commit('podcast/UPDATE_EPISODE')
            this.$emit('update', this.episode, this.episode.id)
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

<style scoped>
  .order {
    margin-right: 10px;
  }
</style>
<template>

  <foldable-card compact tabindex="0">
    <episode-header :isExpanded="isExpanded" @toggleExpanded="toggleExpanded"></episode-header>

    <div class="episode-detail__header is-preview" slot="header">
      <!--<div class="episode-detail__header-content">-->
        <div class="order">
          {{ order + 1 }}.
        </div>
        <h3>{{ episode.title }}</h3>
      <!--</div>-->
    </div>
    <div slot="summary">
        {{ statusTitle }}
    </div>
    <div slot="expandedSummary" class="section-header__actions">
      <button type="submit" class="button form-button is-compact is-active">
      发布
      </button>
      <button type="button" class="button is-error is-compact is-scary" @click="onDel">停播</button>

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
        ref="upload"
        v-if="!creating">

        <span v-if="uploadProgress">
                {{uploadProgress}}
              </span>
        <span v-else>
                替换音频
              </span>
      </file-upload>
      <button type="submit"
              class="button form-button is-compact is-scary"
              @click="onDel">

        <svg class="gridicon gridicons-trash needs-offset-y" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <g>
            <path
              d="M6.187 8h11.625l-.695 11.125C17.05 20.18 16.177 21 15.12 21H8.88c-1.057 0-1.93-.82-1.997-1.875L6.187 8zM19 5v2H5V5h3V4c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2v1h3zm-9 0h4V4h-4v1z"></path>
          </g>
        </svg>
        回收站
      </button>

    </div>
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
    <div>
      <!--<card class="post-image is-placeholder is-compact"></card>-->
      <player mutex theme="#42b983" preload="metadata" mode="circulation"
              :music="episode" v-if="episode.url"></player>
      <empty-content title="没有音频内容" line="是否要上传内容" :illustration="illustration" v-else>
        <button class="media-library__upload-button button button is-primary" @click.prevent="insertFile()"
                :class="uploadProgress ? 'is-busy' : ''">
              <span v-if="uploadProgress">
                {{uploadProgress}}
              </span>
          <span v-else>
                上传音频
              </span>
        </button>
      </empty-content>
    </div>
    <!-- 状态提示 -->
    <update-template :status="status" v-show="status"></update-template>

  </foldable-card>
</template>

<script>
  import FileUpload from 'vue-upload-component/src'
  import FoldableCard from '../foldable-card'
  import {Card} from '../card'
  import EmptyContent from '../empty-content'
  import UpdateTemplate from '../update-post-status/update-template.vue'
  import EpisodeHeader from '../episode/episode-detail-header.vue'
  export default {
    props: {
      data: {
        type: Object,
        require: true
      },
      statusClass: String,
      order: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        episodeStatus: 'unapproved',
        isExpanded: false,
        status: '',
        episode: {
          title: '',
          url: ''
        },
        itemList: [],
        files: [],
        uploadProgress: '',
        accept: 'image/png,image/gif,image/jpeg,image/webp,audio/mp3',
        size: 1024 * 1024 * 10,
        illustration: '/images/illustrations/videoAudioPosts.svg'
      }
    },
    computed: {
      toggleApprove () {},
      classes () {
        return [
          'episode-detail',
          'episode-detail__placeholder',
          {
            'is-approved': this.episodeStatus === 'approved',
            'is-unapproved': this.episodeStatus === 'unapproved',
            'is-expanded': this.isExpanded,
            'is-collapsed': !this.isExpanded,
            'is-trash': this.episodeStatus === 'trash'
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

      creating () {
        return this.$store.state.podcast.episode.creating
      },
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
//      this.episode = this.data
      this.episode = Object.assign({}, this.data)
    },
    components: {
      Card,
      FoldableCard,
      FileUpload,
      EmptyContent,
      UpdateTemplate,
      EpisodeHeader
    },
    methods: {
      toggleExpanded () {
        console.log('expnaded ......')
        this.isExpanded = !this.isExpanded
      },
      onDel () {
        this.status = 'deleting'
        this.$emit('episode-del', this.episode, this.order)
//        this.$emit('podcast_item_update', item, item.id)
      },
      async update (item) {
        this.status = 'updating'
        const data = await this.$store.dispatch('updatePodcast', this.episode)
        if (data.errno === 0) {
          this.status = ''
        }

//        this.$store.dispatch('saveEpisode', this.episode)
        this.$emit('update', this.episode, this.episode.id)
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
            // 如果不是新建就更新
            if (!this.creating) {
//              this.$store.commit('podcast/UPDATE_EPISODE')
              this.$emit('update', this.episode, this.episode.id)
            }
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

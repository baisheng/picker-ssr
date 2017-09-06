<template>
  <div>
    <card class="section-header" compact>
      <div class="section-header__label">
          <span class="section-header__label-text">
            节目列表 ({{ podcasts.length }})
        </span>
      </div>
      <div class="section-header__actions">
        <file-upload
          class="button popover-icon is-compact"
          name="file"
          post-action="http://vanq.picker.la/api/file"
          v-model="files"
          @input-file="input"
          @input-filter="inputFilter"
          :accept="accept"
          :size="size || 0"
          :headers="requestHeader"
          ref="upload" >
          <!--Add upload files-->
          <svg class="gridicon gridicons-cloud-upload" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <g>
              <path
                d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path>
            </g>
          </svg>
          批量上传
        </file-upload>

        <button class="button is-compact" >
          <svg class="gridicon gridicons-plus-small needs-offset"
               height="18" width="18" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"><g><path
            d="M18 11h-5V6h-2v5H6v2h5v5h2v-5h5"></path></g></svg>
          添加
        </button>
      </div>
    </card>
    <!--<foldable-card v-for="item in .children" :key="detailData.id" compact clickableHeader   v-dragging="{item: item, list: podcast.children}">-->
    <foldable-card :watchData="item" v-for="(item, index) in podcasts" :key="item.id" compact>
      <div class="connected-application-item__header" slot="header">

        <div class="order">
          {{ index + 1 }}.
        </div>
        <h3>{{ item.title }}</h3>
      </div>
      <button type="submit" class="button form-button is-compact is-active" slot="summary">
        发布
      </button>
      <div slot="expandedSummary" class="section-header__actions">
        <button type="button" class="button is-error is-compact is-scary">停播</button>
        <button type="button" class="button is-error is-compact" :class="uploadProgress  && item === curItem ? 'is-busy' : ''" @click.prevent="insertFile(item)">
          替换音频
        </button>
        <button type="button" class="button is-error is-compact" @click="handleClick(item)" :class="saving ? 'is-busy': ''">更新内容</button>
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
                     class="token-field__input" v-model="item.title">
            </div>
            <ul tabindex="-1" class="token-field__suggestions-list"></ul>
          </div>
        </div>
      </form>
      <div>
        <!--<card class="post-image is-placeholder is-compact"></card>-->
        <player mutex theme="#42b983" preload="metadata" mode="circulation"
                :music="item" v-if="item.url"></player>
        <div class="empty-content" v-else>
          <h2 class="empty-content__title">没有音频内容</h2>
          <h3 class="empty-content__line">是否要上传内容？</h3>
          <!--<button @click.prevent="addDirectory">Add upload directory</button>-->
          <button class="media-library__upload-button button button is-primary" @click.prevent="insertFile(item)"
                  :class="uploadProgress  && item === curItem ? 'is-busy' : ''">
              <span v-if="uploadProgress  && item === curItem">
                {{uploadProgress}}
              </span>
            <span v-else>
                上传音频
              </span>
          </button>
        </div>
      </div>
    </foldable-card>
  </div>
</template>

<script>
  import FileUpload from 'vue-upload-component/src'
  import FoldableCard from '../../foldable-card'
  import {Card} from '../../card'

  export default {
    props: {
      podcasts: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        files: [],
        uploadProgress: '',
        accept: 'image/png,image/gif,image/jpeg,image/webp,audio/mp3',
        size: 1024 * 1024 * 10,
        curItem: null
      }
    },
    components: {
      Card,
      FileUpload,
      FoldableCard
    },
    computed: {
      saving () {
        return this.$store.state.posts.item.saving
      },
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      }
    },
    methods: {
      insertFile (cur) {
        let input = this.$refs.upload.$el.querySelector('input')
        input.onclick = null
        input.click()
        this.curItem = cur
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
            let data = newFile.response.data
            this.curItem.url = data.url
            this.curItem.meta = {
              _audio_id: data.id
            }
            this.uploadProgress = ''
            this.$store.commit('posts/UPDATE_ITEM')
            this.$emit('podcast_item_update', this.curItem, this.curItem.id)
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
          var URL = window.URL || window.webkitURL
          if (URL && URL.createObjectURL) {
            newFile.blob = URL.createObjectURL(newFile.file)
          }
        }
      },
      handleClick (item) {
        this.$store.commit('posts/UPDATE_ITEM')
        this.$emit('podcast_item_update', item, item.id)
      }
    }
  }
</script>

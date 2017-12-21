<style lang="scss">
  .podcast__avatar {
    // !important necessary here since plugin-icon uses !important as well
    height: 40px !important;
    width:  40px !important;
    margin-left: 0px;
    margin-right: 12px;
  }

  .podcast__header {
    display: flex;
    h3 {
      flex: 2;
      display: block;
      overflow: hidden;
      margin-top: 8px;
    }
  }
</style>
<template>
  <foldable-card class="is-compact" expanded>
    <div class="podcast__header " slot="header">
      <div class="plugin-icon podcast__avatar animate__appear">
        <img
          class="plugin-icon__img"
          :src="authorAvatar">
      </div>
      <h3>{{ podcast.title }}</h3>
    </div>

    <div slot="summary">
      {{ title }}
    </div>
    <div slot="expandedSummary">
      <div>
        <button type="button" class="button is-error is-compact is-scary" style="margin-right: 8px;"
                @click="changeStatus('off')" v-if="podcast.status === 'publish'">下架
        </button>
        <button type="button" class="button is-primary is-compact" style="margin-right: 8px;"
                @click="changeStatus('publish')" v-else>上架
        </button>
        <file-upload
          class="button popover-icon is-compact"
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
          <svg class="gridicon gridicons-cloud-upload" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <g>
              <path
                d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path>
            </g>
          </svg>
          设置封面
        </file-upload>
      </div>
    </div>

    <div
      @click.prevent="handleClick"
      :class="classes"
      :style="collapsed ? `background-image: url(${featuredImage});` : ''"
      v-if="featuredImage">
      <button class="button editor-drawer-well__remove is-compact" type="button" @click.prevent="onRemove">
        <span class="screen-reader-text">移除</span>
        <svg class="gridicon gridicons-cross editor-drawer-well__remove-icon" height="24" width="24"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path
              d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"></path>
          </g>
        </svg>
      </button>
      <img :src="featuredImage" class="post-image__image" v-if="!collapsed"/>
    </div>
    <empty-content title="没有封面图" line="是否要设置封面图？" :illustration="illustration" v-else>
      <button class="media-library__upload-button button button is-primary"
              @click.prevent="changeCover">
              <span v-if="uploadProgress">
                {{uploadProgress}}
              </span>
        <span v-else>
                设置封面图
              </span>
      </button>
    </empty-content>
  </foldable-card>

</template>

<script>
  import FileUpload from 'vue-upload-component/src'
  import FoldableCard from '../../foldable-card'
  import EmptyContent from '../../empty-content'
  import uploadMixin from '../../../utils/helpers/upload'

  export default {
    name: 'PodcastHeader',
    mixins: [uploadMixin],
    props: {
      podcast: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        progress: 'success',
        accept: 'image/png,image/gif,image/jpeg,image/webp,audio/mp3',
        files: [],
        uploadProgress: '',
        size: 1024 * 1024 * 10,
        collapsed: true,
        illustration: '/images/media/illustration-media.svg',
        curFeaturedImage: ''
      }
    },
    computed: {
      title () {
        switch (this.podcast.status) {
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
      authorAvatar () {
        // const podcast = this.podcast
        // console.log(JSON.stringify(this.podcast) + '999')
        if (this.podcast.hasOwnProperty('author')) {
          // console.log('have author info')
          const authorInfo = this.podcast.author
          // console.log(JSON.stringify(authorInfo))
          return authorInfo.avatar
          // if (!authorInfo.hasOwnProperty('avatar')) {
          //   return '/images/people/mystery-person.svg'
          // } else {
          //   console.log('lala')
          //   return authorInfo.avatar
          // }
        } else {
          return '/images/people/mystery-person.svg'
        }
      },
      featuredImage () {
        if (this.curFeaturedImage) {
          return this.curFeaturedImage
        } else {
          this.curFeaturedImage = ''
          this.curFeaturedImage = this.podcast.featured_image
          return this.curFeaturedImage
        }
//        const imageSrc = this.curFeaturedImage
//        if (imageSrc) {
//          return imageSrc
//        } else {
//          return this.podcast.featured_image
//        }
      },
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      },
      classes () {
        return [
          'post-image',
          {
            'is-placeholder': !(this.progress === 'success'),
            'is-collapsed': this.collapsed
          }
        ]
      }
    },
    components: {
      FileUpload,
      FoldableCard,
      EmptyContent
    },
    methods: {
      async changeStatus (status) {
        const form = {
          id: this.podcast.id,
          status: status
        }
        const res = await this.$store.dispatch('updatePodcast', form)
        if (res.errno === 0) {
//          this.$router.replace('/podcasts')
        }
      },
      async onRemove () {
        this.progress = 'removing'
        // 删除封面图
        const form = {
          id: this.podcast.id,
          meta: {
            '_thumbnail_id': -1
          }
        }
        const data = await this.$store.dispatch('updatePodcast', form)
        if (data.errno === 0) {
          this.curFeaturedImage = ''
          this.progress = 'success'
        }
      },
      changeCover () {
        const input = this.$refs.upload.$el.querySelector('input')
        input.onclick = null
        input.click()
      },
      input (newFile, oldFile) {
        if (newFile && oldFile) {
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
          }
          if (newFile.success && !oldFile.success) {
            // this.success(newFile)
            const data = newFile.response.data
//            this.podcast.featured_image = data.url
            this.curFeaturedImage = data.url
            this.progress = 'success'
            const form = {
              id: this.podcast.id,
              meta: {
                '_thumbnail_id': data.id
              }
            }
            this.$store.dispatch('updatePodcast', form)
//            this.$emit('featured_image_upload', form)
          }
        }
        if (!newFile && oldFile) {
          // this.remove(oldFile)
        }
        // 自动开始
        if (newFile && !oldFile && !this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      },
      handleClick () {
        this.collapsed = !this.collapsed
      }
    }
  }
</script>

<template>

  <card :class="classes">
    <episode-detail-header
      :isBulkEdit="isBulkEdit"
      :isExpanded="isExpanded"
      @delete="onDel"
      @trash="trash"
      @toggleApprove="toggleApprove"
      @toggleExpanded="toggleExpanded"
      :status="item.status"
      :episode="episode"
      :order="order + 1"></episode-detail-header>
  </card>
</template>

<script>
  /* eslint-disable no-warning-comments */

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
      item: {
        type: Object,
        require: true
      },
      id: {
        type: String
      },
      parent: {
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
        isLoading: true,
        episode: {},
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
        if (this.episode.hasOwnProperty('author')) {
          const authorInfo = this.episode.author
          if (!authorInfo.hasOwnProperty('avatar')) {
            return '/images/people/mystery-person.svg'
          } else {
            return authorInfo.avatar
          }
        } else {
          return '/images/people/mystery-person.svg'
        }
      },
      // isLoading () {
      //   return !this.episode
      // },

      classes () {
        return [
          'episode-detail',
          {
            'episode-detail__placeholder': this.isLoading,
            'is-approved': this.item.status === 'approved',
            'is-unapproved': this.item.status === 'unapproved',
            'is-pending': this.item.status === 'unapproved',
            'is-bulk-edit': this.isBulkEdit,
            'is-expanded': this.isExpanded,
            'is-collapsed': !this.isExpanded,
            'is-trash': this.item.status === 'trash'
          }
        ]
      },
      statusTitle () {
        switch (this.item.status) {
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
        return `${baseURL}/apps/${appId}/file`
      },
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      }
    },
    mounted () {
      (async () => {
        this.episode = (await this.$axios.get(`/apps/${this.$store.getters.appId}/posts/${this.item.id}`)).data.data
        if (this.episode !== null) {
          this.isLoading = false
        }
      })()
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
        // TODO: 处理是否审核通过。。。。。。。。。
        // const status = this.episode.status
        const status = this.item.status
        // this.$emit('update', {
        //   id: this.episode.id,
        //   status: status === 'approved' ? 'approve' : 'approved',
        //   categories: [5]
        // })
        // await this.$store.dispatch('updateUser', {form: that.user})
        // changeRelatedItemStatus ....
        await this.$store.dispatch('changeEpisodeStatus', {
          pid: this.parent.id,
          episode: this.episode,
          status: status === 'approved' ? 'unapproved' : 'approved'
        })
      },
      toggleExpanded () {
        this.isExpanded = !this.isExpanded
      },
      async trash () {
        await this.$store.dispatch('changeEpisodeStatus', {
          pid: this.parent.id,
          episode: this.episode,
          status: 'trash'
        })
      },
      async onDel () {
        await this.$store.dispatch('episodeDelete', {
          pid: this.parent.id,
          episode: this.episode,
          status: 'delete'
        })
        // this.$emit('episode-del', this.episode, this.order)
      },
      update () {
        // console.log(JSON.stringify(this.episode))
        this.episode.categories = [5]
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

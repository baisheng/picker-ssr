<template>
  <div class="comment-list">
    <comment-navigation></comment-navigation>

    <span class="comment-list__transition-wrapper">
        <comment :item="item" v-for="(item, index) in list" :key="item.id" id=""></comment>
        <div class="empty-content comment-list__transition-enter-active"><img
          src="/images/comments/illustration_comments_gray.svg" width="150" class="empty-content__illustration"><h2
          class="empty-content__title">还没有评论。</h2><h3 class="empty-content__line">您的队列已清空。</h3></div>
    </span>
  </div>
</template>

<script>
  import CommentNavigation from '../comment-navigation'
  import Comment from '../comment'

  export default {
    props: {
      list: {
        type: Array,
        require: true
      },
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
      isLoading () {
        return !this.episode
      },

      classes () {
        return [
          'episode-detail',
          {
            'episode-detail__placeholder': this.isLoading,
            'is-approved': this.episode.status === 'approved',
            'is-unapproved': this.episode.status === 'unapproved',
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
      }
    },
    mounted () {
    },
    components: {
      CommentNavigation,
      Comment
      // Card,
      // FoldableCard,
      // FileUpload,
      // EmptyContent,
      // UpdateTemplate,
      // EpisodeDetailHeader
    },
    methods: {}
  }

</script>

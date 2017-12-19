<style scoped>
  .order {
    margin-right: 10px;
  }
</style>
<template>
  <div :class="classes" @click="handleFullHeaderClick">
    <episode-detail-actions v-if="isExpanded" @toggleApprove="$emit('toggleApprove')" @trash="$emit('trash')" @delete="$emit('delete')" :episodeStatus="episode.status"></episode-detail-actions>
    <div class="episode-detail__header-content" v-if="!isExpanded">
      <div class="episode-detail__author-preview">
        <div class="episode-detail__order">
          {{ order }}.
        </div>
        <label class="episode-detail__checkbox" v-if="isBulkEdit">
          <input type="checkbox" class="form-checkbox" value="on">
        </label>
        <div class="episode-detail__author-info">
          <div class="episode-detail__author-info-element u-text-bold">
            <!--<strong>-->
                {{episode.title}}
            <!--</strong>-->
          </div>
        </div>
      </div>
      <div class="episode-detail__episode-preview">
        <div class="emojify">
          {{ episode.content }}
        </div>
      </div>
    </div>
    <button class="button episode-detail__action-collapse is-borderless" type="button" v-if="!isBulkEdit">
      <svg class="gridicon gridicons-chevron-down" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24">
        <g>
          <path d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path>
        </g>
      </svg>
    </button>
  </div>

</template>

<script>
  import EpisodeDetailActions from './episode-detail-actions.vue'

  export default {
    components: {
      EpisodeDetailActions
    },
    props: {
      episode: {
        type: Object,
        required: true
      },
      isExpanded: {
        type: Boolean,
        default: false
      },
      isBulkEdit: {
        type: Boolean,
        default: false
      },
      order: {
        type: Number
      }
    },
    computed: {
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
      classes () {
        return [
          'episode-detail__header',
          {
            'is-preview': !this.isExpanded
          }
        ]
      }
    },
    methods: {
      noop: () => {
        return undefined;
      },
      handleFullHeaderClick (event) {
        console.log('handle header ...')
//        if (this.isExpanded) {
//          return this.noop()
//        }
        return this.isBulkEdit ? this.$emit('toggleSelected', event) : this.toggleExpanded()
      },
      toggleExpanded (event) {
        this.$emit('toggleExpanded', event)
      }
    }
  }
</script>

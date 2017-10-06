<template>
  <div :class="classes" @click="handleFullHeaderClick">
    <div class="episode-detail__header-content" v-if="!isExpanded">
      <div class="episode-detail__author-preview">
        <label class="episode-detail__checkbox">
          <input type="checkbox" class="form-checkbox" value="on">
        </label>
        <div class="episode-detail__author-avatar">
          <img alt="bluepx" class="gravatar"
               src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=96&amp;d=mm&amp;r=G"
               width="32" height="32"></div>
        <div class="episode-detail__author-info">
          <div class="episode-detail__author-info-element"><strong>
            <div class="emojify">bluepx</div>
          </strong><span><div class="emojify">bluepx.wordpress.com</div></span></div>
          <div class="episode-detail__author-info-element">
            <div class="emojify">Blog post title 上</div>
          </div>
        </div>
      </div>
      <div class="episode-detail__episode-preview">
        <div class="emojify">这是一条评论，是我自己写的
        </div>
      </div>
    </div>
    <button class="button episode-detail__action-collapse is-borderless" type="button" v-if="!isBulkEdit" @click="toggleExpanded">
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
  export default {
    props: {
      isExpanded: {
        type: Boolean
      },
      isBulkEdit: {
        type: Boolean,
        default: false
      }
    },
    computed: {
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
      handleFullHeaderClick () {
      },
      toggleExpanded (event) {
        this.$emit('toggleExpanded', event)
      }
    }
  }
</script>

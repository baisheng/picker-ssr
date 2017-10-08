<template>
  <div class="episode-detail__actions">
    <button class="button comment-detail__action-approve is-borderless" :class="isApproved ? 'is-approved ': ''" type="button"
            @click="$emit('toggleApprove')">
      <svg class="gridicon gridicons-checkmark" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-if="!isApproved"><g><path d="M9 19.414l-6.707-6.707 1.414-1.414L9 16.586 20.293 5.293l1.414 1.414"></path></g></svg>
      <svg class="gridicon gridicons-checkmark-circle" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24" v-else>
        <g>
          <path
            d="M11 17.768l-4.884-4.884 1.768-1.768L11 14.232l8.658-8.658C17.823 3.39 15.075 2 12 2 6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10c0-1.528-.353-2.97-.966-4.266L11 17.768z"></path>
        </g>
      </svg>
      <span v-if="isApproved">
        已审核
        <!--{{ translate(episodeStatus)}}-->
      </span>
      <span v-else>
        批准
      </span>
    </button>
    <!--
    <button class="button comment-detail__action-edit is-borderless" type="button">
      <svg class="gridicon gridicons-pencil" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24">
        <g>
          <path
            d="M13 6l5 5-9.507 9.507c-.686-.686-.69-1.794-.012-2.485l-.002-.003c-.69.676-1.8.673-2.485-.013-.677-.677-.686-1.762-.036-2.455l-.008-.008c-.694.65-1.78.64-2.456-.036L13 6zm7.586-.414l-2.172-2.172c-.78-.78-2.047-.78-2.828 0L14 5l5 5 1.586-1.586c.78-.78.78-2.047 0-2.828zM3 18v3h3c0-1.657-1.343-3-3-3z"></path>
        </g>
      </svg>
      <span>编辑</span>
    </button>
    -->
    <button class="button comment-detail__action-trash is-borderless" type="button" @click="$emit('trash')" v-if="!isTrash">
      <svg class="gridicon gridicons-trash" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24">
        <g>
          <path
            d="M6.187 8h11.625l-.695 11.125C17.05 20.18 16.177 21 15.12 21H8.88c-1.057 0-1.93-.82-1.997-1.875L6.187 8zM19 5v2H5V5h3V4c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2v1h3zm-9 0h4V4h-4v1z"></path>
        </g>
      </svg>
      <span>回收站</span>
    </button>

    <button class="button comment-detail__action-trash is-borderless is-scary" type="button" @click="$emit('delete')" v-if="isTrash">
      <svg class="gridicon gridicons-trash" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24">
        <g>
          <path
            d="M6.187 8h11.625l-.695 11.125C17.05 20.18 16.177 21 15.12 21H8.88c-1.057 0-1.93-.82-1.997-1.875L6.187 8zM19 5v2H5V5h3V4c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2v1h3zm-9 0h4V4h-4v1z"></path>
        </g>
      </svg>
      <span>永久删除</span>
    </button>
  </div>

</template>

<script>
  import {includes} from 'lodash';

  const episodeActions = {
    unapproved: ['like', 'approve', 'trash'],
    approved: ['like', 'approve', 'trash'],
    trash: ['approve', 'delete'],
  };
  const hasAction = (status, action) => includes(episodeActions[status], action)
  export default {
    props: {
      episodeStatus: {
        type: String
//        validator (value) {
//          return hasAction(value, ['click', 'focus', 'hover'])
//        }
      }
    },
    computed: {
      isApproved () {
        return this.episodeStatus === 'approved'
      },
      isTrash () {
        return this.episodeStatus === 'trash'
      }
    },
    methods: {
//      toggleApprove () {
//        this.$emit('toggleApprove')
//      },
//      hasAction: (status, action) => includes(episodeActions[status], action),
      translate (title) {
        switch (title) {
          case 'approved': {
            return '已审核'
          }
          case 'approve': {
            return '批准'
          }
          case 'edit': {
            return '编辑'
          }
          case 'trashed': {
            return '已回收'
          }
          case 'trash': {
            return '回收站'
          }
          default:
            break
        }
      }
    }
  }
</script>

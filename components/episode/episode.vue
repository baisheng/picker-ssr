<template>
  <foldable-card compact :class="statusClass">
    <div class="connected-application-item__header" slot="header">

      <div class="order">
        {{ order }}.
      </div>
      <h3>{{ episode.title }}</h3>
    </div>
    <div slot="summary">
      <button type="submit" class="button form-button is-compact is-active">
        发布
      </button>
      <button type="submit"
              class="button form-button is-compact is-scary"
              :class="postState.deleting && item.id === curIndex ? 'is-busy' : ''"
              @click="del(index, item)">
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
    <div slot="expandedSummary" class="section-header__actions">
      <button type="button" class="button is-error is-compact is-scary" @click="del(index, item)">停播</button>
      <button type="button" class="button is-error is-compact"
              :class="uploadProgress  && item === curItem ? 'is-busy' : ''" @click.prevent="insertFile(item)">
        替换音频
      </button>
      <button type="button" class="button is-error is-compact" @click="handleClick(item)"
              :class="saving ? 'is-busy': ''">更新内容
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
</template>

<script>
  import FileUpload from 'vue-upload-component/src'
  import FoldableCard from '../foldable-card'

  export default {
    props: {
      episode: {
        type: Object,
        require: true
      },
      statusClass: String,
      order: {
        type: Number,
        default: 1
      }
    },
    components: {
      FoldableCard,
      FileUpload
    }
  }
</script>

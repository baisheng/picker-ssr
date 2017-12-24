<template>
  <div class="episode-list">
    <div class="section-nav episode-navigation" v-if="!creating">

      <div class="section-nav__mobile-header">
        <span class="section-nav__mobile-header-text">全部</span></div>
      <div class="section-nav__panel ">
        <div class="section-nav-group">
          <div class="section-nav-tabs">
            <ul class="section-nav-tabs__list" role="menu">
              <li class="section-nav-tab" :class="{'is-selected':selected === item.id}" v-for="(item, index) in navList"
                  :key="item.id">
                <a @click="load(item)"
                   class="section-nav-tab__link" tabindex="0" role="menuitem">
                  <span class="section-nav-tab__text">
                    {{ item.title }}
                  </span>
                </a>
              </li>

            </ul>
          </div>
        </div>
        <div class="section-header__actions">

          <file-upload
            class="button popover-icon is-compact"
            name="file"
            :multiple="true"
            :drop="true"
            :drop-directory="true"

            :post-action="uploadAction"
            v-model="files"
            @input-file="input"
            @input-filter="inputFilter"
            :accept="accept"
            :size="size || 0"
            :headers="requestHeader"
            ref="upload" v-show="!creating">
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

          <button class="button is-compact" @click="create" v-if="!creating">
            <svg class="gridicon gridicons-plus-small needs-offset"
                 height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g>
                <path
                  d="M18 11h-5V6h-2v5H6v2h5v5h2v-5h5"></path>
              </g>
            </svg>
            添加
          </button>
          <div class="button-group" v-else>
            <button class="button is-compact is-primary" @click="create">
              发布
            </button>
            <button class="button is-compact" @click="cancel">
              取消
            </button>
          </div>
        </div>
        <div class="episode-navigation__tab episode-navigation__actions episode-navigation__open-bulk">
          <button type="button" class="button is-compact">批量3编辑</button>
        </div>
      </div>
    </div>
    <episode-form
      v-if="creating"
      :parent="parent"
      :sort="data.data.length + 1"
      @addEpisode="push"
      @cancel="cancel"
      @updateAudio="updateAudio"></episode-form>
    <div v-if="files.length" class="u-mb-medium">
      <card class="episode-detail is-uploading" v-for="(file, index) in files" :key="file.id" :class="file.error ? 'is-upload__error' : ''">

        <div class="episode-detail__header is-preview"><!---->
          <div class="episode-detail__header-content">
            <div class="episode-detail__author-preview">
              <div class="episode-detail__order u-text-mute" style="width: 80px;">
                {{file.size | formatSize}}
              </div>
              <div class="episode-detail__author-info">
                <div class="episode-detail__author-info-element">
                  {{file.name}}
                </div>
              </div>
            </div>
            <div class="episode-detail__episode-preview">
              <span v-if="file.error" class="u-text-danger u-text-middle">
                <svg class="gridicon gridicons-notice" height="18" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm0-4h-2l-.5-6h3l-.5 6z"></path></g></svg>
                {{file.error}}</span>
              <div class="emojify u-text-success u-text-small" v-else>
                {{file.progress}}%
              </div>
            </div>
          </div>
          <button v-if="file.error" class="button episode-detail__action-collapse is-borderless">
            <svg class="gridicon gridicons-cross" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"></path></g></svg>
          </button>
          <div class="episode-detail__action-collapse u-align-items-center u-justify-center u-pd-auto" style="width: 60px;" v-else>
            <hr class="spinner-line u-m-auto" v-if="file.active || file.progress !== '0.00'" :style="{width: file.progress + '%'}">
            <span class="u-text-mute u-text-middle" v-else>队列</span>
            <span v-if="file.success" class="u-text-success">上传成功</span>
          </div>

        </div>
      </card>
    </div>

    <span class="episode-list__transition-wrapper">

      <draggable v-model="myList">
        <episode-item :key="item.id" v-for="(item, index) in myList"
                      :order="myList.length - index-1"
                      :item="item"
                      :parent="parent"
                      @episode-del="del"
                      @update="updateEpisode" v-if="!creating"></episode-item>
        <!--<div class="card u-bg-behance" v-for="(item, index) in parent.items" :key="item">{{item}}</div>-->
      </draggable>
    </span>

    <empty-content title="节目列表为空，添加内容？" v-show="episodeList.length < 0">
      <button class="button is-primary" style="margin-top: 10px;" @click="create" slot="action">
        <svg class="gridicon gridicons-plus-small needs-offset"
             height="18" width="18" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <g>
            <path
              d="M18 11h-5V6h-2v5H6v2h5v5h2v-5h5"></path>
          </g>
        </svg>
        <span>添加</span>
      </button>
      <!--<slot name="action"></slot>-->
    </empty-content>
    <!--    <div class="u-mt-large u-text-center u-justify-center">
          <button class="button is-link is-long" @click="$emit('loadmore')" :disabled="!canLoadMore">
            <span v-if="canLoadMore">载入更多...</span>
            <span v-else-if="!canLoadMore">已载入全部</span>
          </button>
        </div>-->
  </div>
</template>
<style lang="scss">
  @-webkit-keyframes twinkling{	/*透明度由0到1*/
    0%{
      opacity:0;				/*透明度为0*/
    }
    100%{
      opacity:1;				/*透明度为1*/
    }
  }
  .is-upload__error {
    box-shadow: inset 4px 0 0 0 #F26175, 0 0 0 1px transparentize(lighten(#87A6BC, 20%), 0.5),
    0 1px 2px lighten(#87A6BC, 30%);
  }
  @keyframes spinner-line__animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 600px 0;
    }
  }

  hr.spinner-line {
    border: none;
    height: 3px;
    /*margin: 24px 0;*/
    background-image: linear-gradient(
        to right,
        lighten(#4ab866, 10%) 0%,
        lighten(#4ab866, 20%) 50%,
        lighten(#4ab866, 10%) 100%
    );
    background-size: 300px 100%;
    animation: spinner-line__animation 1.2s infinite linear;
  }

  /*
    .animate-box {
      opacity: 0;
    }
  */

  .fadeInUp {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
  }

  /*.animated-fast {*/
  /*-webkit-animation-duration: .5s;*/
  /*animation-duration: .5s;*/
  /*-webkit-animation-fill-mode: both;*/
  /*animation-fill-mode: both;*/
  /*}*/

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      visibility: hidden;
      -webkit-transform: translate3d(0, 40px, 0);
      transform: translate3d(0, 40px, 0);
    }
    100% {
      visibility: visible;
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
    animation-name: fadeInUp;

  }

  .slide-fade-leave-active {
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateX(0px);
    opacity: 0;
  }

  .dragging {
    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.10);
    font-weight: 900;

    border: 1px dashed #1d2531;
    /*background: rgba(255, 255, 255, 0.8);*/
    /*font-size: 12px;*/
    /*line-height: 52px;*/
    /*text-align: center;*/
    transition: all 0.3s;
    /*cursor: pointer;*/
    /*z-index: z-index( 'root', 3 );*/
  }
</style>
<script>
  /* eslint-disable no-trailing-spaces,indent,no-extra-parens,no-warning-comments,no-warning-comments */
  import draggable from 'vuedraggable'
  import FileUpload from 'vue-upload-component/src'
  import FoldableCard from '../foldable-card'
  import {Card} from '../card'
  import EpisodeDetail from '../episode-detail'
  import EpisodeItem from '../episode-detail/episode-item'
  import EpisodeForm from '../episodes/episode-form'
  import EmptyContent from '~/components/empty-content'
  import {find} from 'lodash'
  import _ from 'lodash'

  export default {
    props: {
      data: {
        type: Object,
        required: true
      },
      episodeList: {
        type: Array
      },
      parent: {
        type: Object,
        required: true
      }
    },

    data () {
      return {
        selected: 1,
        navList: [
          {id: 1, name: 'all', title: `全部( ${this.data.count} )`},
          {id: 2, name: 'unapproved', title: `未审核`},
          {id: 3, name: 'approved', title: '已审核'},
          {id: 4, name: 'trash', title: '回收站'}],
        isBulkEdit: false,
        creating: false,
        action: '',
        newItem: {
          title: '无标题'
        },
        toItem: null,
        itemList: [],
//        episodeList: [],
        files: [],
        uploadProgress: '',
        accept: 'audio/mp3, audio/x-m4a, audio/m4a',
        size: 1024 * 1024 * 20,
        curItem: {
          title: ''
        },
        curIndex: -1,
        episode: {
          title: '无标题',
          status: 'draft',
          content: '',
          children: []
        },
        post: {
          title: '无标题',
          status: 'draft'
        }
        // myList: _.cloneDeep(this.$store.getters.getEpisodeList)
      }
    },
    mounted () {
      this.$dragging.$on('dragged', ({value, draged, to}) => {
        // console.log(JSON.stringify(draged))
        this.myList = value.list
        // const myList = value.list.splice()
        // console.log(JSON.stringify(myList))
        this.updateEpisode({
          id: draged.id,
          // status: draged.status,
          categories: [5],
          sort: to.sort
        })
        this.updateEpisode({
          id: to.id,
          // status: draged.status,
          categories: [5],
          sort: draged.sort + to.sort
        })

        // commit('podcast/GET_EPISODE_LIST_SUCCESS', data.data)

        /*
        this.$store.dispatch('updatePodcast', {
          id: draged.id,
          sort: to.sort
        })
        this.$store.dispatch('updatePodcast', {
          id: to.id,
          sort: draged.sort
        })
        */
      })
      this.$dragging.$on('dragend', () => {
      })
    },
    components: {
      draggable,
      Card,
      FileUpload,
      FoldableCard,
      EpisodeDetail,
      EpisodeItem,
      EpisodeForm,
      EmptyContent
    },
    computed: {
      canLoadMore () {
        const {currentPage, totalPages} = this.data
        const hasEpisodes = true
        return hasEpisodes ? (currentPage < totalPages) : false
      },
      myList: {
        get () {
          return this.$store.getters.getEpisodeList
        },
        set (value) {
          this.$store.dispatch('updatePodcastItems', {id: this.parent.id, items: value})
        }
      },
      uploadAction () {
        const appId = this.$store.getters.appId
        const baseURL = process.env.baseURL
        return `${baseURL}/apps/${appId}/file`
      },
      unapprove () {
        let count = 0
        this.episodeList.forEach((v) => {
          if (v.status !== 'approved') {
            count++
          }
        })
        return count
      },
      episodeCount () {
        // TODO 新添加后会出现 count 找不到的 error
        // if (this.podcast.children.count) {
        //   return this.podcast.children.count
        // } else {
        //   return 0
        // }
      },
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      }
    },
    methods: {
      onUpdate (e) {
        this.list.splice(e.newIndex, 0, this.list.splice(e.oldIndex, 1)[0]);
        // this.$emit('reorder', {
        //   oldIndex: e.oldIndex,
        //   newIndex: e.newIndex,
        // })
      },
      onMove ({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        // console.log(relatedElement)
        // console.log(draggedElement)
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      },
      onEnd (evt) {
        // this.updateEpisode({
        //   id: draged.id,
        //   status: draged.status,
        // categories: [5],
        // sort: to.sort
        // })
        // this.updateEpisode({
        //   id: evt.item.id,
        // status: draged.status,
        // categories: [5],
        // sort: evt.newIndex
        // })
        // console.log(evt.item.id)
        // console.log(evt, evt.to, evt.from, evt.oldIndex, evt.newIndex);
      },
      async load (item) {
        this.selected = item.id
        // await this.$store.dispatch('getEpisodeList', {parent: this.parent.id, status: item.name})
        this.$store.commit('podcast/FILTER_EPISODES', item.name)
        // this.$emit('load', {parent: this.parent.id, status: item.name})
        // this.$emit('load', {parent: this.parent.id, status: item.name})
      },
      getStatusClass (status) {
// eslint-disable-next-line default-case
        switch (status) {
          case 'auto-draft':
            return 'is-warning'
          case 'draft':
            return 'is-warning'
          case 'delete':
            return 'is-danger'
          case 'publish':
            return ''
        }
      },
      del (item, index) {
        this.curIndex = index
        this.$store.dispatch('episodeDelete', {id: item.id, axios: this.$axios})
      },
      push (newEpisode) {
        this.episodeList.push(newEpisode)
      },
//      async saveEpisode (episode) {
//
//      },
      async updateAudio (episode, id) {
        await this.$axios.post(`/apps/${this.$store.getters.appId}/posts/${episode.id}`, episode)
        // eslint-disable-next-line prefer-const
        let obj = find(this.episodeList, {id: episode.id})
        obj.url = episode.url
      },
      async updateEpisode (episode, id) {
        if (!id) {
          id = episode.id
        }
        const data = await this.$axios.post(`/apps/${this.$store.getters.appId}/posts/${id}`, episode)
        if (data.errno > 0) {
          this.$toast.error('操作失败')
        } else {
          this.$toast.success('内容已更新')
        }
      },
      // 创建节目 episode
      create () {
        this.creating = true
      },
      cancel () {
        this.creating = false
      },

      insertFile (cur) {
        const input = this.$refs.upload.$el.querySelector('input')
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
            // if (newFile.size >= 0 && newFile.size < 200 * 1024) {
            //   newFile = this.$refs.upload.update(newFile, {error: '不能超过 10M'})
            // }
          }
          if (newFile.progress !== oldFile.progress) {
            this.uploadProgress = newFile.progress
          }
          if (newFile.error && !oldFile.error) {
            // this.error(newFile)
            if (newFile.error === 'size') {
              newFile.error = '文件超出 20MB 限制'
            }
            console.log('error', newFile.error, newFile.response)
            // if (newFile.size >= 0 && newFile.size < 100 * 1024) {
            //   newFile = this.$refs.upload.update(newFile, {error: '不能超过 10M'})
            // }
          }
          if (newFile.success && !oldFile.success) {
            // this.success(newFile)
            const data = newFile.response.data
            this.uploadProgress = ''
            const newEpisode = {
              title: newFile.name.substring(0, newFile.name.lastIndexOf('.')),
              author: this.parent.author.id,
              parent: this.parent.id,
              relateStatus: 'unapproved',
              category: '5',
              relateTo: this.parent.id,
              meta: {
                _audio_id: data.id
              }
            }
            const res = this.$store.dispatch('episodeCreate', newEpisode)
            this.$refs.upload.remove(newFile)
          }
        }
        if (!newFile && oldFile) {
          // this.remove(oldFile)
          // console.log('remove', oldFile)
        }
        // 自动上传
        if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
          if (!this.$refs.upload.active) {
            this.$refs.upload.active = true
          }
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

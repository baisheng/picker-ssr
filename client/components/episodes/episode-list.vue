<template>
  <div class="episode-list">
    <div class="card header-cake is-compact" v-if="creating">
      <button class="button header-cake__back is-compact is-borderless" type="button" @click="cancel">
        <svg class="gridicon gridicons-arrow-left needs-offset-y" height="18" width="18"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </g>
        </svg><!-- react-text: 665 -->返回<!-- /react-text -->
      </button>
      <div class="header-cake__title">添加节目</div>

      <button class="button header-cake__back  disabled is-compact is-borderless" type="button">
        已保存为草稿
      </button>
    </div>
    <div class="section-nav episode-navigation" v-if="!creating">

      <div class="section-nav__mobile-header">
        <span class="section-nav__mobile-header-text">全部</span></div>
      <div class="section-nav__panel ">
        <div class="section-nav-group">
          <div class="section-nav-tabs">
            <ul class="section-nav-tabs__list" role="menu">
              <li class="is-selected section-nav-tab">
                <a href="/comments/all/bluepx.wordpress.com"
                   class="section-nav-tab__link" tabindex="0"
                   aria-selected="true" role="menuitem"><span
                  class="section-nav-tab__text">
                  全部节目 ({{ podcast.children.length }})
                </span></a></li>
              <li class="section-nav-tab">
                <a href="/comments/pending/bluepx.wordpress.com"
                   class="section-nav-tab__link" tabindex="0" aria-selected="false"
                   role="menuitem"><span class="section-nav-tab__text">
                  {{ unapprove }} 条未审核
                  <!-- /react-text --></span></a></li>
              <li class="section-nav-tab"><a href="/comments/approved/bluepx.wordpress.com"
                                             class="section-nav-tab__link" tabindex="0" aria-selected="false"
                                             role="menuitem"><span class="section-nav-tab__text"><!-- react-text: 10750 -->已发布
                <!-- /react-text --></span></a></li>
              <li class="section-nav-tab"><a href="/comments/trash/bluepx.wordpress.com" class="section-nav-tab__link"
                                             tabindex="0" aria-selected="false" role="menuitem"><span
                class="section-nav-tab__text"><!-- react-text: 10758 -->回收站<!-- /react-text --></span></a></li>
            </ul>
          </div>
        </div>
        <div class="section-header__actions">
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
    <transition name="slide-fade" mode="out-in">
      <episode-form v-if="creating" :parent="podcast.id" :sort="podcast.children.length + 1"></episode-form>
    </transition>
    <span class="episode-list__transition-wrapper" v-if="episodeList.length > 0">
      <episode :key="item.name" v-for="(item, index) in episodeList"
               class="episode-detail is-approved is-collapsed"
               :order="index"
               :data="item"
               v-dragging="{item: item, list: episodeList}"
               @episode-del="del" @update="update" v-show="!creating"></episode>
    </span>
    <empty-content title="节目列表为空，添加内容？" v-else>
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
  </div>
</template>
<style lang="scss">
  .animate-box {
    opacity: 0;
  }

  .fadeInUp {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
  }

  .animated-fast {
    -webkit-animation-duration: .5s;
    animation-duration: .5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

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
    /*transition: all .3s ease;*/
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
    /*animation-name: shake;*/
    /*animation-duration: 0.07s;*/
    /*animation-iteration-count: infinite;*/
    /*animation-direction: alternate;*/
    /*position: relative;*/
    /*background-color: #fafbfc;*/
    /*margin: 14px;*/
    /*height: 52px;*/
    /*width: 52px;*/
    /*border-radius: 10px;*/
    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.10);
    /*color: #777;*/
    font-weight: 900;

    border: 1px dashed #ccc;
    /*background: rgba(255, 255, 255, 0.8);*/
    /*font-size: 12px;*/
    /*line-height: 52px;*/
    /*text-align: center;*/
    transition: all 0.3s;
    /*cursor: pointer;*/
  }
</style>
<script>
  /* eslint-disable no-trailing-spaces,indent */

  import FileUpload from 'vue-upload-component/src'
  import FoldableCard from '../foldable-card'
  import {Card} from '../card'
  import Episode from '../episode'
  import EpisodeForm from '../episodes/episode-form'
  import EmptyContent from '~/components/empty-content'

  export default {
    props: {
      podcast: {
        type: Object,
        required: true
      }
    },

    data () {
      return {
        creating: false,
        action: '',
        newItem: {
          title: '无标题'
        },
        toItem: null,
        itemList: [],
        episodeList: [],
        files: [],
        uploadProgress: '',
        accept: 'image/png,image/gif,image/jpeg,image/webp,audio/mp3',
        size: 1024 * 1024 * 10,
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
      }
    },
    mounted () {
      // 如果是创建了内容
//      this.curItem = this.post
      this.$nextTick(() => {
        console.log('next tick for episode list')
//        this.episodeList = Array.from(this.podcast.children)
        this.episodeList = [...this.podcast.children]
//        console.log(JSON.stringify(this.episodeList))
//        if (!Object.is(this.podcast.children, undefined)) {
//          this.episodeList = this.podcast.children
//          this.episodeList = Array.from(this.podcast.children)
//          this.episodeList = this.podcast.children.splice()
//          console.log(JSON.stringify(this.episodeList))
        // eslint-disable-next-line prefer-reflect
//          this.episodeList.apply(this.podcast.children)
//          this.episodeList.push(this.podcast.children)
//          this.episodeList.fill(this.podcast.children)
//          this.episodeList = [...this.podcast.children]
//          this.episodeList = this.podcast.children.slice()
//          this.episodeList.push.apply(this.podcast.children)
//            = Object.assign({}, this.podcast.children)
//          this.itemList = this.podcast.children
//        }
      })

      this.$dragging.$on('dragged', ({value, draged, to}) => {
        this.episodeList = value.list
//        this.$store.commit('podcast/SET_EPISODE_LIST', value.list)

//        this.curItem = draged
//        console.log(value.item.id)
//        // eslint-disable-next-line prefer-const
//        let _curSort = draged.sort
//        console.log(draged.sort + ' - draged')
//        console.log(to.sort + ' - to')
//        this.curItem.sort = to.sort
//        to.sort = _curSort
//        this.toItem = to
// eslint-disable-next-line no-undef
        this.$store.dispatch('updatePodcast', {
          id: draged.id,
          sort: to.sort
        })
        this.$store.dispatch('updatePodcast', {
          id: to.id,
          sort: draged.sort
        })
        // 更新排序
//        this.$emit('podcast_item_update', {
//          id: draged.id,
//          sort: to.sort
//        })
//        this.$emit('podcast_item_update', {
//          id: to.id,
//          sort: draged.sort
//        })
//        this.$emit('podcast_item_update', this.curItem, this.curItem.id)
//        this.$emit('podcast_item_update', to, to.id)
      })
      this.$dragging.$on('dragend', () => {
      })
    },
    components: {
      Card,
      FileUpload,
      FoldableCard,
      Episode,
      EpisodeForm,
      EmptyContent
    },
    computed: {
      uploadAction () {
        const appId = this.$store.getters.appId
        const baseURL = process.env.baseURL
        return `${baseURL}/app/${appId}/file`
      },
//      episodeList () {
//        return [...this.$store.state.podcast.detail.data.children]
//      },
      episode1List: {
        get () {
          return [...this.podcast.children]
        },
        set (newValue) {
          this.$store.commit('podcast/SET_EPISODE_LIST', newValue)
        }
      },
      unapprove () {
        let count = 0
        this.episodeList.forEach((v) => {
          if (v.status !== 'publish') {
            count++
          }
        })
        return count
      },
//      status: {
//        get () {
//        }
//      },
      episodeCount () {
        if (this.podcast.children.count) {
          return this.podcast.children.count
        } else {
          return 0
        }
      },
//      creating () {
//        return this.$store.state.podcast.episode.creating
//      },
//      saving () {
//        return this.$store.state.posts.item.saving
//      },
      episodeState () {
        return this.$store.state.podcast.episode
      },
//      episodeId () {
//        return this.$store.state.podcast.episode.id
//      },
//      postId () {
//        return this.$store.state.posts.post.data.id
//      },
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      }
    },
    watch: {
      'post': {
        handler (val, oldVal) {
          console.log(val)
        },
        deep: true
      },
      'podcast.children': {
        handler (val, oldVal) {
//          console.log(val)
          this.episodeList = [...this.podcast.children]
        }
      },
      'episodeState': {
        handler (val, oldVal) {
          if (val.del === 'success') {
//            this.podcast.children.splice(this.curIndex, 1)
          }
        },
        deep: true
      }
//      'episodeId': {
//        handler (val, oldVal) {
//          console.log('lalala')
//          this.episode.id = val
//          this.podcast.children.push(this.episode)
//          console.log(val)
//          this.$store.commit('podcast/PUSH_EPISODE', this.episode)
//        },
//        deep: true
//      }
    },
    methods: {
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
      save (e) {
        console.log()
//        this.$emit('podcast_item_update', this.episode, this.episode.id)
      },
      del (item, index) {
//        console.log('del action...')
//        console.log(JSON.stringify(item))
        this.curIndex = index
        this.$store.dispatch('episodeDelete', {id: item.id, axios: this.$axios})
      },
      update (episode, id) {
        this.$emit('podcast_item_update', episode, id)
      },
      // 创建节目 episode
      create () {
//        this.action = 'create'
        this.creating = true
//        const _sort = this.podcast.children.length + 1
//        const newEpisode = {title: '无标题', parent: this.podcast.id, sort: _sort, status: 'draft'}
//        const res = this.$store.dispatch('episodeCreate', newEpisode)
//        this.episode = Object.assign({}, newEpisode)
//        this.episode.id = res
      },
      cancel () {
        this.creating = false
//        this.$store.commit('podcast/CREATE_EPISODE_CANCEL')
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
            this.curItem.url = data.url
            this.curItem.meta = {
              _audio_id: data.id
            }
            this.uploadProgress = ''
            // 如果不是新建就更新
            if (!this.creating) {
              this.$store.commit('posts/UPDATE_ITEM')
              this.$emit('podcast_item_update', this.curItem, this.curItem.id)
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

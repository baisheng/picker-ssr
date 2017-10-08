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
    <!--<transition name="slide-fade" mode="out-in">-->
    <episode-form v-if="creating" :parent="parent" :sort="episodeList.length + 1" @addEpisode="push"
                  @cancel="cancel" @updateAudio="updateAudio"></episode-form>
    <!--</transition>-->

    <span class="episode-list__transition-wrapper">
      <!-- Key 如果有问题会拖拽失败 -->
      <episode-detail :key="item.id" v-for="(item, index) in episodeList"
                      :order="index"
                      :episode="item"
                      v-dragging="{item: item, list: episodeList}"
                      @episode-del="del" @update="updateEpisode" v-if="!creating">
      </episode-detail>
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
  import EpisodeDetail from '../episode-detail'
  import EpisodeForm from '../episodes/episode-form'
  import EmptyContent from '~/components/empty-content'
  import {find} from 'lodash'

  export default {
    props: {
      episodeList: {
        type: Array
      },
//      parent: {
//        type: Number,
//        required: true
//      },
      parent: {
        type: Object,
        required: true
      }
    },

    data () {
      return {
        selected: 1,
        navList: [
          {id: 1, name: '', title: `全部节目( ${this.episodeList.length} )`},
          {id: 2, name: 'approve', title: `未审核`},
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
      this.$dragging.$on('dragged', ({value, draged, to}) => {
        this.episodeList = value.list
        this.updateEpisode({
          id: draged.id,
          sort: to.sort
        })
        this.updateEpisode({
          id: to.id,
          sort: draged.sort + to.sort
        })
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
      Card,
      FileUpload,
      FoldableCard,
      EpisodeDetail,
      EpisodeForm,
      EmptyContent
    },
    computed: {
//      episodeList: {
//        get () {
//          this.itemList = [...this.list]
//          return this.itemList
//        },
//        set (value) {
//          this.itemList = value
//        }
//      },
      uploadAction () {
        const appId = this.$store.getters.appId
        const baseURL = process.env.baseURL
        return `${baseURL}/app/${appId}/file`
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
        if (this.podcast.children.count) {
          return this.podcast.children.count
        } else {
          return 0
        }
      },
      episodeState () {
        return this.$store.state.podcast.episode
      },
      requestHeader () {
        return {'Authorization': 'Bearer ' + this.$store.state.token}
      }
    },
    methods: {
      load (item) {
        this.selected = item.id
        this.$emit('load', {parent: this.parent.id, status: item.name})
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
//        this.$nextTick(() => {
        this.episodeList.push(newEpisode)
//        })
      },
//      async saveEpisode (episode) {
//
//      },
      async updateAudio (episode, id) {
        await this.$axios.put(`/app/${this.$store.getters.appId}/posts/${episode.id}`, episode)
        // eslint-disable-next-line prefer-const
        let obj = find(this.episodeList, {id: episode.id})
        obj.url = episode.url
      },
      async updateEpisode (episode, id) {
        if (!id) {
          id = episode.id
        }
        await this.$axios.put(`/app/${this.$store.getters.appId}/posts/${id}`, episode)
//        this.$emit('podcast_item_update', episode, id)
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

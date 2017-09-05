<template>
  <main data-reactroot="" class="connected-applications main" role="main">

    <!--{{ podcast }}-->
    <header-cake @click="test" @click-title="test" isCompact>
      添加内容
    </header-cake>
    <foldable-card class="is-compact">
      <div class="connected-application-item__header" slot="header">
        <div class="plugin-icon connected-application-icon">
          <img
            class="plugin-icon__img"
            src="https://i0.wp.com/wpcom.files.wordpress.com/2016/01/icon300px.png?w=100">
        </div>
        <h3>{{ podcast.title }}</h3>
      </div>
      <button type="submit" class="button form-button is-compact is-active" slot="summary">
        发布
      </button>
      <div slot="expandedSummary">
        <button type="button" class="button is-error is-compact is-scary">下架</button>
      </div>
    </foldable-card>
    <div class="card">
      <div>
        <form>
          <div role="group" class="invite-people__token-field-wrapper">
            <label class="form-label">
              标题
            </label>
            <div class="token-field" tabindex="-1">
              <div class="token-field__input-container" tabindex="-1">
                <input type="text"
                       autocapitalize="none"
                       autocomplete="off"
                       value=""
                       placeholder="请输入标题"
                       size="1"
                       class="token-field__input"
                       v-model="podcast.title">
              </div>
              <ul class="token-field__suggestions-list" tabindex="-1"></ul>
            </div>
          </div>
          <fieldset class="form-fieldset">
            <!-- react-empty: 3841 --><!-- react-empty: 3842 -->
            <label for="role" class="form-label">
              作者
            </label>
            <select id="role" name="role" class="form-select">
              <option value="administrator">Basil(佰晟）</option>
              <option value="editor">叶青</option>
              <option value="author">亚南</option>
              <option value="contributor">贡献者</option>
              <option value="follower">粉丝</option>
            </select>
            <p class="form-setting-explanation">
              <a target="_blank" rel="noopener noreferrer"
                 href="http://en.support.wordpress.com/user-roles/">
                <icon name="plus" class="gridicon"></icon>
                添加作者
              </a>
            </p>
          </fieldset>
          <fieldset class="form-fieldset">
            <label for="message" class="form-label">
              内容介绍
            </label>
            <div class="counted-textarea">
              <textarea name="message" id="message" maxlength="500" placeholder=""
                        class="counted-textarea__input form-textarea" v-model="podcast.content">
              </textarea>
              <div class="counted-textarea__count-panel">
                {{ wordCount }} 个字
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>

    <div>
      <div class="card section-header is-compact">
        <div class="section-header__label">
          <span class="section-header__label-text">
            音频 ({{ podcast.children.length }})
        </span>
        </div>
        <div class="section-header__actions">
          <!--<button class="button popover-icon is-compact" type="button">-->
          <!--&lt;!&ndash;<icon name="plus-circle" class="gridicon"></icon>&ndash;&gt;-->
          <!--<svg class="gridicon gridicons-cloud-upload" height="24" width="24" xmlns="http://www.w3.org/2000/svg"-->
          <!--viewBox="0 0 24 24">-->
          <!--<g>-->
          <!--<path-->
          <!--d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path>-->
          <!--</g>-->
          <!--</svg>-->
          <!--添加-->
          <!--</button>-->
          <file-upload
            class="button popover-icon is-compact"
            name="file"
            post-action="http://vanq.picker.la/api/file"
            v-model="files"
            @input-file="input"
            @input-filter="inputFilter"
            :accept="accept"
            :size="size || 0"
            :headers="headers"
            ref="upload">
            <!--Add upload files-->
            <svg class="gridicon gridicons-cloud-upload" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g>
                <path
                  d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path>
              </g>
            </svg>
            添加
          </file-upload>
        </div>
      </div>
      {{ files }}

      <!--<foldable-card v-for="item in .children" :key="detailData.id" compact clickableHeader   v-dragging="{item: item, list: podcast.children}">-->
      <foldable-card :watchData="item" v-for="(item, index) in podcast.children" :key="item.id" compact>
        <div class="connected-application-item__header" slot="header">

          <div class="order">
            {{ index + 1 }}.
          </div>
          <h3>{{ item.title }}</h3>
        </div>
        <button type="submit" class="button form-button is-compact is-active" slot="summary">
          发布
        </button>
        <div slot="expandedSummary" class="section-header__actions">
          <button type="button" class="button is-error is-compact is-scary">下架</button>
          <button type="button" class="button is-error is-compact is-primary">保存</button>
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
          <player mutex theme="#42b983" preload="metadata" mode="circulation"
                  :music="item" v-if="item.url"> </player>
          <div class="empty-content" v-else>
            <h2 class="empty-content__title">您没有任何文档。</h2>
            <h3 class="empty-content__line">是否要上传内容？</h3>
            <!--<button @click.prevent="addDirectory">Add upload directory</button>-->
            <button class="media-library__upload-button button button is-primary" @click.prevent="insertFile(item)">
              上传媒体
            </button>
          </div>
        </div>
      </foldable-card>

      <!--<player mutex theme="#42b983" preload="metadata" mode="circulation"-->
              <!--:music="music"> </player>-->

    </div>

  </main>
</template>

<script>
  /* eslint-disable quotes,indent,no-undef,no-multi-spaces */
  import FileUpload from 'vue-upload-component/src'
  import EditorSidebar from '~/components/editor/sidebar'
  import HeaderCake from '~/components/header-cake'
  import FoldableCard from '~/components/foldable-card'
  import {Card} from '~/components/card'
//  import AudioPlayer from '~/components/aplayer'

  export default {
    middleware: 'authenticated',
    data () {
      return {
        music: {                                                           // Required, music info, see: ###With playlist
          title: 'Preparation',                                          // Required, music title
          author: 'Hans Zimmer/Richard Harvey',                          // Required, music author
          url: 'http://7xifn9.com1.z0.glb.clouddn.com/Preparation.mp3',  // Required, music url
          pic: 'http://7xifn9.com1.z0.glb.clouddn.com/Preparation.jpg',  // Optional, music picture
          lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'                   // Optional, lrc, see: ###With lrc
        },
        curItem: null,
        headers: {
          'Authorization': 'Bearer ' + this.token
        },
        files: [],
        accept: 'image/png,image/gif,image/jpeg,image/webp',
        size: 1024 * 1024 * 10,
        podcast: {
          content: ''
        },
        post: {
          title: '无标题',
          content: ''
        },
        colors: [{
          text: "Aquamarine"
        }, {
          text: "Hotpink"
        }, {
          text: "Gold"
        }, {
          text: "Crimson"
        }, {
          text: "Blueviolet"
        }, {
          text: "Lightblue"
        }, {
          text: "Cornflowerblue"
        }, {
          text: "Skyblue"
        }, {
          text: "Burlywood"
        }]
      }
    },
    validate ({params}) {
      return (!!params.id && !Object.is(Number(params.id), NaN))
    },
    async asyncData ({app, params}) {
      const baseUrl = 'http://vanq.picker.la/api'
      let data = (await app.$axios.get(`${baseUrl}/podcast/${params.id}`)).data
//      console.log(data)
      return {
        podcast: data.data
      }
    },
    props: {},
    components: {
      EditorSidebar,
      HeaderCake,
      Card,
      FoldableCard,
//      Player: AudioPlayer,
      FileUpload
    },
    mounted () {
      console.log('mounted ----')
      this.headers = {
        'Authorization': 'Bearer ' + this.token
      }
    },
    watch: {
      'files': {
        handler: (val, oldVal) => {
//          if (val.response)
//          console.log(val)
          if (val.success && !Object.is(val.response.data, undefined) && this.curItem) {
            let data = val.response.data
            this.curItem.audio = data.url
          }
        }
      }
//      'podcast': {
//        handler: (val, oldVal) => {
//          console.log(val)
//        },
      // 深度观察
//        deep: true
//      }
    },
    computed: {
      token () {
        return this.$store.state.token
//        config.headers.common['Authorization'] = 'Bearer ' + store.state.token
//        return
      },
      detailData: {
        get () {
//          return Object.assign({}, this.$store.state.podcast.detail.data)
// eslint-disable-next-line indent
//          return this.$store.state.podcast.detail.data
        },
        set (value) {
//          this.$store.commit('podcast/UPDATE_DETAIL', value)
        }
      },
      wordCount () {
        return this._wordCount(this.podcast.content)
      }
    },
    methods: {
      // 插入文件
      insertFile (cur) {
        let input = this.$refs.upload.$el.querySelector('input')
        input.onclick = null
        input.click()
        this.curItem = cur
        console.log(JSON.stringify(this.curItem))
      },
      test () {
      },
      // add, update, remove File Event
      input (newFile, oldFile) {
        this.curItem = null
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
            // this.progress(newFile)
            // console.log('progress', newFile.progress)
          }
          if (newFile.error && !oldFile.error) {
            // this.error(newFile)
            // console.log('error', newFile.error, newFile.response)
          }
          if (newFile.success && !oldFile.success) {
            // this.success(newFile)
            // console.log('success', newFile.response)
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

      //  event Filter
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
          var URL = window.URL || window.webkitURL
          if (URL && URL.createObjectURL) {
            newFile.blob = URL.createObjectURL(newFile.file)
          }
        }
      },
      // 字数统计
      _wordCount (data) {
        let pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g

        let m = data.match(pattern)
        let count = 0
        if (m === null) return count
        for (let i = 0; i < m.length; i++) {
          if (m[i].charCodeAt(0) >= 0x4E00) {
            count += m[i].length
          } else {
            count += 1
          }
        }
        return count
      }
    }
  }
</script>


<style lang="scss">
  .option__image {
    max-height: 32px;
    border-radius: 50%;
    margin-right: 10px;
    display: inline-block;
    vertical-align: middle;
  }

  .option__desc {
    display: inline-block;
    vertical-align: middle;
    padding: 10px;
    /*padding: rem(10px);*/
  }

  .option__title {
    font-size: 14px;
  }

  .option__small {
    display: block;
  }

  textarea {
    height: 180px;
  }

  .cateselect .multiselect__tags
  input {
    position: relative;
    display: inline-block;
    min-height: 20px;
    line-height: 20px;
    border: none;
    border-radius: 5px;
    background: #fff;
    padding: 0 0 0 5px;
    width: 100%;
    transition: border .1s ease;
    box-sizing: border-box;
    margin-bottom: 8px;
    vertical-align: top;
    box-shadow: none;

  }

  .categories__field {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    &-input {
      flex: 1;
    }
    &-action {
      margin-left: 10px;
      width: auto;
    }
  }
</style>
<template>
  <foldable-card expanded>
    <div slot="header">
      <spinner v-show="!(podcastStatus === 'success' || podcastStatus === 'init')"
               :className="'edit-gravatar__spinner'"></spinner>
      <h3>{{ podcast.title }}</h3>
    </div>
    <div slot="summary">
      节目信息

    </div>
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
                     :value="podcast.title"
                     @change="updateTitle">
            </div>
            <ul class="token-field__suggestions-list" tabindex="-1"></ul>
          </div>
        </div>
        <!--
        <fieldset class="form-fieldset">
          <label class="form-label">内容类型
            <span style="color: #A1a1a1; font-size: 12px; font-weight: 400;"> {{postFormat}}</span>
          </label>
          <section class="accordion__section">
            <ul class="editor-post-formats">
              <li class="editor-post-formats__format">
                <label>
                  <input id="book" type="radio"  value="6" class="form-radio" v-model="format">
                  <span
                    class="editor-post-formats__format-label">
                  <span class="editor-post-formats__format-icon">
                    <svg
                      class="gridicon gridicons-posts needs-offset" height="18" width="18"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"><g><path
                      d="M16 19H3v-2h13v2zm5-10H3v2h18V9zM3 5v2h11V5H3zm14 0v2h4V5h-4zm-6 8v2h10v-2H11zm-8 0v2h5v-2H3z"></path></g></svg></span>
                读书
              </span>
                </label>
              </li>
              <li class="editor-post-formats__format">
                <label>
                  <input id="article" type="radio" value="7" class="form-radio" v-model="format">
                  <span
                    class="editor-post-formats__format-label">
                    <span class="editor-post-formats__format-icon">
                    <svg
                      class="gridicon gridicons-aside" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"><g><path
                      d="M14 20l6-6V6c0-1.105-.895-2-2-2H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h8zM6 6h12v6h-4c-1.105 0-2 .895-2 2v4H6V6zm10 4H8V8h8v2z"></path></g>
                    </svg>
                  </span>
                读文
              </span>
                </label>
              </li>
            </ul>
          </section>
        </fieldset>
        -->
        <fieldset class="form-fieldset myinput">
          <label for="" class="form-label">
            当前内容分类
            <!--<span style="color: #A1a1a1; font-size: 12px; font-weight: 400;"> {{categoryName}}</span>-->

          </label>

          <div class="token-field categories__field">
            <multiselect
              class="cateselect categories__field-input"
              v-model="term"
              :options="terms"
              :multiple="true"
              selectedLabel="已选中"
              deselectLabel="按回车键删除"
              selectLabel="按回输键选中"
              placeholder="输入分类名称" track-by="name" label="name" @select="termSelect" @remove="termRemove">
            <span slot="noResult">
              分类信息未找到
            </span>
            </multiselect>
            <!--<div class="categories__field-action">-->
              <!--<button class="button is-busy" @click.prevent="saveTerms">-->
                <!--更新类别-->
              <!--</button>-->
            <!--</div>-->
          </div>
          <p></p>
        </fieldset>
        <fieldset class="form-fieldset">
          <label for="role" class="form-label">
            作者
          </label>
          <div class="token-field">
            <multiselect
              id="role"
              v-model="userValue"
              :options="users"
              track-by="user_login"
              label="nicename"
              :searchable="false"
              :close-on-select="true"
              :show-labels="false"
              placeholder="选择作者"
              @select="authorSelect">
              <template slot="option" scope="props">
                <img class="option__image" :src="props.option.avatar" :alt="props.option.user_nicename">
                <div class="option__desc"><span class="option__title">{{ props.option.user_nicename }}</span><span
                  class="option__small">@{{ props.option.user_login }}</span></div>
              </template>
            </multiselect>
          </div>
          <p></p>
          <!--<p class="form-setting-explanation">-->
          <!--<a target="_blank" rel="noopener noreferrer"-->
          <!--href="/user-roles/">-->
          <!--<icon name="plus" class="gridicon"></icon>-->
          <!--添加作者-->
          <!--</a>-->
          <!---->
          <!--</p>-->
        </fieldset>
        <fieldset class="form-fieldset">
          <label for="message" class="form-label">
            内容介绍
          </label>
          <div class="counted-textarea">
              <textarea
                name="message" id="message" maxlength="500"
                placeholder=""
                class="counted-textarea__input form-textarea"
                :value="podcast.content"
                v-model="content"
                @change="updateContent">
              </textarea>
            <div class="counted-textarea__count-panel">
              {{ _wordCount(content) }} 个字
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </foldable-card>
</template>

<script>
  import {Card} from '../../card'
  import FoldableCard from '../../foldable-card'
  import Multiselect from 'vue-multiselect'
  import Spinner from '~/components/spinner'

  export default {
    props: {
      termSlug: {
        type: String
      },
      terms: {
        type: Array,
        required: true
      },
      status: {
        type: String
      },
      users: {
        type: Array,
        required: true
      },
      podcast: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        saving: false,
        content: '',
        format: '6',
        value: [
          {name: 'Vue.js', language: 'JavaScript'}
        ],
        options: [
          {
            language: 'Javascript',
            libs: [
              {name: 'Vue.js', category: 'Front-end'},
              {name: 'Adonis', category: 'Backend'}
            ]
          },
          {
            language: 'Ruby',
            libs: [
              {name: 'Rails', category: 'Backend'},
              {name: 'Sinatra', category: 'Backend'}
            ]
          },
          {
            language: 'Other',
            libs: [
              {name: 'Laravel', category: 'Backend'},
              {name: 'Phoenix', category: 'Backend'}
            ]
          }
        ],
        userValue: {},
        term: [{}],
        categoryValue: {},
        tagValue: {},
        editing: false,
        category: []
      }
    },
    components: {
      Card,
      FoldableCard,
      Multiselect,
      Spinner
    },
    mounted () {
      this.$nextTick()
      this.userValue = this.podcast.author
      if (this.podcast.categories) {
        this.term = this.podcast.categories
      }
      this.content = this.podcast.content
    },
    computed: {
      categoryName () {
        if (this.termSlug === 'youdao') {
          return '柚道'
        } else if (this.termSlug === 'youda') {
          return '柚答'
        }
      },
      categoryId() {
        if (this.termSlug === 'youdao') {
          return '1'
        } else if (this.termSlug === 'youda') {
          return '2'
        }
      },
      postFormat () {
        if (this.format === '6') {
          return '读书'
        } else if (this.format === '7') {
          return '读文'
        }
      },
      podcastStatus () {
        return this.$store.state.podcast.detail.status
      },
      title () {
        if (this.podcastStatus === 'saving') {
          return '保存中...'
        } else if (this.podcastStatus === 'error') {
          return '保存失败...'
        } else {
          return '节目信息'
        }
      }
    },
    methods: {
      updateTitle (e) {
        const form = {
          id: this.podcast.id,
          title: e.target.value,
          format: this.format
          // category: this.categoryId
        }
        this.$emit('save', form)
      },
      updateContent (e) {
        const form = {
          id: this.podcast.id,
          content: e.target.value,
          format: this.format
          // category: this.categoryId
        }
        this.$emit('save', form)
      },
      termRemove (selected, id) {
        const form = {
          id: this.podcast.id,
          author: this.podcast.author.id,
          categories: `${JSON.stringify(selected.term_taxonomy_id)}`
        }
        this.$emit('save', form)
       // console.log(id + ':' + JSON.stringify(removedOption))
      },
      termSelect (selected) {
//        console.log(JSON.stringify(this.term))
        const form = {
          id: this.podcast.id,
          author: this.podcast.author.id,
          categories: `${JSON.stringify(selected.term_taxonomy_id)}`
        }
        this.$emit('save', form)
      },
      saveTerms () {
        const form = {
          id: this.podcast.id,
          categories: `${JSON.stringify(this.term)}`
        }
        this.$emit('save', form)
      },
      authorSelect (selected, id) {
        const form = {
          id: this.podcast.id,
          author: selected.id,
          authorInfo: selected,
          format: this.format
          // category: this.categoryId
        }
//        let form = Object.assign({
//          author: selected.id,
//          authorInfo: selected
//        }, this.podcast)
        this.$emit('save', form)
      },
      _wordCount (data) {
        const pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g

        const m = data.match(pattern)
        let count = 0
        if (m === null) {
          return count
        }
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

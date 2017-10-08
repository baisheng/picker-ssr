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
        <fieldset class="form-fieldset">
          <label for="term" class="form-label">
            分类
          </label>
          <div class="token-field">
            <multiselect
              id="term"
              v-model="term"
              :options="terms"
              track-by="name"
              label="name"
              :searchable="false"
              :close-on-select="true"
              :show-labels="false"
              placeholder="选择分类"
              @select="termSelect">
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
          <label for="role" class="form-label">
            作者
          </label>
          <div class="token-field">
            <multiselect
              id="role"
              v-model="value"
              :options="users"
              track-by="user_login"
              label="user_nicename"
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
        value: {},
        term: {},
        categoryValue: {},
        tagValue: {},
        editing: false,
        category: [
          {name: 'Vue.js', language: 'JavaScript'},
          {name: 'Adonis', language: 'JavaScript'},
          {name: 'Rails', language: 'Ruby'},
          {name: 'Sinatra', language: 'Ruby'},
          {name: 'Laravel', language: 'PHP'},
          {name: 'Phoenix', language: 'Elixir'}
        ]
      }
    },
    components: {
      Card,
      FoldableCard,
      Multiselect,
      Spinner
    },
    mounted () {
      // 初始化角色列表默认值
      this.$nextTick(() => {
        this.value = this.podcast.authorInfo
        if (this.podcast.terms) {
          this.term = this.podcast.terms[0]
        }
        this.content = this.podcast.content
      })
//        if (this.podcast.hasOwnProperty('authorInfo')) {
//          this.value = this.podcast.authorInfo
//        }
    },
    computed: {
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
          title: e.target.value
        }
        this.$emit('save', form)
      },
      updateContent (e) {
        const form = {
          id: this.podcast.id,
          content: e.target.value
        }
        this.$emit('save', form)
      },
      termSelect (selected) {
        const form = {
          id: this.podcast.id,
          term: selected.id
        }
        this.$emit('save', form)
      },
      authorSelect (selected, id) {
        const form = {
          id: this.podcast.id,
          author: selected.id,
          authorInfo: selected
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

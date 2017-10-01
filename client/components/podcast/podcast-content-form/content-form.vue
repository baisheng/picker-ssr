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
  <div>
    <card class="section-header" compact>
      <div class="section-header__label">
          <span class="section-header__label-text">
            {{ title }}
        </span>
        <spinner v-show="isSaving" :className="'edit-gravatar__spinner'"></spinner>

      </div>
    </card>

    <card>
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
                @select="select">
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
    </card>
  </div>
</template>

<script>
  import {Card} from '../../card'
  import Multiselect from 'vue-multiselect'
  import Spinner from '~/components/spinner'
  export default {
    props: {
      isSaving: {
        type: Boolean
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
        value: '',
        editing: false
      }
    },
    components: {
      Card,
      Multiselect,
      Spinner
    },
    mounted () {
      // 初始化角色列表默认值
      this.$nextTick(() => {
        if (this.podcast.hasOwnProperty('authorInfo')) {
          this.value = this.podcast.authorInfo
        }

      })
    },
    computed: {
      title () {
        if (this.isSaving) {
          return '保存中...'
        } else {
          return '节目信息'
        }
      },
      wordCount () {
        if (this.podcast.content !== null) {
          return this._wordCount(this.podcast.content)
        }
      }
    },
    watch: {
//      'podcast': {
//        handler (val, oldVal) {
//          if (val) {
//            this.editing = true
//          }
//          this.$emit('content_update', this.podcast)
//        },
//        deep: true
//      }
    },
    methods: {
      select (selectedOption, id) {
        this.podcast.author = selectedOption.id
        this.podcast.authorInfo = selectedOption
      },
//      customLabel ({ user_login, user_nicename }) {
//        return `${user_login} – ${user_nicename}`
//      },
      handleClick () {
        this.podcast.saving = 'saving'
        this.$emit('content_update', this.podcast)
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

<template>
  <main data-reactroot="" class="invite-people main" role="main">
    <header class="current-section"><a>
      <svg class="gridicon gridicons-chevron-left" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24">
        <g>
          <path d="M14 20l-8-8 8-8 1.414 1.414L8.828 12l6.586 6.586"></path>
        </g>
      </svg>
      <div class="site-icon is-blank" style="height: 32px; width: 32px; line-height: 32px; font-size: 32px;">
        <svg class="gridicon gridicons-globe" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <g>
            <path
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
          </g>
        </svg>
      </div>
      <div><p class="current-section__site-title">bluepx</p>
        <h1 class="current-section__section-title">邀请用户</h1></div>
    </a>
    </header>
    <header-cake @click="test" @click-title="test" isCompact>
      添加内容
    </header-cake>

    <foldable-card>
      <button type="submit" class="button form-button is-primary" slot="summary">
        <icon name="paper-plane" class="gridicon "></icon>
        发布
      </button>
    </foldable-card>

    <div class="card is-error foldable-card connected-application-item has-expanded-summary is-compact">
      <div class="foldable-card__header is-clickable has-border">
        <span class="foldable-card__main">
          <div class="connected-application-item__header">
            <div class="plugin-icon connected-application-icon">
              <img src="https://bluepx.files.wordpress.com/2017/02/cover.jpg?h=160" class="post-type-list__post-thumbnail">

              <!--<img class="plugin-icon__img"-->
                   <!--src="https://i0.wp.com/wpcom.files.wordpress.com/2016/01/icon300px.png?w=100">-->
            </div>
            <h3>
              {{ post.title }}
            </h3>
          </div>
        </span>



        <span class="foldable-card__secondary">
          <span class="foldable-card__summary">
          <div>

            <button type="submit" class="button form-button is-primary">
              <icon name="paper-plane" class="gridicon "></icon>
              发布
            </button>

          </div>
          </span>

          <span class="foldable-card__summary-expanded">
            <div>
            <button type="button" class="button is-compact">下架</button></div>
            <!-- react-text: 4546 -->
            <!-- /react-text --></span>

          <button type="button" class="foldable-card__action foldable-card__expand"><span
          class="screen-reader-text">更多</span><svg class="gridicon gridicons-chevron-down" height="24" width="24"
                                                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
          d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg></button>


        </span>

      </div>
    </div>
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
                       v-model="post.title">
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
                        class="counted-textarea__input form-textarea"></textarea>
              <div class="counted-textarea__count-panel"><!-- react-text: 3859 -->500 characters remaining
                <!-- /react-text -->
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
            音频列表
        </span>
        </div>
        <div class="section-header__actions">
          <button class="button popover-icon is-compact" type="button">
            <!--<icon name="plus-circle" class="gridicon"></icon>-->
            <svg class="gridicon gridicons-cloud-upload" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g>
                <path
                  d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path>
              </g>
            </svg>
            上传
          </button>
        </div>
      </div>
      <div class="card foldable-card connected-application-item has-expanded-summary is-compact">
        <div class="foldable-card__header is-clickable has-border"><span class="foldable-card__main"><div
          class="connected-application-item__header"><div class="plugin-icon connected-application-icon"><img
          class="plugin-icon__img"
          src="https://i0.wp.com/wpcom.files.wordpress.com/2016/01/icon300px.png?w=100"></div><h3>WordPress.com</h3></div>
          <!-- react-text: 4537 --> <!-- /react-text --></span><span class="foldable-card__secondary"><span
          class="foldable-card__summary"><div><button type="button" class="button is-compact">下架</button></div>
          <!-- react-text: 4542 --> <!-- /react-text --></span><span class="foldable-card__summary-expanded"><div><button
          type="button" class="button is-compact">下架</button></div><!-- react-text: 4546 -->
          <!-- /react-text --></span><button type="button" class="foldable-card__action foldable-card__expand"><span
          class="screen-reader-text">更多</span><svg class="gridicon gridicons-chevron-down" height="24" width="24"
                                                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
          d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg></button></span></div>
      </div>


      <div class="card foldable-card connected-application-item has-expanded-summary is-compact">
        <div class="foldable-card__header is-clickable has-border"><span class="foldable-card__main"><div
          class="connected-application-item__header"><div class="plugin-icon connected-application-icon"><img
          class="plugin-icon__img"
          src="https://i0.wp.com/developer.files.wordpress.com/2013/01/60b40db1e3946a29262eda6c78f33123.jpg?w=100"></div><h3>Gravatar</h3></div>
          <!-- react-text: 4559 --> <!-- /react-text --></span><span class="foldable-card__secondary"><span
          class="foldable-card__summary"><div><button type="button" class="button is-compact">下架</button></div>
          <!-- react-text: 4564 --> <!-- /react-text --></span><span class="foldable-card__summary-expanded"><div><button
          type="button" class="button is-compact">下架</button></div><!-- react-text: 4568 -->
          <!-- /react-text --></span><button type="button" class="foldable-card__action foldable-card__expand"><span
          class="screen-reader-text">更多</span><svg class="gridicon gridicons-chevron-down" height="24" width="24"
                                                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
          d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg></button></span></div>
      </div>
      <div class="card foldable-card connected-application-item has-expanded-summary is-compact">
        <div class="foldable-card__header is-clickable has-border"><span class="foldable-card__main"><div
          class="connected-application-item__header"><div class="plugin-icon connected-application-icon"><img
          class="plugin-icon__img" src="https://i0.wp.com/en.wordpress.com/i/default-app-icon.png?w=100"></div><h3>gravatar-upload</h3></div>
          <!-- react-text: 4581 --> <!-- /react-text --></span><span class="foldable-card__secondary"><span
          class="foldable-card__summary"><div><button type="button" class="button is-compact">下架</button></div>
          <!-- react-text: 4586 --> <!-- /react-text --></span><span class="foldable-card__summary-expanded"><div><button
          type="button" class="button is-compact">下架</button></div><!-- react-text: 4590 -->
          <!-- /react-text --></span><button type="button" class="foldable-card__action foldable-card__expand"><span
          class="screen-reader-text">更多</span><svg class="gridicon gridicons-chevron-down" height="24" width="24"
                                                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
          d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg></button></span></div>
      </div>
    </div>
  </main>
</template>

<script>
  import EditorSidebar from '~/components/editor/sidebar'
  import HeaderCake from '~/components/header-cake'
  import FoldableCard from '~/components/foldable-card'

  export default {
    data () {
      return {
        post: {
          title: '无标题'
        }
      }
    },
    props: {},
    components: {
      EditorSidebar,
      HeaderCake,
      FoldableCard
    },
    methods: {
      test () {
        console.log('llalalla')
      }
    }
  }
</script>

<style>
  .gridicon {
    padding-right: 10px;
  }
  /*.plugin-icon__img{*/
    /*width: 40px;*/
    /*height: 40px;*/
  /*}*/
</style>

<template>
  <main data-reactroot="" class="connected-applications main" role="main">

    <!-- Navbar -->
    <header-cake compact backHref="/podcasts" :title="title">
    </header-cake>
    <!-- Header -->
    <podcast-header :podcast.sync="detail"></podcast-header>
    <!-- Content-from -->
    <podcast-content-form :podcast="detail" :users="users.data" @save="save"></podcast-content-form>
      <!-- Episode-list -->
      <episode-list :podcast="detail" @podcast_item_update="update" v-if="detail.id"></episode-list>
    <div class="comment-list"><!-- react-empty: 9196 --><!-- react-empty: 9197 -->
      <div class="section-nav comment-navigation">

        <div class="section-nav__mobile-header"><span class="section-nav__mobile-header-text">全部</span></div>
        <div class="section-nav__panel">
          <div class="section-nav-group">
            <div class="section-nav-tabs">
              <ul class="section-nav-tabs__list" role="menu">
                <li class="is-selected section-nav-tab"><a href="/comments/all/bluepx.wordpress.com"
                                                           class="section-nav-tab__link" tabindex="0"
                                                           aria-selected="true" role="menuitem"><span
                  class="section-nav-tab__text"><!-- react-text: 10742 -->全部<!-- /react-text --></span></a></li>
                <li class="section-nav-tab"><a href="/comments/pending/bluepx.wordpress.com"
                                               class="section-nav-tab__link" tabindex="0" aria-selected="false"
                                               role="menuitem"><span class="section-nav-tab__text"><!-- react-text: 10746 -->条未审核
                  <!-- /react-text --></span></a></li>
                <li class="section-nav-tab"><a href="/comments/approved/bluepx.wordpress.com"
                                               class="section-nav-tab__link" tabindex="0" aria-selected="false"
                                               role="menuitem"><span class="section-nav-tab__text"><!-- react-text: 10750 -->已审核
                  <!-- /react-text --></span></a></li>
                <li class="section-nav-tab"><a href="/comments/spam/bluepx.wordpress.com" class="section-nav-tab__link"
                                               tabindex="0" aria-selected="false" role="menuitem"><span
                  class="section-nav-tab__text"><!-- react-text: 10754 -->垃圾评论<!-- /react-text --></span></a></li>
                <li class="section-nav-tab"><a href="/comments/trash/bluepx.wordpress.com" class="section-nav-tab__link"
                                               tabindex="0" aria-selected="false" role="menuitem"><span
                  class="section-nav-tab__text"><!-- react-text: 10758 -->回收站<!-- /react-text --></span></a></li>
              </ul>
            </div>
          </div>
          <div class="comment-navigation__tab comment-navigation__actions comment-navigation__open-bulk">
            <button type="button" class="button is-compact">批量3编辑</button>
          </div>
        </div>
      </div>
      <span class="comment-list__transition-wrapper">
        <div class="card comment-detail is-approved is-collapsed"
             tabindex="0"><!-- react-empty: 9256 --><div
          class="comment-detail__header is-preview">
          <div class="comment-detail__header-content"><div
          class="comment-detail__author-preview">
          <div class="comment-detail__author-avatar">
          <img alt="bluepx"
                                                                                                 class="gravatar"
                                                                                                 src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=96&amp;d=mm&amp;r=G"
                                                                                                 width="32"
                                                                                                 height="32"></div><div
          class="comment-detail__author-info"><div class="comment-detail__author-info-element"><strong><div
          class="emojify">bluepx</div></strong><span><div class="emojify">bluepx.wordpress.com</div></span></div><div
          class="comment-detail__author-info-element"><div class="emojify">我来写一篇文章 上</div></div></div></div><div
          class="comment-detail__comment-preview">
            <div class="emojify">

      bluepx
        站点设置

      常规
              常规

              撰写
              讨论

              浏览量



            站点个人资料
                保存设置
                  站点标题

                    站点副标题
                    简要描述该站点。
                  站点图标

                  更改
                站点地址

                   添加自定义地址

                购买自定义域，映射您已拥有的域，或
                  重定向
                  此站点。
            隐私权
              保存设置
              公开
                所有人都能看到您的站点，并且您的站点可能被搜索引擎编入索引。隐藏
                所有人都能看到您的站点，不过我们已请求搜索引擎不将您的站点编入索引。
                私密
                  只有您自己和得到您批准的用户能够看到您的站点。
              注脚文本
            您可以在定制器中更改注脚文本，定制您的网站。
              更改注脚文本

                  购买 WordPress.com 商务版以彻底删除注脚文本
                  升级以删除注脚文本，添加 Google Analytics（分析）等功能

          站点工具

          更改您的站点地址。
            注册新域或更改站点地址。

        导入
          从其他 WordPress 或 Medium 站点中导入内容。

        导出
          从您的站点中导出内容。您的数据为您所有。

        删除您的内容
          保留您站点的地址和当前主题，但删除所有文章、网页和媒体文件，以便您可以重新开始。

        永久删除您的站点
          删除您的所有文章、网页、媒体和数据，并放弃您的站点地址

</div></div></div><button class="button comment-detail__action-collapse is-borderless" type="button"><svg
          class="gridicon gridicons-chevron-down" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"><g><path
          d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg></button></div></div><div
        class="card comment-detail is-approved is-collapsed" tabindex="0"><!-- react-empty: 9277 --><div
        class="comment-detail__header is-preview"><div class="comment-detail__header-content"><div
        class="comment-detail__author-preview"><div class="comment-detail__author-avatar"><img alt="bluepx"
                                                                                               class="gravatar"
                                                                                               src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=96&amp;d=mm&amp;r=G"
                                                                                               width="32"
                                                                                               height="32"></div><div
        class="comment-detail__author-info"><div class="comment-detail__author-info-element"><strong><div
        class="emojify">bluepx</div></strong><span><div class="emojify">bluepx.wordpress.com</div></span></div><div
        class="comment-detail__author-info-element"><div class="emojify">我来写一篇文章 上</div></div></div></div><div
        class="comment-detail__comment-preview"><div class="emojify">好的你这个问题我们有办法解决
</div></div></div><button class="button comment-detail__action-collapse is-borderless" type="button"><svg
        class="gridicon gridicons-chevron-down" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"><g><path
        d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg></button></div></div><div
        class="card comment-detail is-unapproved is-collapsed" tabindex="0"><!-- react-empty: 9234 --><div
        class="comment-detail__header is-preview"><div class="comment-detail__header-content"><div
        class="comment-detail__author-preview"><div class="comment-detail__author-avatar"><img alt="bluepx"
                                                                                               class="gravatar"
                                                                                               src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=96&amp;d=mm&amp;r=G"
                                                                                               width="32"
                                                                                               height="32"></div><div
        class="comment-detail__author-info"><div class="comment-detail__author-info-element"><strong><div
        class="emojify">bluepx</div></strong><span><div class="emojify">bluepx.wordpress.com</div></span></div><div
        class="comment-detail__author-info-element"><div class="emojify">我来写一篇文章 上</div></div></div></div><div
        class="comment-detail__comment-preview"><div class="emojify">很赞！！！
</div></div></div><button class="button comment-detail__action-collapse is-borderless" type="button"><svg
        class="gridicon gridicons-chevron-down" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"><g><path
        d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg></button></div></div><div
        class="card comment-detail is-approved is-collapsed" tabindex="0"><!-- react-empty: 9298 --><div
        class="comment-detail__header is-preview"><div class="comment-detail__header-content"><div
        class="comment-detail__author-preview"><div class="comment-detail__author-avatar"><img alt="bluepx"
                                                                                               class="gravatar"
                                                                                               src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=96&amp;d=mm&amp;r=G"
                                                                                               width="32"
                                                                                               height="32"></div><div
        class="comment-detail__author-info"><div class="comment-detail__author-info-element"><strong><div
        class="emojify">bluepx</div></strong><span><div class="emojify">bluepx.wordpress.com</div></span></div><div
        class="comment-detail__author-info-element"><div class="emojify">我来写一篇文章 上</div></div></div></div><div
        class="comment-detail__comment-preview"><div class="emojify">这是一个新的评论
</div></div></div><button class="button comment-detail__action-collapse is-borderless" type="button"><svg
        class="gridicon gridicons-chevron-down" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"><g><path
        d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg></button></div></div></span>
      <!-- react-empty: 9254 --></div>
  </main>
</template>

<script>
  /* eslint-disable quotes,indent,no-undef,no-multi-spaces,no-implicit-coercion */
  import HeaderCake from '~/components/header-cake'
  import PodcastHeader from '~/components/podcast/header'
  import PodcastContentForm from '~/components/podcast/podcast-content-form'
  import EpisodeList from '~/components/episodes/episode-list'
  import {debounce} from 'lodash'

  export default {
    middleware: 'authenticated',
    layout: 'podcast',
    async fetch ({store, params}) {
      if (params.id && !Object.is(Number(params.id), NaN)) {
        await store.dispatch('getPodcast', params.id)
      }
      await store.dispatch('loadUsers')
    },
    data () {
      return {
        status: 'default',
        curItem: null,
        headers: {
          'Authorization': 'Bearer ' + this.token
        },
        podcast: {
          author: '',
          title: '',
          content: '',
          children: []
        },
        post: {
          title: '无标题',
          content: ''
        }
      }
    },
    // 获取 ID的 问题
//    validate ({params}) {
//      return !!params.id && !Object.is(Number(params.id), NaN)
//    },
//    async asyncData ({app, params}) {
//      if (!Object.is(params.id, undefined)) {
//        const baseUrl = 'http://api.picker.la/rest/orgs/1'
//        const data = (await app.$axios.get(`${this.orgId}/posts/${params.id}`)).data
//        console.log(JSON.stringify(data))
//        return {
//          podcast: data.data
//        }
//      }
//    },
    props: {},
    components: {
      HeaderCake,
      PodcastHeader,
      PodcastContentForm,
      EpisodeList
    },
//    mounted() {
//      this.podcast = this.detail
//      console.log(this.detail)
//    },
    watch: {
//      'podcast': {
//        handler: (val, oldVal) => {
//          this.save()
//        },
//       深度观察
//        deep: true
//      }
    },
    computed: {
      title () {
        return this.detail.title ? `修改 - 【${this.detail.title}】` : '创建新节目'
      },
      user () {
        return this.$store.state.user
      },
      users () {
        return this.$store.state.users.list.data
      },
      detail () {
        return this.$store.state.podcast.detail.data
      },
      appId () {
        return this.$store.getters.appId
      },
      orgId () {
        return this.$store.getters.orgId
      },
//      episodes () {
//        if (!Object.is(this.podcast.children, undefined)) {
//          return this.podcast.children
//        } else {
//          return []
//        }
//      },
      token () {
        return this.$store.state.token
//        config.headers.common['Authorization'] = 'Bearer ' + store.state.token
//        return
      }
    },
    mounted () {
//      this.$on('featured_image_upload', (data) => {
//        this.update(data)
//      })
      // 初始化
      this.$nextTick(() => {
//        this.podcast = Object.assign({}, this.detail)
//        this.podcast.children = [...this.detail.children]
      })
//      this.podcast = this.detail
//      this.podcast = Object.assign(this.detail)
//      if (!Object.is(this.detail.children, undefined)) {
//        this.podcast.children = [...this.detail.children]
//      }
//      this.$nextTick(() => {
//        if (JSON.stringify(this.detail.data) !== '{}') {
//          this.podcast = Object.assign({children: []}, this.detail)
//        }
//      })
//      this.$watch('podcast.title', () => {
//        this.save()
//      })
//      this.$watch('podcast.content', () => {
//        this.save()
//      })
//      this.$watch('podcast.author', () => {
//        this.save()
//      })
    },
    methods: {
      async save (data, id) {
        this.status = 'saving'
//        if (!this.post.id && this.post.content === null) return
        if (Object.is(this.detail.id, undefined)) {
//        this.post.autoExcerpt = this.autoExcerpt
//          const baseUrl = 'http://api.picker.la/rest/orgs/1'
//          console.log(JSON.stringify(data))
          const res = await this.$store.dispatch('createPodcast', data)
          if (res.errno === 0) {
            history.pushState({state: 1}, 'Auto Save State', '/podcast/' + res.data + '')
          }
//          await this.$axios.post(`/app/${this.appId}/posts`, this.podcast)
//            .then(response => {
//              const postId = response.data.data
//              if (!Object.is(postId, null)) {
//                this.podcast.id = postId
//                 更新浏览器地址栏
//                history.pushState({state: 1}, 'Auto Save State', '/podcast/' + postId + '')
//              }
//            const success = !!response.status && response.data && Object.is(response.data.errno, 0)
//            if (success) commit('posts/CREATE_SUCCESS', response.data)
//            if (!success) commit('posts/CREATE_FAILURE')
//            }, err => {
//            commit('posts/CREATE_FAILURE', err)
//            })
        } else {
          if (data) {
            await this.update(data, data.id)
          } else {
            await this.update(this.podcast, this.podcast.id)
          }
        }
      },
      async update (data, id) {
//        let podcastId = this.podcast.id
        if (id !== undefined) {
//          podcastId = id
          data.id = id
        }
//        console.log(JSON.stringify(data))
        await this.$store.dispatch('updatePodcast', data)
//        console.log(JSON.stringify(data))
//        console.log(this.isSaving + 'adfasdfsdaf')

//        console.log(JSON.stringify(data))
//        const that = this
//        await this.$store.dispatch('updatePodcast', data)
//        await this.$axios.put(`/app/${this.appId}/posts/${podcastId}`, data)
//          .then(r => {
//            that.status = 'success'
//            console.log(this.isSaving + 'asdjflkasdjflkjds')
//            console.log('----- success.....')
//            console.log(JSON.stringify(r))
//            this.podcast.saving = false
//            console.log(r.status)
        // 执行 vux store 状态
//            delete data.post_thumbnail
//            that.$emit('update_success')
//            this.$store.commit('podcast/UPDATE_EPISODE_SUCCESS', r)
//          })
//          .catch(e => console.log(e))
      }
    }
  }
</script>


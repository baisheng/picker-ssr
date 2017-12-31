<template>
  <div>

    <foldable-card class="is-compact">
      <div class="connected-application-item__header is-p" slot="header">
        <h3>精选推荐</h3>
      </div>
      <div slot="summary">
        <nuxt-link class="button is-compact" style="margin-right: 8px;" :to="`/stickys`">
          <svg class="gridicon gridicons-add-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <g>
              <path
                d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"></path>
            </g>
          </svg>
          添加内容
        </nuxt-link>
        <nuxt-link class="button is-compact is-action" :to="'/podcasts/term/'"
                   v-if="expandedLink && isNotEmpty">
          查看全部
        </nuxt-link>
      </div>
    </foldable-card>
    <div class="podcasts-browser-list">
      <!--<draggable v-model="myList">-->

      <div class="card podcasts-browser-list__elements" v-if="isNotEmpty">
        <draggable v-model="list">
        <li class="podcasts-browser-item" v-for="item in list" :key="item.id">
          <nuxt-link :to="`/podcast/${item.id}`" class="podcasts-browser-item__link">
            <div class="podcasts-browser-item__info">
              <div class="plugin-icon">
                <img class="plugin-icon__img"
                     :src="item.featured_image">
              </div>
              <div class="podcasts-browser-item__title">{{item.title}}</div>
              <div class="podcasts-browser-item__author">{{ item.author.nicename }}</div>
              <div class="podcasts-browser-item__published" v-if="item.status === 'publish'">
                移除
              </div>
            </div>
          </nuxt-link>
        </li>
        </draggable>
      </div>
      <div class="card" v-else>
        <empty-content class="" title="此分类下没有内容" style="padding:15px;" :action="emptyAction"></empty-content>
      </div>
    </div>
  </div>

</template>

<script>
  /* eslint-disable key-spacing,comma-spacing,no-spaced-func */
  import Draggable from 'vuedraggable'
  import FoldableCard from '~/components/foldable-card'
  import EmptyContent from '~/components/empty-content'
  import FileUpload from 'vue-upload-component/src'
  import Spinner from '~/components/spinner'

  export default {
    name: 'StickysList',
    components: {
      Draggable,
      FoldableCard,
      EmptyContent,
      FileUpload,
      Spinner
    },
    props: {
      expandedLink: {
        type: Boolean,
        default: true
      },
      slug: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        files: [],
        progress: 'success',
        uploadProgress: '',
        size: 1024 * 1024 * 10,
        accept: 'image/png,image/gif,image/jpeg',
        list: [],
        emptyAction: {
          title: '添加节目',
          url: '/podcast'
        },
        transient: false
      }
    },
    mounted () {

      (async () => {
        await this.load()
      })()
//      this.$nextTick(() => {
//        (async () => {
//          await this.load()
//        })()
//      })
    },
    computed: {
      classes () {
        return [
          'site-icon',
          {
            'is-blank': !this.featuredImage,
            'is-transient': this.transient
          }
        ]
      },
//      featuredImage () {
//        if (this.term.hasOwnProperty('featured_image')) {
//          return this.term.featured_image
//        }
//        return false
//      },
      isNotEmpty () {
        return this.list.length > 0
      }
    },
    methods: {
      showButtonsDialog () {

      },
      deleteCategory (slug) {
        this.$modal.show('dialog', {
          title: '确定删除分类吗？',
          text: '❗删除后不可恢复，分类中的内容会迁移至默认分类下，',
          buttons: [
            {
              title: '取消'
            },
            {
              title: '⭕ 确认',
              handler: async () => {
                const data = await this.$store.dispatch('deleteCategory', slug)
                if (data) {
                  this.$toast.error(data.errmsg)
                  this.$modal.hide('dialog')
                  return
                } else {
                  await this.$store.dispatch('loadCategories')
                  this.$toast.show('删除成功！👌')
                  this.$modal.hide('dialog')
                }
              }
            }
          ]
        })
      },
      async load () {
        const data = (await this.$axios.get(`/apps/${this.$store.getters.appId}/posts?sticky=true`)).data.data
        this.list = data.data
      }
    }
  }
</script>

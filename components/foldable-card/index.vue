<template>
  <card class="foldable-card is-compact">
    <div :class="headerClasses">
      <span class="foldable-card__main">
        <div
          class="connected-application-item__header">
          <div class="plugin-icon connected-application-icon">
            <img
              class="plugin-icon__img"
              src="https://i0.wp.com/developer.files.wordpress.com/2013/01/60b40db1e3946a29262eda6c78f33123.jpg?w=100">
          </div>
          <h3>Gravatar</h3>
        </div>
      </span>
      <span class="foldable-card__secondary">
        <span class="foldable-card__summary">
          <slot name="summary"></slot>
          <!--<div>-->
            <!--<button type="button" class="button is-compact">断开连接</button>-->
          <!--</div>-->
          <!-- react-text: 4564 --> <!-- /react-text -->
        </span>
        <span class="foldable-card__summary-expanded">
          <slot name="expandedSummary"></slot>
          <!--<div>-->
            <!--<button-->
              <!--type="button" class="button is-compact">断开连接</button>-->
          <!--</div>&lt;!&ndash; react-text: 4568 &ndash;&gt; &lt;!&ndash; /react-text &ndash;&gt;-->
        </span>
        <button
          type="button" class="foldable-card__action foldable-card__expand">
          <span class="screen-reader-text">更多</span>
          <svg
            class="gridicon gridicons-chevron-down" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"><g><path
            d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg>
        </button>
      </span>
    </div>
  </card>

</template>
<script>
  import {Card, CompactCard} from '../card'

  export default {
    name: 'FoldableCard',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      expanded: {
        type: Boolean,
        default: false
      },
      compact: {
        type: Boolean,
        default: true
      },
      clickableHeader: Boolean
    },
    components: {
      Card,
      CompactCard
    },
    computed: {
      headerClasses () {
        return [
          'foldable-card__header',
          {
            'is-clickable': !!this.clickableHeader,
            'has-border': !!this.$slots.summary
          }
        ]
      }
    }
  }
</script>

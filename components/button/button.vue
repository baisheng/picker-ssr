<template>
  <a :class="classes" :href="href" v-if="href"></a>
  <button :type="htmlType" :class="classes" :disabled="disabled" @click="handleClick" v-else>
  </button>
</template>
<script>
  import { oneOf } from '../../utils/assist'

  const prefixCls = 'button'

  export default {
    name: 'Button',
    components: {},
    props: {
      href: String,
      type: {
        validator (value) {
          return oneOf(value, ['primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error', 'default'])
        }
      },
      shape: {
        validator (value) {
          return oneOf(value, ['circle', 'circle-outline'])
        }
      },
      size: {
        validator (value) {
          return oneOf(value, ['small', 'large', 'default'])
        }
      },
      loading: Boolean,
      disabled: Boolean,
      htmlType: {
        default: 'button',
        validator (value) {
          return oneOf(value, ['button', 'submit', 'reset'])
        }
      },
      icon: String,
      long: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showSlot: true
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {

          }
        ]
      }
    },
    methods: {
      handleClick (event) {
        this.$emit('click', event)
      }
    },
    mounted () {
      this.showSlot = this.$slots.default !== undefined
    }
  }
</script>

<template>
  <div class="popover-button" v-bind:class="{ open: isOpen, [name]: true }">
    <div class="popover__face" :aria-owns="id" v-on:click="onPopoverToggle">
      <slot name="face">
        <a href="#">popover</a>
      </slot>
    </div>

    <div class="popover is-bottom-left" :id="id" v-if="isOpen" v-on:click="onPopoverContentClick">
      <div class="popover__arrow"></div>
      <div class="popover__inner">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  const popovers = []
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      closeOnContentClick: {
        'default': true,
        type: Boolean,
        required: false
      }
    },
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      onPopoverToggle (e) {
        e.stopPropagation()
        if (this.isOpen) {
          this.isOpen = false
          this.$emit('popover:close')
          return
        }
        const length = popovers.length
        if (length > 1) {
          for (let i = 0; i < length; i++) {
            const popover = popovers[i]
            if (popover.isOpen) {
              popover.isOpen = false
              this.$emit('popover:close')
            }
          }
        }
        this.isOpen = true
        document.documentElement.addEventListener('click', this.onDocumentClick, false)
        this.$emit('popover:open')
      },
      onDocumentClick () {
        this.isOpen = false
        this.$emit('popover:close')
      },
      onPopoverContentClick (e) {
        e.stopPropagation()
        if (this.closeOnContentClick) {
          this.isOpen = false
          this.$emit('popover:close')
        }
      },
      removeDocumentEvent () {
        document.documentElement.removeEventListener('click', this.onDocumentClick, false)
      }
    },
    computed: {
      id () {
        return `popover-${this.name}`
      }
    },
    mounted () {
      popovers.push(this)
      this.$on('popover:close', this.removeDocumentEvent)
    },
    beforeDestroy () {
      this.removeDocumentEvent()
      popovers.length = 0
    }
  }
</script>

<style lang="scss">
  //**
  // Popover variables
  //-- Variables may be overridden
  //**

  //-- Global UI
  .popover-button {
    position: relative;
    /*&__container {*/
      /*position: absolute;*/
      /*z-index: 100;*/
      /*left: 0;*/
    /*}*/
  }
  .default,
  .custom-face {
    .popover {
      &__container {
        ul {
          margin: 0;
          padding: 5px 0;
          list-style: none;
          background: white;
          -webkit-box-shadow: 0 2px 11px -1px rgba(0,0,0,0.51);
          -moz-box-shadow: 0 2px 11px -1px rgba(0,0,0,0.51);
          box-shadow: 0 2px 11px -1px rgba(0,0,0,0.51);
        }
        a {
          display: block;
          text-decoration: none;
          padding: 8px 10px;
          color: black;
          transition: background 0.3s ease;
          &:hover {
            background: lightgray;
          }
        }
      }
    }
  }
</style>

<template>
  <div :class="classes">
    <span class="notice__icon-wrapper">
      <i class="notice__icon"></i>
    </span>
    <span class="notice__content">
      <span class="notice__text">
        <slot></slot>
      </span>
    </span>
    <span tabindex="0" class="notice__dismiss">
      <svg class="gridicon gridicons-cross" height="24" width="24"
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
        d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"></path></g></svg><span
      class="notice__screen-reader-text screen-reader-text">不再显示</span></span>
  </div>
</template>

<script>
  import {oneOf} from '../../utils/assist'

  export default {
    props: {
      status: {
        validator (value) {
          return oneOf(value, ['is-error', 'is-info', 'is-success', 'is-warning', 'is-plain'])
        }
      },
      text: String,
      title: {
        type: String
      },
      isCompact: {
        type: Boolean
      },
      showDismiss: {
        type: Boolean
      }
    },
    name: 'Notice',
    computed: {
      getIcon () {
        let icon;

        switch (this.status) {
          case 'is-info':
            icon = 'info';
            break;
          case 'is-success':
            icon = 'checkmark';
            break;
          case 'is-error':
            icon = 'notice';
            break;
          case 'is-warning':
            icon = 'notice';
            break;
          default:
            icon = 'info';
            break;
        }

        return icon;
      }
    }

  }

</script>

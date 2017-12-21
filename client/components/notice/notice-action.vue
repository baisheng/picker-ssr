<template>
  <a>
    <span>
      <slot></slot>
    </span>
  </a>
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
      attributes () {},
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

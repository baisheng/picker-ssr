<template>
  <div :class="classes" style="">
    <svg class="spinner__image" :width="size" :height="size" viewBox="0 0 100 100">
      <defs>
        <mask id="maskBorder8">
          <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
          <circle r="46%" cx="50%" cy="50%" fill="black"></circle>
        </mask>
        <mask id="maskDonut8">
          <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
          <circle r="46%" cx="50%" cy="50%" fill="white"></circle>
          <circle r="30%" cx="50%" cy="50%" fill="black"></circle>
        </mask>
        <mask id="maskLeft8">
          <rect x="0" y="0" width="50%" height="100%" fill="white"></rect>
        </mask>
        <mask id="maskRight8">
          <rect x="50%" y="0" width="50%" height="100%" fill="white"></rect>
        </mask>
      </defs>
      <circle class="spinner__border" r="50%" cx="50%" cy="50%" mask="url( #maskBorder8 )"></circle>
      <g mask="url( #maskDonut8 )">
        <g mask="url( #maskLeft8 )">
          <rect class="spinner__progress is-left" x="0" y="0" width="50%" height="100%"></rect>
        </g>
        <g mask="url( #maskRight8 )">
          <rect class="spinner__progress is-right" x="50%" y="0" width="50%" height="100%"></rect>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
  /**
   * Constants
   */

  /**
   * Defines whether the current browser supports CSS animations for SVG
   * elements. Specifically, this returns false for Internet Explorer and Edge.
   *
   * @type {Boolean} True if the browser supports CSS animations for SVG
   *                 elements, or false otherwise.
   */
  const isSVGCSSAnimationSupported = (() => {
    if (!global.window) {
      return false;
    }

    return !/(MSIE |Trident\/|Edge\/)/.test(global.window.navigator.userAgent);
  })()
//  const instances = 0

  export default {
    name: 'spinner',
    props: {
      className: {
        type: String
      },
      size: {
        type: Number,
        default: 20
      },
      duration: {
        type: Number,
        default: 3000
      }
    },
    data () {
      return {
        instanceId: 0
      }
    },
    computed: {
      classes () {
        return [
          'spinner',
          this.className
//          {
//            'is-fallback': !isSVGCSSAnimationSupported
//          }
        ]
      }
    }
  }
</script>

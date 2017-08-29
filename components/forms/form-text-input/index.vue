<template>
  <input :ref=" inputRef || 'textField' " :class="classes" type="text" @click="selectOnFocus"/>
</template>
<script>
  export default {
    props: {
      isError: Boolean,
      isValid: Boolean,
      className: String,
      inputRef: String
    },
    computed: {
      classes () {
        return [
          'form-text-input',
          this.className,
          {
            'is-error': this.isError,
            'is-valid': this.isValid
          }
        ]
      }
    },
    methods: {
      focus () {
        this.$refs.textField.focus()
      },
      selectOnFocus () {
      }
    }
  }
</script>

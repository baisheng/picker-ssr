<template>
  <fieldset class="form-fieldset">
    <label for="password" class="form-label">{{ label }}</label>
    <div class="form-password-input">
      <form-text-input
        :class="{'input': true, 'is-error': errors.has('user_pass')}"
        autocomplete="off"
        ref="textField"
        id="password"
        name="user_pass"
        v-validate="'min:6'"
        v-model="password"
        :type="hidden ? 'password' : 'text'"
        @on-keyup="$emit('validate', errors.has('user_pass'))" @on-input-change="setValue" :value="value">

      </form-text-input>
      <span :class="toggleVisibilityClasses" @click="togglePasswordVisibility">
      <!--<icon :name="hidden ? 'eye-slash' : 'eye'" class="gridicon"></icon>-->
      <svg class="gridicon gridicons-not-visible"
           height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-if="hidden"><g><path
        d="M1 12s4.188-6 11-6c.947 0 1.84.12 2.678.322L8.36 12.64C8.133 12.14 8 11.586 8 11c0-.937.335-1.787.875-2.47C6.483 9.344 4.66 10.917 3.62 12c.68.707 1.696 1.62 2.98 2.398L5.15 15.85C2.498 14.13 1 12 1 12zm22 0s-4.188 6-11 6c-.946 0-1.836-.124-2.676-.323L5 22l-1.5-1.5 17-17L22 5l-3.147 3.147C21.5 9.87 23 12 23 12zm-2.615.006c-.678-.708-1.697-1.624-2.987-2.403L16 11c0 2.21-1.79 4-4 4l-.947.947c.31.03.624.053.947.053 3.978 0 6.943-2.478 8.385-3.994z"></path></g></svg>
      <svg class="gridicon gridicons-visible" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24" v-else>
        <g><path
          d="M12 6C5.188 6 1 12 1 12s4.188 6 11 6 11-6 11-6-4.188-6-11-6zm0 10c-3.943 0-6.926-2.484-8.38-4 1.04-1.085 2.863-2.657 5.255-3.47C8.335 9.214 8 10.064 8 11c0 2.21 1.79 4 4 4s4-1.79 4-4c0-.937-.335-1.787-.875-2.47 2.393.813 4.216 2.386 5.254 3.47-1.456 1.518-4.438 4-8.38 4z"></path></g>
      </svg>
    </span>
      <form-input-validation :isError="errors.has('user_pass')" v-show="errors.has('user_pass')">
        {{ errors.first('user_pass') }}
      </form-input-validation>
    </div>
    <p class="form-setting-explanation">{{explanation}}</p>
  </fieldset>
</template>
<script>
  import FormInputValidation from '~/components/forms/form-input-validation'
  import FormTextInput from '~/components/forms/form-text-input'

  export default {
    name: 'FormPasswordInput',
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      label: {
        type: String,
        default: '密码'
      },
      explanation: String,
      hideToggle: Boolean
    },
    data () {
      return {
        password: '',
        hidePassword: true
      }
    },
    components: {
      FormTextInput,
      FormInputValidation
    },
    methods: {
      togglePasswordVisibility () {
        this.hidePassword = !this.hidePassword
      },
      setValue (event) {
        this.$emit('input-change', event.target.value)
      }
    },
    watch: {
      value (val) {
        console.log(val);
//        this.visible = val;
      },
      visible (val) {
//        this.$emit('input', val);
      }
    },
    mounted () {
    },
    computed: {
      hidden () {
        if (this.hideToggle) {
          return true
        }
        return this.hidePassword
      },
      toggleVisibilityClasses () {
        return [{
          'form-password-input__toggle': true,
          'form-password-input__toggle-visibility': !this.hideToggle
        }]
      }
    }
  }
</script>

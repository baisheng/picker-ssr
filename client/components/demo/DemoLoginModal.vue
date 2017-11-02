<template>
  <modal name="demo-login" transition="pop-out" :width="720" :height="400">
    <div class="dialog card term-form-dialog  ">
      <form @submit.prevent="handleSubmit">

        <div class="dialog__content" tabindex="-1">
          <h3 class="form-section-heading">添加新分类</h3>

          <fieldset class="form-fieldset">
            <input id="categoryName" name="cate_name" class="form-text-input login__form-userdata-username-input"
                   v-model="form.name" v-validate="'required'"
                   :class="{'input': true, 'is-danger': errors.has('cate_name') }" type="text" placeholder="分类名">
            <form-input-validation :isError="errors.has('cate_name')" v-show="errors.has('cate_name')">
              {{ errors.first('cate_name') }}
            </form-input-validation>
            <form-input-validation :isError="errors.has('cate_err')" v-show="errors.has('cate_err')">
              {{ errors.first('cate_err') }}
            </form-input-validation>
          </fieldset>
          <fieldset class="form-fieldset">
            <legend class="form-legend">描述</legend>
            <textarea class="form-textarea" v-model="form.decription"></textarea>
          </fieldset>
        </div>
        <div class="dialog__action-buttons">
          <button class="button" @click="hide">
            <span class="dialog__button-label">取消</span>
          </button>
          <button class="button is-primary" :disabled="isDisabled" type="submit">
            <span class="dialog__button-label">添加</span>
          </button>
        </div>
      </form>
    </div>

  </modal>
</template>
<script>
  import FormInputValidation from '~/components/forms/form-input-validation'

  //  const MODAL_WIDTH = 720
  export default {
    name: 'DemoLoginModal',
    components: {
      FormInputValidation
    },
    data () {
      return {
        form: {
          name: '',
          decription: ''
        }
//        modalWidth: MODAL_WIDTH
      }
    },
    computed: {
      isDisabled () {
        return this.form.name === ""
      }
    },
    methods: {
      hide () {
        this.form = {
          cate_name: '',
          cate_description: ''
        }
        this.$modal.hide('demo-login');
      },
      async handleSubmit () {
        const that = this
        await this.$validator.validateAll().then(async (result) => {
          if (result) {
            console.log(result)
            const data = await this.$store.dispatch('newCategory', {form: this.form})
            if (data) {
              this.errors.add('cate_err', data.errmsg)
            } else {
              this.hide()
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .form-legend {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  $background_color: #404142;
  $github_color: #DBA226;
  $facebook_color: #3880FF;

  .pop-out-enter-active,
  .pop-out-leave-active {
    transition: all 0.5s;
  }

  .pop-out-enter,
  .pop-out-leave-active {
    opacity: 0;
    transform: translateY(24px);
  }
</style>

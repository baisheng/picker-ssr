<template>
  <main class="picker-login__main main">
    <div class="picker-login__container">
      <div class="login__form-header-wrapper">
        <div class="login__form-header">登录到您的帐户。</div>
      </div>
      <card className="login__form">


        <div class="login__form-userdata">

          <label for="usernameOrEmail"
                                                 class="login__form-userdata-username">用户名或电子邮件地址</label><input
          type="text" autocapitalize="off" class="form-text-input login__form-userdata-username-input"
          id="usernameOrEmail" name="usernameOrEmail" value="baisheng@outlook.com">

          <!--<label for="password"-->
                                                                                          <!--class="login__form-userdata-username">密码</label>-->
          <!--<div class="form-password-input"><input type="password" autocapitalize="off" autocomplete="off"-->
                                                  <!--class="form-text-input login__form-userdata-username-password"-->
                                                  <!--id="password" name="password" value="deadline-123"><span-->
            <!--class="form-password-input__toggle form-password-input__toggle-visibility"><svg-->
            <!--class="gridicon gridicons-not-visible" height="24" width="24" xmlns="http://www.w3.org/2000/svg"-->
            <!--viewBox="0 0 24 24"><g><path-->
            <!--d="M1 12s4.188-6 11-6c.947 0 1.84.12 2.678.322L8.36 12.64C8.133 12.14 8 11.586 8 11c0-.937.335-1.787.875-2.47C6.483 9.344 4.66 10.917 3.62 12c.68.707 1.696 1.62 2.98 2.398L5.15 15.85C2.498 14.13 1 12 1 12zm22 0s-4.188 6-11 6c-.946 0-1.836-.124-2.676-.323L5 22l-1.5-1.5 17-17L22 5l-3.147 3.147C21.5 9.87 23 12 23 12zm-2.615.006c-.678-.708-1.697-1.624-2.987-2.403L16 11c0 2.21-1.79 4-4 4l-.947.947c.31.03.624.053.947.053 3.978 0 6.943-2.478 8.385-3.994z"></path></g></svg></span>-->
          <!--</div>-->

          <label for="password" class="login__form-userdata-username">
            密码
          </label>
          <form-password-input name="password" id="password" autocapitalize="off" autocomplete="off"/>
        </div>

        <p class="login__form-terms"><!-- react-text: 46 -->通过以下任意选项登录即表示，您同意我们的<!-- /react-text --><a href="//picker.cc/tos/" target="_blank" rel="noopener noreferrer">服务条款</a><!-- react-text: 48 -->。<!-- /react-text --></p>
        <div class="login__form-action"><button type="submit" class="button form-button is-primary">登录</button></div>
      </card>
      <card href="http://baidu.com" target="_blank">think is </card>

    </div>
    <div class="picker-login__links"><a href="https://zh-cn.picker.cc/picker-login.php?action=lostpassword" rel="external">忘记密码？</a><a href="https://zh-cn.picker.cc" rel="external"><svg class="gridicon gridicons-arrow-left needs-offset-y" height="18" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g></svg><!-- react-text: 71 -->返回 picker.cc<!-- /react-text --></a></div>
  </main>
</template>

<script>
  import Card from '~/components/card'
  import FormPasswordInput from '~/components/forms/form-password-input'
  //  import Main from '~/components/main'
  export default {
    layout: 'logged-out',
    components: {
      Card,
      FormPasswordInput
    }
  }
</script>

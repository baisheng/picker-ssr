<template>
  <main data-reactroot="" class="profile main" role="main">
    <header class="current-section"><a>
      <svg class="gridicon gridicons-chevron-left" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24">
        <g>
          <path d="M14 20l-8-8 8-8 1.414 1.414L8.828 12l6.586 6.586"></path>
        </g>
      </svg>
      <img alt="bluepx" class="gravatar"
           src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=400&amp;d=mm" width="30" height="30">
      <div><p class="current-section__me-title">我</p>
        <h1 class="current-section__section-title">我的个人资料</h1></div>
    </a></header><!-- react-empty: 19809 -->
    <div class="card section-header is-compact">
      <div class="section-header__label"><span class="section-header__label-text">个人资料</span></div>
      <div class="section-header__actions"></div>
    </div>
    <div class="card me-profile-settings">
      <div class="edit-gravatar">
        <div><span class="file-picker"><div class="edit-gravatar__image-container"><div class="drop-zone"><div
          class="drop-zone__content"><div><span class="drop-zone__content-icon"><svg
          class="gridicon gridicons-cloud-upload" height="48" width="48" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"><g><path
          d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path></g></svg></span><span
          class="drop-zone__content-text">拖放以上传个人资料照片</span></div></div></div><img alt="bluepx" class="gravatar"
                                                                                   src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=400&amp;d=mm"
                                                                                   width="150" height="150"><div
          class="edit-gravatar__label-container"><svg class="gridicon gridicons-cloud-upload" height="36" width="36"
                                                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
          d="M18 9c-.01 0-.017.002-.025.003C17.72 5.646 14.922 3 11.5 3 7.91 3 5 5.91 5 9.5c0 .524.07 1.03.186 1.52C5.123 11.015 5.064 11 5 11c-2.21 0-4 1.79-4 4 0 1.202.54 2.267 1.38 3h18.593C22.196 17.09 23 15.643 23 14c0-2.76-2.24-5-5-5zm-5 4v3h-2v-3H8l4-5 4 5h-3z"></path></g></svg><span
          class="edit-gravatar__label">点击以更换照片</span></div></div></span></div>
        <div><p class="edit-gravatar__explanation">您的个人资料照片处于公开状态。</p><span
          class="info-popover edit-gravatar__pop-over"><svg class="gridicon gridicons-info-outline needs-offset"
                                                            height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"><g><path
          d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg>
          <!-- react-empty: 19839 --></span></div>
      </div>
      <form>
        <fieldset class="form-fieldset"><label for="first_name" class="form-label"><!-- react-text: 19843 -->名字
          <!-- /react-text --></label><input type="text" id="first_name" name="first_name" class="form-text-input"
                                             value=""></fieldset>
        <fieldset class="form-fieldset"><label for="last_name" class="form-label"><!-- react-text: 19847 -->姓氏
          <!-- /react-text --></label><input type="text" id="last_name" name="last_name" class="form-text-input"
                                             value=""></fieldset>
        <fieldset class="form-fieldset"><label for="display_name" class="form-label"><!-- react-text: 19851 -->公共显示名称
          <!-- /react-text --></label><input type="text" id="display_name" name="display_name" class="form-text-input"
                                             value="bluepx"></fieldset>
        <fieldset class="form-fieldset"><label for="description" class="form-label"><!-- react-text: 19855 -->关于我
          <!-- /react-text --></label><textarea id="description" name="description" class="form-textarea"></textarea>
        </fieldset>
        <p>
          <button disabled="" type="submit" class="button form-button is-primary">保存个人资料详细信息</button>
        </p>
      </form>
      <p class="me-profile-settings__info-text"><!-- react-text: 19860 -->此信息将公开显示在<!-- /react-text --><a
        href="https://gravatar.com/bluepx" target="_blank" rel="noopener noreferrer">您的个人资料</a>
        <!-- react-text: 19862 -->和 <!-- /react-text --><a href="https://support.wordpress.com/gravatar-hovercards/"
                                                           target="_blank"
                                                           rel="noopener noreferrer">Gravatar Hovercards</a>
        <!-- react-text: 19864 --> 中。<!-- /react-text --></p></div>
    <div>
      <div class="card section-header is-compact">
        <div class="section-header__label"><span class="section-header__label-text">个人资料链接</span></div>
        <div class="section-header__actions">
          <div><!-- react-empty: 19871 -->
            <button class="button popover-icon is-compact" type="button">
              <svg class="gridicon gridicons-add-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24">
                <g>
                  <path
                    d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"></path>
                </g>
              </svg><!-- react-text: 19876 -->添加<!-- /react-text --></button>
          </div>
        </div>
      </div>
      <div class="card">
        <div><p>管理个人资料中显示的站点。</p>
          <p class="profile-links__no-links">您没有在个人资料链接中设置站点。您可以添加站点，如果您愿意。</p></div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    layout: 'profile',
    name: 'me'
  }
</script>

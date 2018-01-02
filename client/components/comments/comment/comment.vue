<template>
  <div class="card comment">
    <div class="comment__detail">
      <div class="comment__header">
        <div class="comment__author">
          <div class="comment__author-avatar">
            <img alt="bluepxdf" class="gravatar"
                 src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=96&amp;d=mm&amp;r=G"
                 width="32" height="32"></div>
          <div class="comment__author-info">
            <div
              class="comment__author-info-element">
              <strong class="comment__author-name">
                <div class="emojify">bluepxdf</div>
              </strong>
            </div>
            <div class="comment__author-info-element">
                    <span class="comment__date">
                  <a href="/comment/caixieblog.wordpress.com/10" tabindex="0"
                     title="2017年12月21日 15:39"> {{ $moment(item.date).fromNow() }}</a></span>
              <span
                class="comment__author-url"><span class="comment__author-url-separator">·</span><a
                href="http://bluepx.wordpress.com" tabindex="0" class="external-link" rel="external"><div
                class="emojify">bluepx.wordpress.com</div></a></span></div>
          </div>
        </div>
        <div
          class="comment__author-more-info">
          <button type="button" class="button is-borderless">
            <svg
              class="gridicon gridicons-info-outline needs-offset" height="18" width="18"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g>
                <path
                  d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path>
              </g>
            </svg>
            用户信息
          </button>
        </div>
      </div>
      <div
        class="comment__content">
        <div class="comment__content-full">
          <div class="comment__content-info">
            <div
              class="comment__post-link">
              <svg class="gridicon gridicons-posts needs-offset" height="18" width="18"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                  <path
                    d="M16 19H3v-2h13v2zm5-10H3v2h18V9zM3 5v2h11V5H3zm14 0v2h4V5h-4zm-6 8v2h10v-2H11zm-8 0v2h5v-2H3z"></path>
                </g>
              </svg>
              <a
                href="/comments/approved/caixieblog.wordpress.com/6" tabindex="0">Blog post title</a></div>
          </div>
          <div
            class="emojify">
            <div class="comment__content-body">
              <p v-html="item.content"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="comment__actions">
        <button
          class="button comment__action comment__action-approve is-approved is-borderless" tabindex="0" type="button">
          <svg
            class="gridicon gridicons-checkmark-circle" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <g>
              <path
                d="M11 17.768l-4.884-4.884 1.768-1.768L11 14.232l8.658-8.658C17.823 3.39 15.075 2 12 2 6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10c0-1.528-.353-2.97-.966-4.266L11 17.768z"></path>
            </g>
          </svg>
          <span>已审核</span></button>
        <button
          class="button comment__action comment__action-spam is-borderless" tabindex="0" type="button">
          <svg
            class="gridicon gridicons-spam" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <g>
              <path
                d="M17 2H7L2 7v10l5 5h10l5-5V7l-5-5zm-4 15h-2v-2h2v2zm0-4h-2l-.5-6h3l-.5 6z"></path>
            </g>
          </svg>
          <span>垃圾评论</span></button>
        <button
          class="button comment__action comment__action-trash is-borderless" tabindex="0" type="button">
          <svg
            class="gridicon gridicons-trash" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <g>
              <path
                d="M6.187 8h11.625l-.695 11.125C17.05 20.18 16.177 21 15.12 21H8.88c-1.057 0-1.93-.82-1.997-1.875L6.187 8zM19 5v2H5V5h3V4c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2v1h3zm-9 0h4V4h-4v1z"></path>
            </g>
          </svg>
          <span>回收站</span></button>
        <button
          class="button comment__action comment__action-like is-borderless" tabindex="0" type="button">
          <svg
            class="gridicon gridicons-star-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <g>
              <path
                d="M12 6.308l1.176 3.167.347.936.997.042 3.374.14-2.647 2.09-.784.62.27.963.91 3.25-2.813-1.872-.83-.553-.83.552-2.814 1.87.91-3.248.27-.962-.783-.62-2.648-2.092 3.374-.14.996-.04.347-.936L12 6.308M12 2L9.418 8.953 2 9.257l5.822 4.602L5.82 21 12 16.89 18.18 21l-2.002-7.14L22 9.256l-7.418-.305L12 2z"></path>
            </g>
          </svg>
          <span>赞</span></button>
        <button
          class="button comment__action comment__action-pencil is-borderless" tabindex="0" type="button">
          <svg
            class="gridicon gridicons-pencil" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <g>
              <path
                d="M13 6l5 5-9.507 9.507c-.686-.686-.69-1.794-.012-2.485l-.002-.003c-.69.676-1.8.673-2.485-.013-.677-.677-.686-1.762-.036-2.455l-.008-.008c-.694.65-1.78.64-2.456-.036L13 6zm7.586-.414l-2.172-2.172c-.78-.78-2.047-.78-2.828 0L14 5l5 5 1.586-1.586c.78-.78.78-2.047 0-2.828zM3 18v3h3c0-1.657-1.343-3-3-3z"></path>
            </g>
          </svg>
          <span>编辑</span></button>
        <button
          class="button comment__action comment__action-reply is-borderless" tabindex="0" type="button">
          <svg
            class="gridicon gridicons-reply" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <g>
              <path
                d="M9 16h7.2l-2.6 2.6L15 20l5-5-5-5-1.4 1.4 2.6 2.6H9c-2.2 0-4-1.8-4-4s1.8-4 4-4h2V4H9c-3.3 0-6 2.7-6 6s2.7 6 6 6z"></path>
            </g>
          </svg>
          <span>回复</span></button>
      </div>
      <form
        class="comment__reply"><textarea class="comment__reply-textarea" placeholder="回复 bluepxdf…"
                                         style="height: 47px;"></textarea>
        <button
          class="button comment__reply-submit is-compact is-borderless" disabled="" tabindex="0"
          type="button">发送
        </button>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      item: {
        type: Object,
        require: true
      },
      post: {},
      author: {},
      comment: {}
    },
    mounted () {
      // (async () => {
      //   this.episode = (await this.$axios.get(`/apps/${this.$store.getters.appId}/posts/${this.item.id}`)).data.data
      //   if (this.episode !== null) {
      //     this.isLoading = false
      //   }
      // })()
    },
  }
</script>

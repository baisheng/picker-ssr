<template>
  <div class="section-nav comment-navigation">
    <div class="section-nav__mobile-header"><span class="section-nav__mobile-header-text">全部</span></div>
    <div class="section-nav__panel">
      <div class="section-nav-group">
        <div class="section-nav-tabs">
          <ul class="section-nav-tabs__list" role="menu">
            <li class="is-selected section-nav-tab">
              <a href="/comments/all/caixieblog.wordpress.com"
                 class="section-nav-tab__link" tabindex="0"
                 aria-selected="true" role="menuitem"><span
                class="section-nav-tab__text">全部</span></a>
            </li>
            <li class="section-nav-tab">
              <a href="/comments/pending/caixieblog.wordpress.com"
                 class="section-nav-tab__link" tabindex="0" aria-selected="false"
                 role="menuitem">
                <span class="section-nav-tab__text">条未审核</span>
              </a>
            </li>
            <li class="section-nav-tab">
              <a href="/comments/approved/caixieblog.wordpress.com"
                 class="section-nav-tab__link" tabindex="0" aria-selected="false"
                 role="menuitem">
                <span class="section-nav-tab__text">已审核</span>
              </a>
            </li>
            <li class="section-nav-tab">
              <a href="/comments/spam/caixieblog.wordpress.com"
                 class="section-nav-tab__link" tabindex="0" aria-selected="false"
                 role="menuitem">
                <span class="section-nav-tab__text">垃圾评论</span>
              </a>
            </li>
            <li class="section-nav-tab">
              <a href="/comments/trash/caixieblog.wordpress.com"
                 class="section-nav-tab__link" tabindex="0" aria-selected="false"
                 role="menuitem">
                <span class="section-nav-tab__text">回收站</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <comment-navigation-tab></comment-navigation-tab>
    </div>
  </div>
</template>
<script>
  import CommentNavigationTab from './comment-navigation-tab'
  export default {
    components: {
      CommentNavigationTab
    }
  }
</script>

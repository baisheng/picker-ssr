<template>
  <div class="layout has-no-sidebar focus-content">
    <masterbar-logged-out :title="title" :sectionName="name"/>
    <div id="content" class="layout__content">
      <div id="primary" class="layout__primary">
        <nuxt/>
      </div>
      <div id="secondary" class="layout__secondary"></div>
    </div>
  </div>
</template>

<script>
  import MasterbarLoggedOut from './masterbar/logged-out.vue'
  export default {
    name: 'logged-out',
    props: {
      title: String,
      name: String
    },
    components: {
      MasterbarLoggedOut
    },
    computed: {
    }
  }
</script>

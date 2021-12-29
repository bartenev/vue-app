<template>
  <div class="app-layout-main">
    <AppLayoutHeader/>
    <div class="content">
      <AppLayoutSidebar/>
      <slot />
    </div>
  </div>

</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader";
import AppLayoutSidebar from "./AppLayoutSidebar";

export default {
  name: 'AppLayoutMain',

  components: {
    AppLayoutHeader,
    AppLayoutSidebar
  },

  props: {

  },

  methods: {

  }
}

</script>

<style scoped>

</style>

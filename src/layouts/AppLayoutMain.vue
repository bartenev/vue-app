<template>
  <div class="app-layout-main">
    <Header/>
    <div class="content">
      <Sidebar/>
      <slot />
    </div>
  </div>

</template>

<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default {
  name: 'AppLayoutMain',

  components: {
    Header,
    Sidebar
  },
}

</script>

<style scoped>

</style>

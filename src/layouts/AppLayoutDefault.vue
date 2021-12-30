<template>
  <div class="app-layout-default">
    <Header/>
    <slot />
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: 'AppLayoutDefault',

  components: {
    Header
  },
};
</script>

<style scoped>

.app-layout-default {
  width: 900px;
  margin: 0 auto;
}

</style>

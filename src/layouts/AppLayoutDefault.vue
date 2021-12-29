<template>
  <div class="app-layout-default">
    <AppLayoutHeader/>
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader";

export default {
  name: 'AppLayoutDefault',

  components: {
    AppLayoutHeader
  },

  props: {

  }

};
</script>

<style scoped>

.app-layout-default {
  width: 900px;
  margin: 0 auto;
}

</style>

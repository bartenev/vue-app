<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = 'AppLayoutDefault';

export default {
  name: 'AppLayout',

  props: {

  },

  methods: {

  },

  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  }
}

</script>

<style scoped>

</style>

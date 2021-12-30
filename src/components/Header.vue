<template>
  <header class="header">
    <nav class="header__nav nav">
      <router-link to="/" class="nav__link" :class="{'nav__link--active': path === '/'}">Home</router-link>
      <router-link to="/posts" class="nav__link" :class="{'nav__link--active': path === '/posts'}">Posts</router-link>
    </nav>
  </header>
</template>

<script>

export default {
  name: 'Header',

  data() {
    return {
      path: this.$route.path,
    }
  },

}

</script>

<style scoped>

.header {
  margin-bottom: 30px;
  box-sizing: border-box;
  background-color: lightgray;
}

.header__nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.nav__link {
  box-sizing: border-box;
  padding: 20px;
  color: black;
  text-decoration: none;
}

.nav__link--active,
.nav__link:hover {
  color: white;
  background-color: black;
}

</style>

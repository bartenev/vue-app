<template>
  <section class="posts">
    <h2>Posts</h2>
    <form class="posts__filter filter">
      <div class="filter__field">
        <label for="search">Найти:</label>
        <input
            v-model="filters.search"
            id="search"
            type="text"
        >
      </div>
      <div class="filter__field">
        <label for="userId">Фильтр по userId:</label>
        <select
            v-model="filters.userId"
            id="userId"
        >
          <option :value="null"></option>
          <option
              v-for="id in getUserIds"
              :key="id"
              :value="id"
          >
            {{id}}
          </option>
        </select>
      </div>
      <div class="filter__field">
        <input type="submit" value="Отфильтровать" @click.prevent="onClickSubmitFilter">
      </div>
    </form>
    <ul class="posts__list">
      <li
          class="posts__item"
          v-for="post in getFilteredPosts"
          :key="post.id"
          @click="onClickPost"
      >
        <Post :data="{title: post.title, description: post.description, userId: post.userId}"/>
      </li>
    </ul>
  </section>
</template>

<script>

import Post from "./Post";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: 'Posts',
  components: {Post},
  data() {
    return {
      filters: {
        search: '',
        userId: null,
      }
    }
  },
  computed: {
    ...mapGetters(["getFilteredPosts", "getUserIds"]),
  },
  methods: {
    ...mapMutations(["setFilters", "clearPostsIdByUserId"]),
    ...mapActions(["getPostsByUserId"]),
    onClickSubmitFilter() {
      if (this.filters.userId) {
        this.getPostsByUserId(this.filters.userId);
      } else {
        this.clearPostsIdByUserId();
      }
      this.setFilters(this.filters.search);
    },
    onClickPost () {
      console.log(`click`)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.posts {
  width: 900px;
  margin: auto;
}
.posts__filter {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 250px;
}
.filter__field {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 250px;
  margin-bottom: 20px;
  height: 20px;
}

.posts__list {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
.posts__item {
  list-style: none;
  margin-right: 75px;
  margin-bottom: 75px;
}
.posts__item:nth-child(3n) {
  margin-right: 0;
}
</style>

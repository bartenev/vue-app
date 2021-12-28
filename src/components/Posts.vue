<template>
  <section class="posts">
    <h2>Posts ({{getFilteredPosts.length}})</h2>
    <form class="posts__filter filter">
      <div class="filter__field">
        <label class="filter__label" for="search">Ключевое слово</label>
        <input
            class="filter__input"
            v-model="filters.search"
            id="search"
            type="text"
        >
      </div>
      <div class="filter__field">
        <label class="filter__label" for="userId">userId</label>
        <select
            class="filter__input"
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
      <input
          class="filter__submit"
          type="submit"
          value="Применить"
          @click.prevent="onClickSubmitFilter"
          :disabled="!checkForm"
      >

      <input
          class="filter__reset"
          type="reset"
          value="Очистить"
          @click.prevent="onClickResetFilter"
      >
    </form>
    <ul class="posts__list">
      <li
          class="posts__item"
          v-for="post in getFilteredPosts"
          :key="post.id"
          :id="post.id"
          @click="onClickPost($event)"
      >
        <Post
            :data="{title: post.title, description: post.description, userId: post.userId, id: post.id}"
            :isPostPage="false"
            :isEdit="false"
        />
      </li>
    </ul>
  </section>
</template>

<script>

import Post from "./Post";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Posts',

  components: {Post},

  data() {
    return {
      filters: {
        search: '',
        userId: null,
      },
      isFilter: false,
    }
  },

  created() {
    this.fetchData()
  },

  computed: {
    ...mapGetters(["getFilteredPosts", "getUserIds"]),

    checkForm() {
      return !!(this.filters.search || this.filters.userId);
    },
  },

  methods: {
    ...mapActions(["GET_POSTS", "GET_POST_IDS_BY_USER_ID", "SET_FILTERS", "CLEAR_POSTS_ID_BY_USER_ID"]),

    onClickSubmitFilter() {
      if (this.filters.userId) {
        this.GET_POST_IDS_BY_USER_ID(this.filters.userId);
      } else {
        this.CLEAR_POSTS_ID_BY_USER_ID();
      }
      this.SET_FILTERS(this.filters.search);
    },

    onClickResetFilter() {
      this.filters.userId = null;
      this.filters.search = '';

      this.CLEAR_POSTS_ID_BY_USER_ID();
      this.SET_FILTERS('');
    },

    onClickPost (evt) {
      if (evt.target.tagName !== "BUTTON") {
        const ID = evt.currentTarget.id;
        this.$router.push({path: `/posts/${ID}`});
      }
    },

    fetchData() {
      this.GET_POSTS()
    },

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

  width: 280px;
  margin-left: auto;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 20px;
  border: 2px solid lightgray;
}

.filter__field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0 20px;
}

.filter__input:hover,
.filter__submit:hover,
.filter__reset:hover {
  border: 2px solid black;
}

.filter__field:last-of-type {
  border: none;
}

.filter__input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 2px solid lightgray;
  font: inherit;
}

.filter__label {
  margin-bottom: 10px;
}

.filter__submit,
.filter__reset {
  padding: 10px;
  border: 2px solid lightgray;
  background-color: transparent;
  font: inherit;
  cursor: pointer;
}

.filter__submit {
  margin-bottom: 20px;
}

.filter__submit:disabled {
  background-color: lightgray;
  cursor: not-allowed;
}

.posts__list {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}

.posts__item {
  list-style: none;
  margin-right: 30px;
  margin-bottom: 30px;
}

.posts__item:nth-child(3n) {
  margin-right: 0;
}

</style>

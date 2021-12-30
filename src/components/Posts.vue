<template>
  <section class="posts">
    <div class="posts__container">
      <h2 class="posts__title">Posts ({{getFilteredPosts.length}})</h2>
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
    </div>
    <ul class="posts__list">
      <li
          class="posts__item"
          v-for="post in getPosts"
          :key="post.id"
          :id="post.id"
          @click="onClickPost($event)"
      >
        <Post
            :data="post"
            :isPostPage="false"
            :isEdit="false"
            @onClickUserId="onClickUserId"
        />
      </li>
    </ul>
    <ul class="posts__pagination pagination__list">
      <li
          class="pagination__item"
          :class="{'pagination__item--current': pageNumber === currentPageNumber}"
          v-for="pageNumber in getPageNumbers"
          :key="pageNumber"
          @click="onPaginationClick($event)"
      >
        {{pageNumber}}
      </li>

    </ul>
  </section>
</template>

<script>

import Post from "./Post";
import {mapState, mapActions, mapGetters} from "vuex";

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
    if (!this.posts.length) {
      this.fetchData();
    }

    this.onClickResetFilter()
  },

  computed: {
    ...mapState(["posts", "currentPageNumber"]),

    ...mapGetters(["getFilteredPosts", "getPosts", "getUserIds", "getPageNumbers"]),

    checkForm() {
      return !!(this.filters.search || this.filters.userId);
    },
  },

  methods: {
    ...mapActions(["GET_POSTS", "GET_POST_IDS_BY_USER_ID", "SET_FILTERS",
      "CLEAR_POSTS_ID_BY_USER_ID", "CHANGE_CURRENT_PAGE_NUMBER", "SET_DEFAULT_CURRENT_PAGE_NUMBER"]),

    onClickSubmitFilter() {
      if (this.filters.userId) {
        this.GET_POST_IDS_BY_USER_ID(this.filters.userId);
      } else {
        this.CLEAR_POSTS_ID_BY_USER_ID();
      }
      this.SET_DEFAULT_CURRENT_PAGE_NUMBER();
      this.SET_FILTERS(this.filters.search);
    },

    onClickResetFilter() {
      this.filters.userId = null;
      this.filters.search = '';

      this.CLEAR_POSTS_ID_BY_USER_ID();
      this.SET_FILTERS('');
      this.SET_DEFAULT_CURRENT_PAGE_NUMBER();
    },

    onClickUserId(id) {
      this.filters.userId = id;
      this.onClickSubmitFilter();
    },

    onClickPost (evt) {
      if (evt.target.tagName !== "BUTTON") {
        const ID = evt.currentTarget.id;
        this.$router.push({path: `/posts/${ID}`});
      }
    },

    onPaginationClick (evt) {
      const PAGE_NUMBER = Number(evt.target.textContent);
      this.CHANGE_CURRENT_PAGE_NUMBER(PAGE_NUMBER);
    },

    fetchData() {
      this.GET_POSTS()
    },

  }
}

</script>

<style scoped>

.posts {
  width: 900px;
  margin: auto;
}

.posts__container {
  display: flex;
  margin-bottom: 30px;
}

.posts__title {
  width: 280px;
  margin: 0 30px 0 0;
}

.posts__filter {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  order: -1;

  width: 280px;
  margin-right: 30px;
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

.pagination__list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 30px;
  padding: 0;
}

.pagination__item {
  margin-right: 20px;
  margin-bottom: 20px;
  width: 50px;
  height: 50px;
  border: 2px solid lightgray;
  list-style: none;
  line-height: 50px;
  cursor: pointer;
}

.pagination__item:hover {
  border: 2px solid black;
}

.pagination__item--current {
  background-color: black;
  color: white;
}

</style>

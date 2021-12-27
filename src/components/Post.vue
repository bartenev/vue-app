<template>
  <article
      class="post"
      :class="{'post--page': isPostPage}"
  >
    <h2 class="post__title">{{data.title}}</h2>
    <p class="post__description">{{data.description}}</p>
    <p class="post__id">Пользователь №{{data.userId}}</p>
    <button class="post__delete" type="button" @click="onClickDeleteButton(data.id)">Удалить</button>
    <button class="post__edit" type="button" @click="onClickEditButton" v-if="isPostPage" aria-label="Редактировать">...</button>

  </article>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'Post',

  props: {
    data: Object,
    isPostPage: Boolean,
  },

  methods: {
    ...mapActions(["DELETE_POST_BY_ID"]),

    onClickDeleteButton (id) {
      this.DELETE_POST_BY_ID(id);
      if (this.isPostPage) {
        this.$router.push({path: `/posts`});
      }
    },

    onClickEditButton () {
      this.$emit('editPost', true)
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.post {
  position: relative;
  width: 280px;
  height: 210px;
  box-sizing: border-box;
  padding: 20px;
  border: 2px solid lightgray;
  cursor: pointer;
}

.post:hover {
  border: 2px solid black;
}

.post__title {
  height: 55px;
  margin: 0 0 20px;
  padding: 0 20px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post__description {
  height: 30px;
  margin: 0 0 20px;
  padding: 10px 20px;
  font-size: 14px;
  line-height: 30px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-top: 2px solid lightgray;
  border-bottom: 2px solid lightgray;
}

.post__id {
  margin: 0;
}

.post__delete {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 0;
  line-height: 0;
}

.post__delete:hover::before, .post__delete:hover::after {
  background-color: black;
}

.post__delete::before, .post__delete::after {
  position: absolute;
  top: 50%;
  left: 0;
  content: "";
  width: 20px;
  height: 2px;
  background-color: lightgray;
}

.post__delete:before {
  transform: rotate(45deg);
}

.post__delete:after {
  transform: rotate(-45deg);
}

.post__edit {
  position: absolute;
  top: 10px;
  right: 40px;
  width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 20px;
  color: lightgray;
}

.post__edit:hover {
  color: black;
}

.post--page{
  width: 100%;
  height: auto;
  cursor: auto;
}

.post--page:hover {
  border: 2px solid lightgray;
}

.post--page .post__title {
  height: auto;
  overflow: visible;
  text-overflow: clip;
}

.post--page .post__description{
  height: auto;
  overflow: visible;
  text-overflow: clip;
  white-space: normal;
  line-height: normal;
}

</style>

<template>
  <article class="post-edit">
    <div class="post-edit__block post-edit__title">
      <label for="post-edit__title">Заголовок:</label>
      <textarea class="post-edit__textarea" id="post-edit__title" v-model="title"></textarea>
    </div>

    <div class="post-edit__block post-edit__description">
      <label for="post-edit__description">Описание:</label>
      <textarea class="post-edit__textarea" id="post-edit__description" v-model="description"></textarea>
    </div>

    <button class="post-edit__save" type="button" @click="onClickSaveButton">Сохранить</button>
  </article>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: 'PostEdit',

  props: {
    data: Object,
  },

  data() {
    return {
      title: this.data.title,
      description: this.data.description,
      isEdit: false,
    }
  },

  methods: {
    ...mapActions(["EDIT_POST"]),

    onClickSaveButton () {
      const newData = {
        id: this.data.id,
        title: this.title,
        description: this.description,
      };

      this.EDIT_POST(newData);
      this.$emit('editPost', false)
    },
  },
}

</script>

<style scoped>

.post-edit__block {
  display: grid;
  grid-template-columns: 100px 1fr;
  column-gap: 50px;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  border: 2px solid lightgray;
  box-sizing: border-box;
}

.post-edit__block:hover .post-edit__textarea {
  border: 2px solid black;
}

.post-edit__title {
  height: 100px;
}

.post-edit__description {
  height: 150px;
}

.post-edit__textarea {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid lightgray;
  resize: none;
}

.post-edit__save {
  padding: 10px;
  border: 2px solid lightgray;
  background-color: transparent;
  font: inherit;
  cursor: pointer;
}

</style>

<template>
  <section class="post-page">
    <h1>Post №{{id}}</h1>

    <Post
        :data="{title: getPost.title, description: getPost.description, userId: getPost.userId, id: getPost.id}"
        :isPostPage="true"
        :isEdit="isEdit"
        @editPost="editPost"
        v-if="!isEdit"
    />

    <PostEdit
        :data="{title: getPost.title, description: getPost.description, userId: getPost.userId, id: getPost.id}"
        @editPost="editPost"
        v-else
    />

  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Post from "./Post";
import PostEdit from "./PostEdit";

export default {
  name: 'PostPage',

  components: {Post, PostEdit},

  data() {
    return {
      id: this.$route.params.id,
      isEdit: false,
    }
  },

  created() {
    this.fetchData()
  },

  computed: {
    ...mapGetters(["getPost"]),
  },

  methods: {
    ...mapActions(["GET_POST_BY_ID"]),

    editPost(data) {
      this.isEdit = !this.isEdit;
      console.log(`updateME ${data}`);
    },

    fetchData() {
      this.GET_POST_BY_ID(this.id)
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.post-page {
  width: 900px;
  margin: auto;
}
</style>

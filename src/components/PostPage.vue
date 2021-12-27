<template>
  <section class="post-page">
    <h1>Post №{{id}}</h1>
    <Post
        :data="{title: getPost.title, description: getPost.description, userId: getPost.userId, id: getPost.id}"
        :isPostPage="true"
    />
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Post from "./Post";

export default {
  name: 'PostPage',

  components: {Post},

  data() {
    return {
      id: this.$route.params.id,
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

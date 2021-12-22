<template>
  <div class="posts">
    <h2>Posts</h2>
    <ul class="posts__list">
      <li
          class="posts__item"
          v-for="post in posts"
          :key="post.id"
          @click="clickOnPost"
      >
        <Post :data="{title: post.title, description: post.description, userId: post.userId}"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Post from "./Post";
export default {
  name: 'Posts',
  components: {Post},
  data () {
    return {
      posts: [
        {
          title: `title`,
          description: `description`,
          userId: 1,
          id: 1,
        },
        {
          title: `title`,
          description: `description`,
          userId: 1,
          id: 2,
        },
        {
          title: `title`,
          description: `description`,
          userId: 1,
          id: 3,
        },
        {
          title: `title`,
          description: `description`,
          userId: 2,
          id: 4,
        },
        {
          title: `title`,
          description: `description`,
          userId: 2,
          id: 5,
        },
        {
          title: `title`,
          description: `description`,
          userId: 3,
          id: 6,
        },
      ],
    }
  },
  methods: {
    clickOnPost () {
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

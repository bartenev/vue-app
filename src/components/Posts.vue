<template>
  <div class="posts">
    <h2>Posts</h2>
    <ul class="posts__list">
      <li class="posts__item">
        <Post :data="{title: 'title', description: 'description', id: 4}"/>
      </li>
      <li class="posts__item">
        <Post :data="{title: 'title', description: 'description', id: 4}"/>
      </li>
      <li class="posts__item">
        <Post :data="{title: 'title', description: 'description', id: 4}"/>
      </li>
      <li class="posts__item">
        <Post :data="{title: 'title', description: 'description', id: 4}"/>
      </li>
      <li class="posts__item">
        <Post :data="{title: 'title', description: 'description', id: 4}"/>
      </li>
      <li class="posts__item">
        <Post :data="{title: 'title', description: 'description', id: 4}"/>
      </li>
      <li class="posts__item">
        <Post :data="{title: 'title', description: 'description', id: 4}"/>
      </li>
      <li class="posts__item">
        <Post :data="{title: 'title', description: 'description', id: 4}"/>
      </li>
      <li class="posts__item">
        <Post :data="{title: 'title', description: 'description', id: 4}"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Post from "./Post";
export default {
  name: 'Posts',
  components: {Post},
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

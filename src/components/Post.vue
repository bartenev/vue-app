<template>
  <article class="post">
    <h2 class="post__title">{{data.title}}</h2>
    <p class="post__description">{{data.description}}</p>
    <span class="post__id">userId - {{data.userId}}</span>
  </article>
</template>

<script>
export default {
  name: 'Post',
  props: {
    data: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.post {
  width: 250px;
  height: 150px;
  border: 1px solid grey;
  box-sizing: border-box;
  padding: 10px;
}

.post__title {
  height: 60px;
  margin: 0 0 10px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post__description {
  height: 30px;
  margin: 0 0 10px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post__id {

}

</style>

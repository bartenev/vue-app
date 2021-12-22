<template>
  <article class="post">
    <h2 class="post__title">{{data.title}}</h2>
    <p class="post__description">{{data.description}}</p>
    <span class="post__id">{{data.id}}</span>
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
  height: 200px;
  border: 1px solid grey;
  box-sizing: border-box;
}

.post__title {

}

.post__description {
  text-overflow: ellipsis;
}

.post__id {

}

</style>

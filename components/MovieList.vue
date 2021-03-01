<template>
    <div v-bind:class="{ 'moviesScroll': scroll, 'moviesGrid' : !scroll }">
      <div class="px-3 movie-container" v-for="item in list">
        <Movie :title="item.title" :image="item.poster_path" :id='item.id' :date='item.release_date'></Movie>
      </div>
      </div>
</template>
<style scoped>
/* Movies List */
.moviesGrid {
    display: grid;

    grid-column-gap: 10px;
    grid-row-gap: 50px;

    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
}
.moviesScroll {
    display: flex;
    overflow-x: scroll;
    padding-top: 10px;
}
.moviesScroll .movie {
    padding: 5px
}
.movie-container {
    min-width: 200px;
    max-width: 200px;
}

@media (max-width: 768px) {
    .movie-container {
        min-width: 100vw;
        max-width: 100vw;
    }
    .movie-container img {
        width: 100%
    }
    .moviesScroll {
        position: absolute;
        left: 0;
        width: 100%;
    }
}
</style>

<script>
export default {
    props:{
        list: Array,
        scroll: Boolean
    }
}
</script>
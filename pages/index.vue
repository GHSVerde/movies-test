<template>
  <div>
    <div class="container mx-auto">
      <h1 class="text-3xl mt-8 text-center md:text-left">Filmes populares</h1>
    </div>
    <div class="container mx-auto mt-8">
      <MovieList :list="this.popularMovies" />
      
    </div>
  </div>
</template>

<script>

export default {

   middleware: ['check-auth'],

   computed : {
     popularMovies() {
       return this.$store.getters.popularMovies;
     }
   },
 
  head() {
    return { 
      title: 'Abler Movie BD',
    }
  }

}
</script>

<style>

</style>

<template>
  <div>
    <div class="container mx-auto">
      <h1 class="text-3xl mt-8 text-center md:text-left">Resultados da sua pesquisa por: {{ this.$route.params.query }}</h1>
    </div>
    <div class="container mx-auto mt-8">
      <div v-if="!hasResults">Sua pesquisa não retornou resultados.</div>
        <MovieList :list="results" />
    </div>
  </div>
</template>

<script>

export default {

   middleware: ['check-auth'],

   data() {
       return {
           results: null,
           hasResults: false
       }
   },

   created() {
     this.checkResults();
   },

   methods: {
     checkResults: function () {
       if(this.results.length > 0) {
         this.hasResults = true;
       }
     }
   },

   asyncData({params, error, $axios}) {
       
       return $axios.get('/search/movie', {
           params: {
               query: params.query
           }
       }).then(response => {
           return {
            results: response.data.results
           }
       })
       .catch(e => error(e))
       
   },
 
  head() {
    return { 
      title: 'Abler Movie BD | Pesquisa: ' + this,
    }
  }

}
</script>

<style>

</style>

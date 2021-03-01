<template>
    <div class="md:flex">
        <div class="w-full md:w-1/3">
        <img :src="poster" :alt="this.movie.original_title">
        </div>
        <div class="w-full md:w-2/3 md:overflow-y-auto">
            <div class="w-10/12 mx-auto">
                <h1 class="text-5xl mt-8 font-thin text-center md:text-left mb-5">{{ this.movie.title }}<span v-if="this.movie.tagline" class="align-middle text-lg block md:inline"> <span class="md:inline hidden"> -  </span>{{ this.movie.tagline }}</span></h1>
                <div class="text-center md:text-left">
                <div class="duration font-thin">Duração: {{ duration }}</div>
                <div class="release font-thin">Status: {{ this.movie.status }}</div>
                <div class="release font-thin">Lançamento: {{ this.formatedDate }}</div>
                </div>

                <div class="py-5 text-center md:text-left generos">
                    <span class="mx-2 px-2 py-1 bg-gray-400 rounded-full" v-for="genre in this.movie.genres" :key="genre.id">{{ genre.name }}</span>
                </div>

                <div class="overview mt-20 md:mt-10">
                    {{ this.movie.overview }}
                </div>

                <div v-if="this.$store.getters.isAuthenticated" class="mt-4 text-center md:text-left">
                <!-- Buttons -->
                <button @click="toggleFavorite" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mx-4 md:ml-0">
                    <svg :class="{ 'fill-current' : isFavorite }" class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    <span>{{ isFavorite? 'Desfavoritar' : 'Favoritar' }}</span>
                </button>
                <!-- Buttons -->
                </div>

                <h2 class="text-2xl mt-4 mb-2 font-thin text-center md:text-left">Recomendações baseadas neste filme</h2>
                <MovieList :list="this.recommendations" scroll/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.generos {
    overflow-y: hidden;
    overflow-x: scroll;
}

@media (max-width: 768px) {
    .generos {
        position: absolute;
        left: 0;
        width: 100%;
    }
}
</style>

<script>
export default {
    middleware: ['check-auth'],

    data: function() {
        return {
            movie: [],
            recommendations: [],
            isFavorite: false
        }
    },

    computed: {
        poster: function() {
            return 'https://www.themoviedb.org/t/p/w780' + this.movie.poster_path;
        },

        formatedDate: function() {
            return this.$moment(this.movie.release_date, 'yyyy-mm-dd').format('DD/mm/yyyy');
        },

        duration: function() {
            return this.$moment.utc(this.$moment.duration(this.movie.runtime, "minutes").asMilliseconds()).format("HH:mm")
        }
    },

    created() {
    this.fetchRecommendations();
    this.fetchFavorite();
  },
   asyncData({params, error, $axios}) {
       
       return $axios.get('/movie/' + params.id)
       .then(res => {
            return {
                movie: res.data
            }
       })
       .catch(e => error(e))
       
   },
  methods: {
    fetchRecommendations: function () {
        this.$axios.get('/movie/' + this.$route.params.id + '/recommendations').then(response => {
            this.recommendations = response.data.results
        })
    },

    fetchFavorite: function () {
        this.$axios.get('/movie/' + this.$route.params.id + '/account_states', {
            params: { session_id: this.$store.state.auth.session_id }
        })
        .then(response => {
            this.isFavorite = response.data.favorite
        })
        .catch(e=>error(e))
    },

    toggleFavorite: function () {
        this.isFavorite = !this.isFavorite;
        
        this.$store.dispatch('movies/favorite' , 
        { 
            media_type: 'movie',
            media_id: Number(this.$route.params.id),
            favorite: this.isFavorite,
        })
        .catch(e => {
            this.isFavorite = !this.isFavorite    
        });
    }
  },

    head() {
        return { 
            title: 'Abler Movie BD | ' + this.movie.original_title,
        }
    }
}
</script>
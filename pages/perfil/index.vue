<template>
<div>
    <div id="perfil" class="py-10 z-10 absolute md:static md:block w-full top-0" :style="'background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://www.themoviedb.org/t/p/w1280' + this.backgroundMovie.backdrop_path + ') center center / cover'">
        <div class="container mx-auto z-20 md:flex items-center px-10 mt-10 md:mt-0">
            <div class="w-full md:w-1/12 text-center">
                <img class="rounded-full w-2/3 md:w-full mx-auto" :src="gravatar + '?s=256'" :alt="user.name || user.username">
            </div>
            <div class="w-full md:w-10/12 md:pl-10 text-center md:text-left">
                <h1 class="mt-5 md:mt-0 text-white text-3xl">{{ user.name || user.username }}</h1>
            </div>
        </div>

    
    </div>

    <section id='favoriteMovies'>
        <div class="container mx-auto">
      <h1 class="text-3xl mt-8 text-center md:text-left">Filmes Favoritos</h1>
    </div>
    <div class="container mx-auto mt-8">
      <MovieList :list="favoriteMovies" scroll/>
      
    </div>
    </section>
    </div>
</template>

<style scoped>
#perfil {

    border: 0px solid transparent;
    border-radius: 0 0 66% 0;
}
@media (max-width: 768px) {
    #perfil {
        border-radius: 0 0 100px 100px;
    }
    #favoriteMovies {
        margin-top: 100%
    }
}
</style>

<script>
export default {
    middleware: ['check-auth','auth'],

    data() {
        return {
            favoriteMovies: [],
            backgroundMovie: null
        }
    },
    
    computed:  {
        gravatar() {
        let hash;
        if(typeof this.user === 'undefined' || this.user === null ) {
            hash = ''
        } else {
            hash = this.user.avatar.gravatar.hash
        }
            return `https://www.gravatar.com/avatar/${hash}`;
        },

        user() {
            return this.$store.getters.loggedInUser;
        },

    },

    created() {
        this.fetchFavoriteMovies();
        this.randomMovie();
    },

    methods: {
        fetchFavoriteMovies: function () {
            this.$store.dispatch('movies/favoriteMovies')
            .then(response => { this.favoriteMovies = this.$store.state.movies.favorites } )
            .catch( e => console.error(e) );
        },

        randomMovie: function () {
        let movies = this.$store.state.movies.favorites || this.$store.getters.popularMovies;

            const random = Math.floor(Math.random() * movies.length);
            this.backgroundMovie = movies[random];
        }
    },

    head() {
        return { 
            title: 'Abler Movie BD | Perfil',
        }
    }
}
</script>
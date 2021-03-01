<template>
<div class="movie antialiased text-center">
    <div class="image hover:opacity">
        <nuxt-link :to="'/movie/'+id">
            <img class="rounded-lg mx-auto w-11/12 md:10/12" :src="poster" alt="">
        </nuxt-link>
    </div>
    <div class="content">
        <h3 class="mt-2 font-extralight bold text-2xl md:text-base">{{ title }}</h3>
        <span class="font-thin md:text-sm">Lançamento {{ formatedDate }} </span>
    </div>
</div>
    
</template>

<style scoped>

.movie {
    transition: .2s ease-in-out
}

.movie:hover {
    margin-top: -10px
}

</style>

<script>
export default {

    props: {
        title: String,
        date: String,
        image: String,
        id: Number,
    },

    computed: {
        formatedDate: function() {
            return this.$moment(this.date, 'yyyy-mm-dd').format('DD/mm/yyyy');
        },

        poster: function() {
            if(this.image) {
                return 'https://www.themoviedb.org/t/p/w780' + this.image;
            } else {
                return 'http://lorempixel.com/220/330';
            }
        }
    }
    
}
</script>
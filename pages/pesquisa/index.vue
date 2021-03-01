<template>
    <div>
        <!-- Searchbar  -->
        <section id="searchbar">
            <h1 class="text-3xl	my-4 text-center">Pesquisar Filme</h1>
            <form class="mt-8 space-y-6" @submit.prevent="searchMovie">
            <input id="search" v-model="search" type="text" required class="appearance-none rounded-none relative block w-10/12 md:w-6/12 mx-auto px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Mulher Maravilha...">
            <button type="submit" class="group relative w-10/12 md:w-6/12 mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg class="h-5 w-5 text-gray-500 group-hover:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          Pesquisar
        </button>
            </form>
        </section>
        <!-- /Searchbar -->

        <section id="results">
            <div class="container mx-auto">
                {{ search }}
            </div>
        </section>
    </div>
</template>

<script>
export default {
    middleware: ['check-auth'],
    data() {
        return {
            search: null,
        }
    },

    methods: {
        searchMovie() {
            
            this.$router.push('/pesquisa/' + this.search)
        }
    },
}
</script>
<template>
  <div>
    <Navbar :menus="menus" :user='user'></Navbar>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { name: 'Filmes Populares', to: '/'  },
        { name: 'Pesquisa', to:'/pesquisa' }
      ],
    }
  },

  computed: {
    user() {
      return this.$store.getters['loggedInUser'];
    }
  }
  
}
</script>

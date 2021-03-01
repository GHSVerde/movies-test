<template>
<div>
<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="bg-gray-800">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 z-50">
    <div class="relative flex items-center justify-between h-16 z-20">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
        <button type="button" @click="toggleMobile" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="sr-only">Open main menu</span>

          <svg :class="{ 'hidden': mobileOpen,  'block': !mobileOpen }" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>

          <svg :class="{ 'hidden': !mobileOpen,  'block': mobileOpen }" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex-shrink-0 flex items-center">
          <nuxt-link to="/">
          <div class="block h-8 w-auto font-bold text-white">The Movie DB</div>
          </nuxt-link>
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex space-x-4 navbar">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <NuxtLink v-for="item in menus" :to="item.to" v-bind:key="item.to">{{ item.name }}</NuxtLink>
          </div>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

        <!-- Profile dropdown -->
        <div class="ml-3 relative">
          <div>
            <button v-on:click="toggleDropdown" class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
              <span class="sr-only">Open user menu</span>
              <img class="h-8 w-8 rounded-full" :src="gravatar" alt="">
            </button>
          </div>
       
          <div :class="{ 'transform opacity-0 scale-95 invisible	': !isDropdownOpen, 'transform opacity-100 scale-100': isDropdownOpen }" class="ease-in-out origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 dropdown duration-200" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
            <div v-if="!user">
              <div v-if="!user" @click="toggleDropdown"><NuxtLink to="/login" >Login</NuxtLink></div>
            </div>
            <div v-if="user">
              <div @click="toggleDropdown"><NuxtLink to="/perfil" >Perfil</NuxtLink></div>
              <div @click="toggleDropdown"><a @click='logout' >Logout</a></div>
            </div>
            
            
            
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>

<!-- This example requires Tailwind CSS v2.0+ -->
<div id="mobile-menu" :class="{ 'transform-hide': !mobileOpen,  'transform-0': mobileOpen }"  class="fixed inset-0 overflow-hidden transition-all duration-200 ease-in-out z-50">
  <div class="absolute inset-0 overflow-hidden">

    <div :class="{ 'bg-opacity-0': !mobileOpen,  'bg-opacity-75': mobileOpen }" class="absolute inset-0 bg-gray-800 duration-200 transition-all" aria-hidden="true"></div>
    <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex" aria-labelledby="slide-over-heading">

      <div :class="{ 'transform-hide': !mobileOpen,  'transform-0': mobileOpen }" class="relative w-screen max-w-md transition-all duration-200 ease-in-out">

        <div @click="toggleMobile" class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
          <button class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
            <span class="sr-only">Fechar Painel</span>
            <!-- Heroicon name: outline/x -->
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="h-full flex flex-col py-6 bg-gray-900 shadow-xl overflow-y-scroll">
          <div class="px-4 sm:px-6">
            <h2 id="slide-over-heading" class="text-lg font-medium text-white">
              Menu
            </h2>
          </div>
          <div class="mt-6 relative flex-1 px-4 sm:px-6">
            <!-- Mobile menu, show/hide based on menu state. -->
  
              <div class="px-2 pt-2 pb-3 space-y-1 text-white" >
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <div v-for="item in menus" @click="toggleMobile"><NuxtLink :to="item.to" v-bind:key="item.to">{{ item.name }}</NuxtLink></div>
              </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</div>
</template>

<style scoped>

.dropdown a {
  display: block;

  font-size: 0.875rem;
  --text-opacity: 1;
  color: #4a5568;
  color: rgba(74, 85, 104, var(--text-opacity));

  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.dropdown a:hover {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

nav .navbar a {
  
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  border-radius: 0.375rem;
        
  color: #e2e8f0;       
  font-size: 0.875rem;
  font-weight: 500;

  transition: .2s ease-in-out;
}

nav .navbar a:hover {
      --bg-opacity: 1;
    background-color: #4a5568;
    background-color: rgba(74, 85, 104, var(--bg-opacity));
}

nav .navbar a.nuxt-link-exact-active {
  --bg-opacity: 1;
    background-color: #1a202c;
    background-color: rgba(26, 32, 44, var(--bg-opacity));
}

.transform-hide {
transform: translateX(100%);
}

.transform-0 {
  transform: translateX(0%);
}


</style>

<script>

export default {
  props: {
    menus: Array,
    user: Object
  },
  data: function () {
    return {
      isDropdownOpen : false,
      mobileOpen: false,
    }
  },
  computed: {
    gravatar() {
      let hash;
      if(typeof this.user === 'undefined' || this.user === null ) {
        hash = ''
      } else {
        hash = this.user.avatar.gravatar.hash
      }
      return `https://www.gravatar.com/avatar/${hash}`;
    }
  },
  methods: {
    toggleDropdown: function () {
      this.isDropdownOpen  = !this.isDropdownOpen;
    },
    toggleMobile: function () {
      this.mobileOpen = !this.mobileOpen;
    },
    logout: function() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>
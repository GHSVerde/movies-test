  export const actions = {
    
    //Pega os filmtes populares
    nuxtServerInit(vuexContext) {
      return this.$axios.get('/movie/popular')
     .then(res => {
          vuexContext.commit('movies/set_popular', res.data.results);
      })
     .catch(e => error(e));
  },
  }
  
  export const getters = {

    //Retorna verdadeiro ou falso se o usu´årio está autenticado
    // !!! IMPORTANTE: É usado na middleware para verificar se o usuário está logado ou não !!!!
    isAuthenticated(state) {
      
      if(typeof(state.auth.session_id) === undefined || state.auth.session_id === null) {
        return false;
      }

      return true;

    },

    //Retorna o erro do login
    loginError(state) {
      if(state.auth.loginError === undefined || state.auth.loginError === null)
      {
        return null;
      } 
      return state.auth.loginError.status_message;
    },
  
    // Retorna os dados do usuário
    loggedInUser(state) {
      return state.auth.user
    },

    // Retorna os filmes populares
    popularMovies(state) {
      return state.movies.popularMovies
    }
  }
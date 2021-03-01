
export const state = () => ({
    popularMovies: null,
    favorites: null
});

export const mutations = {
    set_popular(store, data) {
        store.popularMovies = data;
    },

    set_favorites(store,data) {
        store.favorites = data
    }
};

export const actions = {
    //Favorita/Desfavorita o filme
    //Os dados são enviados da página /pages/movie/_id.vue
    favorite(vuexContext, data) {
        return this.$axios.post('/account/' + vuexContext.rootState.auth.user.id + '/favorite', data, {
            headers: {
                'content-type' : 'application/json;charset=utf-8'
            },
            params: { session_id: vuexContext.rootState.auth.session_id }
          });
    },

    //Retorna os filmes favoritos do usuário
    favoriteMovies(vuexContext) {
        return this.$axios.get('/account/' + vuexContext.rootState.auth.user.id + '/favorite/movies', {
            params: {
                session_id: vuexContext.rootState.auth.session_id
            }
        }).then(response => {
            vuexContext.commit('set_favorites', response.data.results);
        })
        .catch(e => error(e));
    }
}

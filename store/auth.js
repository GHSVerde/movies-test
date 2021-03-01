import Cookie from 'js-cookie';

export const state = () => ({
  user: null,
  loginError: null,
  request_token: null,
  session_id: null
})
export const mutations = {
  
  set_user(store, data) {
    store.user = data
  },

  set_sessionID(store, data) {
    store.session_id = data
  },

  set_error(store, data) {
    store.loginError = data
  },

  set_request_token(store, data) {
    store.request_token = data;
  },

  reset_user(store) {
    store.user = null;
    store.session_id = null;
    store.request_token = null;
    store.loginError = null;
  },
  reset_errors(store) {
    store.loginError = null;
  }
}

export const actions = {

  //Pega os dados do usuário no banco de dados com o id da sessão
  fetchUser(vuexContext) {
    return this.$axios.get('/account', {
        params: {
          session_id: vuexContext.state.session_id
        }
      })
      .then(response => {
        //Seta Cookie e localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        Cookie.set('user', JSON.stringify(response.data));

        //Seta o usuário na Store
        vuexContext.commit('set_user', response.data)
      })
      .catch(e => console.error(e));
  },

  login(vuexContext, data) {

    //Request Token
      return this.$axios.get('/authentication/token/new')
      .then(response => { //Resposta com novo token
        //Seta o request token
        vuexContext.commit('set_request_token', response.data.request_token);

        //Valida token com os dados de Login
        return this.$axios.post('/authentication/token/validate_with_login', { username: data.username, password: data.password, request_token: vuexContext.state.request_token })
      })
      .then(response => {//Resposta caso o usuário esteja correto

        //Cria nova id de sessão com o token autenticado
        return this.$axios.post('/authentication/session/new', { request_token: vuexContext.state.request_token })
      })
      .then(response => { //Resposta com o id da sessão
        
        //Seta o id da sessão nos cookies e localstorage
        localStorage.setItem('session_id', response.data.session_id);
        Cookie.set('session_id', response.data.session_id);
        
        // Adiciona id da sessão na store
        vuexContext.commit('set_sessionID', response.data.session_id);

        //Pega os dados do usuário cujo o id da seção foi autenticado
        return this.$axios.get('/account', { params: { session_id: vuexContext.state.session_id}});
      })
      .then(response => {
        // Seta o localStorage e Cookie com os dados do Usueario
        localStorage.setItem('user', JSON.stringify(response.data));
        Cookie.set('user', JSON.stringify(response.data));

        //Seta os dados do usuário na store
        vuexContext.commit('set_user', response.data)
      })
      .catch(e => {
        // Caso alguma coisa dê errado, coloca o erro na store para análise
        vuexContext.commit('set_error', e.response.data);
      });


  },

  //Função a ser executada apenas no servidor, pois não tem acesso a localStorage
  initAuthServer(vuexContext, req) {
  
    //Caso não haja cookies, sai da função
    if(!req.headers.cookie) {
        return
    }

    //Pega os Cookies
    const sessionCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('session_id='));
    const userCookie    = req.headers.cookie.split(';').find(c => c.trim().startsWith('user='));

    //Caso os cookies estejam vazios, sai da função
    if(!sessionCookie || !userCookie) {
        return
    }

    //Pega os valores do Cookie
    let session_id = sessionCookie.split('=')[1];
    let user       = userCookie.split('=')[1];

    //Restaura espaços e outros caracteres do JSON como as aspas
    user = decodeURIComponent(user);
    
    //Seta o usuário na store
    vuexContext.commit('set_sessionID', session_id);
    vuexContext.commit('set_user', JSON.parse(decodeURI(user)));
    
  },

  //Função a ser rodada local, onde localStorage é disponível
  initAuth(vuexContext) {
      
    //Pega o usuário no localStorage
        const session_id = localStorage.getItem('session_id');
        const user       = localStorage.getItem('user');
      
        //Sai caso o usuário não esteja setado
        if(!session_id || !user) {
            return
        }
      
    
    // Seta o usuário na store
    vuexContext.commit('set_sessionID', session_id);
    vuexContext.commit('set_user', JSON.parse(user));
},

  //Tira o user do estado, remove Cookie e localStorage
  logout({ commit }) {
    //Remove o usu´årio da store
    commit('reset_user');
    
    //Remove os cookies
    Cookie.remove('session_id');
    Cookie.remove('user');

    //Remove os dados do localStorage
    localStorage.removeItem('session_id');
    localStorage.removeItem('user');
    
    return Promise.resolve()
  }
}

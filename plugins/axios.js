export default function ({ ctx, $axios, redirect, $auth }) {
    $axios.onRequest(config => {
        config.params = config.params || {};
        //add your params here
        config.params['api_key'] = '7882d8699c19c4b0959a3765a781c5bd';
        config.params['language'] = 'pt-BR';
        return config;
    });
  }
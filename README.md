# Abler Movie DB

O projeto segue os padrões definidos na documentação do [Vue.js](https://vuejs.org/v2/guide/) e [Nuxt.js](https://nuxtjs.org/docs/2.x/get-started/installation);

O projeto foi feito e testado com celular sempre ao lado, sendo recomendado seu teste e visualização em um aparelho celular.

## Middlewares
As middlewares estão localizadas na pasta /middleware
1. A Middleware `auth.js` redireciona o usuário para o login caso o mesmo tente acessar uma área protegida por login.
2. A Middleware `check-auth` é responsável por utilizar cookies e localStorage para realizar backup.
3. A Middleware `login` é utilizada na tela de login para redirecionar para perfil caso o usuário já esteja logado, combinado com `check-auth`, loga e redireciona.

## Plugins 
A pasta de plugins contem um arquivo que é utilizado para setar as configs básicas do axios.

## Store
Todos os estados são gerenciados de maneira modular, assim sendo, a pasta store contem 3 arquivos:
1. `index.js` - Responsável por alguns getters de autenticação, sua principal função é permitir a utilização da função nuxtServerInit, que inicializa a loja já com os filmes populares.
2. `auth.js` - Responsável pelas ações de login, salvar os dados na store, remover o usuário e recuperar os dados de Cookie e localStorage.
3. `movies.js` - Responável por retornar os filmes favoritos, assim como enviar a requisição de favoritar/desfavoritar o filme.

## Modulos Adicionais
Para exibir datas de maneira correta, utilizei o pacote [@nuxtjs/moment](https://www.npmjs.com/package/@nuxtjs/moment), suas configurações podem ser encontradas na seção `modules` do `nuxt.config.js`.

O pacote incorpora moment através da diretiva `$moment`, ficando disponível junto com outros módulos padrão como `$store` e `$axios`. Para exemplo de utilização, acesse `/components/Movie.vue`.

## Servidor para testes
Para testar em mais de um aparelho, utilizei da diretiva server no `nuxt.config.js`, permitindo publicar em rede local através do ip de rede local da máquina na porta 8000. Assim, ao utilizar o comando `npm run dev`, seu ip local aparecerá junto com a porta.

__Esta configuração permite testar em celulares com os mesmos recursos de hot reloading.__


## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at your local server ip at port:8000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
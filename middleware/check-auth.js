export default function (context) {
    if(!context.store.getters['isAuthenticated']) {
        if (process.client) {
            context.store.dispatch('auth/initAuth');
        } else {
            context.store.dispatch('auth/initAuthServer', context.ssrContext.req);
        }
    }
    
}
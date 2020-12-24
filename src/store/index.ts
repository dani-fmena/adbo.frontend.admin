import { createStore } from 'vuex'
import catalogsModule from './catalogs'
import authModule from './auth'
import createPersistedState from "vuex-persistedstate";


export default createStore({
    modules: {
        catalogs: catalogsModule,
        auth: authModule
    },
    plugins: [createPersistedState()]
})

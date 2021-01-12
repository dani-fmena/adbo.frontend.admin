import { createStore } from 'vuex'
import catalogsModule from './catalogs'
import authModule from './auth'
import createPersistedState from "vuex-persistedstate";     // TODO thinks this ins't working


export default createStore({
    modules: {
        catalogs: catalogsModule,
        auth: authModule
    },
    plugins: [createPersistedState()]
})

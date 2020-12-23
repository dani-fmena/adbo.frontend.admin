import { createStore } from 'vuex'
import catalogsModule from './catalogs'
import authModule from './auth'


export default createStore({
    modules: {
        catalogs: catalogsModule,
        auth: authModule
    }
})

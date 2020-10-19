import { createStore } from 'vuex'
import catalogsModule from './catalogs'


export default createStore({
    modules: {
        catalogs: catalogsModule
    }
})

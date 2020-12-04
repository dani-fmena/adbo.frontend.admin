import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'
import { ICatalogState } from '@/store/types/catalogs/catalogs-types'


const state: ICatalogState = {
    catalogs: [],
    count: 0
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

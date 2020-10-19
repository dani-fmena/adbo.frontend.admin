import { MutationTree } from 'vuex'
import { CATALOGS_MT, TCatalogsMutations } from '../types/catalogs/catalogs-mutation-types'
import { ICatalog, ICatalogState } from '@/store/types/catalogs/catalogs-types'


export const mutations: MutationTree<ICatalogState> & TCatalogsMutations = {
    [CATALOGS_MT.CATALOGS_UPDATED] (state: ICatalogState, catalogs: ICatalog[]) {
        state.catalogs = { ...catalogs }
    }
}

import { MutationTree } from 'vuex'
import { CATALOGS_MT, TCatalogsMutations } from '../types/catalogs/catalogs-mutation-types'
import { ICatalog, ICatalogState } from '@/store/types/catalogs/catalogs-types'


export const mutations: MutationTree<ICatalogState> & TCatalogsMutations = {
    [CATALOGS_MT.CATALOGS_UPDATED] (state: ICatalogState, catalogs: ICatalog[]) {
        state.catalogs = catalogs
    },
    [CATALOGS_MT.CATALOG_DELETED] (state: ICatalogState, catalogId: string) {
        state.catalogs = Object.keys(state.catalogs).reduce<ICatalog[]>((accumulator, key) => {
            if (state.catalogs[+key]._id === catalogId) return accumulator
            
            accumulator.push(state.catalogs[+key])
            return accumulator
        }, [])
    }
}

import { MutationTree } from 'vuex'
import { CATALOGS_MT, TCatalogsMutations } from '../types/catalogs/catalogs-mutation-types'
import { ICatalog, ICatalogState } from '@/store/types/catalogs/catalogs-types'


export const mutations: MutationTree<ICatalogState> & TCatalogsMutations = {
    [CATALOGS_MT.CATALOGS_UPDATED] (state: ICatalogState, catalogs: ICatalog[]) {
        catalogs.length > 0? state.catalogs = catalogs : state.catalogs = []
        
    },
    [CATALOGS_MT.CATALOG_DELETED] (state: ICatalogState, catalogId: string) {
        state.catalogs = Object.keys(state.catalogs).reduce<ICatalog[]>((accumulator, key) => {
            if (state.catalogs[+key]._id === catalogId) return accumulator
            
            accumulator.push(state.catalogs[+key])
            return accumulator
        }, [])
    },
    [CATALOGS_MT.SET_CATALOGS_STATUS] (state: ICatalogState, payload: { catalogId: string, newStatus: boolean }) {
        state.catalogs = Object.keys(state.catalogs).reduce<ICatalog[]>((accumulator, key) => {
            if (state.catalogs[+key]._id === payload.catalogId) state.catalogs[+key].isEnable = payload.newStatus
        
            accumulator.push(state.catalogs[+key])
            return accumulator
        }, [])
    },
    [CATALOGS_MT.BULK_SET_CATALOGS_STATUS] (state: ICatalogState, payload: { ids: Array<string>, newStatus: boolean }) {
        state.catalogs = Object.keys(state.catalogs).reduce<ICatalog[]>((accumulator, key) => {
            if (payload.ids.includes(state.catalogs[+key]._id)) state.catalogs[+key].isEnable = payload.newStatus
        
            accumulator.push(state.catalogs[+key])
            return accumulator
        }, [])
    },
    [CATALOGS_MT.BULK_REMOVE_CATALOGS] (state: ICatalogState, payload: { ids: Array<string> }) {
        state.catalogs = Object.keys(state.catalogs).reduce<ICatalog[]>((accumulator, key) => {
            if (payload.ids.includes(state.catalogs[+key]._id)) return accumulator
            
            accumulator.push(state.catalogs[+key])
            return accumulator
        }, [])
    },
}

import { ActionTree } from 'vuex'
import { fetchCatalogs } from '@/services/api'
import { CATALOGS_MT } from '../types/catalogs/catalogs-mutation-types'
import { CATALOGS_AT, TCatalogActions, CatalogAC } from '../types/catalogs/catalogs-actions-types'
import { ICatalogState, ICatalog } from '@/store/types/catalogs/catalogs-types'


export const actions: ActionTree<ICatalogState, any> & TCatalogActions = {
    [CATALOGS_AT.GET_CATALOGS] (context: CatalogAC) {
        fetchCatalogs.then((response: any) => {
            context.commit(CATALOGS_MT.CATALOGS_UPDATED, response as ICatalog[])
        }).catch((error) => {
            console.error(error)
        })
    },
    [CATALOGS_AT.ADD_CATALOGS] (_: CatalogAC, obj: { count: number }) {
        console.log(obj.count + 10)
    }
}

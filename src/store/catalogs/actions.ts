import { ActionTree } from 'vuex'
import { ApiCatalogs } from '@/services/api/api-catalogs'
import { CATALOGS_MT } from '../types/catalogs/catalogs-mutation-types'
import { CATALOGS_AT, TCatalogActions, CatalogAC } from '../types/catalogs/catalogs-actions-types'
import { ICatalogState, ICatalog } from '@/store/types/catalogs/catalogs-types'


export const actions: ActionTree<ICatalogState, any> & TCatalogActions = {
    [CATALOGS_AT.GET_CATALOGS] (context: CatalogAC) {
        ApiCatalogs.getAll().then((response: any) => {
            const data = response.data
            context.commit(CATALOGS_MT.CATALOGS_UPDATED, data as ICatalog[])
        }).catch((error) => {
            console.error(error)
        })
    },
    [CATALOGS_AT.ADD_CATALOGS] (_: CatalogAC, obj: { count: number }) {
        console.log(obj.count + 10)
    }
}

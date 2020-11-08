import { ActionTree } from 'vuex'
import { ApiCatalogs } from '@/services/api/api-catalogs'
import { CATALOGS_MT } from '../types/catalogs/catalogs-mutation-types'
import { CATALOGS_AT, TCatalogActions, CatalogAC } from '../types/catalogs/catalogs-actions-types'
import { ICatalogState, ICatalog } from '@/store/types/catalogs/catalogs-types'


export const actions: ActionTree<ICatalogState, any> & TCatalogActions = {
    [CATALOGS_AT.GET_CATALOGS] (context: CatalogAC) {
        ApiCatalogs.getAll().then((response: any) => {
            context.commit(CATALOGS_MT.CATALOGS_UPDATED, response.data as ICatalog[])
        }).catch((error) => {
            console.error(error)
        })
    },
    [CATALOGS_AT.ADD_CATALOGS] (_: CatalogAC, payload: { catalog: Partial<ICatalog> }) {
        return new Promise((resolve, reject) => {
            ApiCatalogs.create(payload.catalog)
            .then((result) => {
            
                const { data } = result                                 // data is the created object retrieved by the api server
                resolve(data)
            
            })
            .catch((error) => {
                reject(error)
            })
        })
    },
    [CATALOGS_AT.DEL_CATALOGS] (context: CatalogAC, payload: { id: string }) {
        return new Promise((resolve, reject) => {
            ApiCatalogs.delete(payload.id)
            .then((result) => {
                
                const { data } = result                                 // data is the deleted object retrieved by the api server
                context.commit(CATALOGS_MT.CATALOG_DELETED, data._id)
    
                resolve(data)
                
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}

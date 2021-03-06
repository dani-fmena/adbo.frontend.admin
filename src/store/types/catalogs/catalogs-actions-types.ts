import { ActionContext } from 'vuex'
import { TCatalogsMutations } from './catalogs-mutation-types'
import { ICatalog, ICatalogState } from './catalogs-types'
import { IDTQueryBase } from '@/services/definitions'


export enum CATALOGS_AT {
    GET_CATALOGS = 'GET_CATALOGS',
    ADD_CATALOGS = 'ADD_CATALOGS',
    EDIT_CATALOGS = 'EDIT_CATALOGS',
    DEL_CATALOGS = 'DEL_CATALOGS',
    SET_CATALOGS_STATUS = 'SET_CATALOGS_STATUS',
    BULK_ENABLE_CATALOGS = 'BULK_ENABLE_CATALOGS',
    BULK_DISABLE_CATALOGS = 'BULK_DISABLE_CATALOGS',
    BULK_REMOVE_CATALOGS = 'BULK_REMOVE_CATALOGS'
}

export type CatalogAC = {                                                                                               // Catalog Action Context is an augmented/specific action extend from vue action context
    commit<K extends keyof TCatalogsMutations> (
        key: K,
        payload: Parameters<TCatalogsMutations[K]>[1]
    ): ReturnType<TCatalogsMutations[K]>
} & Omit<ActionContext<ICatalogState, any>, 'commit'>

export interface TCatalogActions {
    [CATALOGS_AT.GET_CATALOGS] ({ commit }: CatalogAC, payload: IDTQueryBase | undefined): Promise<void>
    [CATALOGS_AT.ADD_CATALOGS] ({ commit }: CatalogAC, payload: { catalog: Partial<ICatalog> }): Promise<ICatalog>
    [CATALOGS_AT.EDIT_CATALOGS] ({ commit }: CatalogAC, payload: { catalog: Partial<ICatalog> }): Promise<ICatalog>
    [CATALOGS_AT.DEL_CATALOGS] ({ commit }: CatalogAC, payload: { id: string }): Promise<ICatalog>
    [CATALOGS_AT.SET_CATALOGS_STATUS] ({ commit }: CatalogAC, payload: { id: string }): Promise<void>
    [CATALOGS_AT.BULK_ENABLE_CATALOGS] ({ commit }: CatalogAC, payload: { ids: Array<string> }): Promise<void>
    [CATALOGS_AT.BULK_DISABLE_CATALOGS] ({ commit }: CatalogAC, payload: { ids: Array<string> }): Promise<void>
    [CATALOGS_AT.BULK_REMOVE_CATALOGS] ({ commit }: CatalogAC, payload: { ids: Array<string> }): Promise<void>
    // [CATALOGS_AT.ADD_PRODUCTS]({ commit }: AugmentedActionContext, payload: number): Promise<number>
}

export const AINVOKER = {                                      // Actions Invoker
    [CATALOGS_AT.GET_CATALOGS]: 'catalogs/' + CATALOGS_AT.GET_CATALOGS,
    [CATALOGS_AT.ADD_CATALOGS]: 'catalogs/' + CATALOGS_AT.ADD_CATALOGS,
    [CATALOGS_AT.EDIT_CATALOGS]: 'catalogs/' + CATALOGS_AT.EDIT_CATALOGS,
    [CATALOGS_AT.DEL_CATALOGS]: 'catalogs/' + CATALOGS_AT.DEL_CATALOGS,
    [CATALOGS_AT.SET_CATALOGS_STATUS]: 'catalogs/' + CATALOGS_AT.SET_CATALOGS_STATUS,
    [CATALOGS_AT.BULK_ENABLE_CATALOGS]: 'catalogs/' + CATALOGS_AT.BULK_ENABLE_CATALOGS,
    [CATALOGS_AT.BULK_DISABLE_CATALOGS]: 'catalogs/' + CATALOGS_AT.BULK_DISABLE_CATALOGS,
    [CATALOGS_AT.BULK_REMOVE_CATALOGS]: 'catalogs/' + CATALOGS_AT.BULK_REMOVE_CATALOGS
}

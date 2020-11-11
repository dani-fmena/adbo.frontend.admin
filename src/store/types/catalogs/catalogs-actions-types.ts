import { ActionContext } from 'vuex'
import { TCatalogsMutations } from './catalogs-mutation-types'
import { ICatalog, ICatalogState } from './catalogs-types'


export enum CATALOGS_AT {
    GET_CATALOGS = 'GET_CATALOGS',
    ADD_CATALOGS = 'ADD_CATALOGS',
    EDIT_CATALOGS = 'EDIT_CATALOGS',
    DEL_CATALOGS = 'DEL_CATALOGS',
    SET_CATALOGS_STATUS = 'SET_CATALOGS_STATUS'
}

export type CatalogAC = {                                                                                               // Catalog Action Context is an augmented/specific action extend from vue action context
    commit<K extends keyof TCatalogsMutations> (
        key: K,
        payload: Parameters<TCatalogsMutations[K]>[1]
    ): ReturnType<TCatalogsMutations[K]>
} & Omit<ActionContext<ICatalogState, any>, 'commit'>

export interface TCatalogActions {
    [CATALOGS_AT.GET_CATALOGS] ({ commit }: CatalogAC): void
    [CATALOGS_AT.ADD_CATALOGS] ({ commit }: CatalogAC, payload: { catalog: Partial<ICatalog> }): void
    [CATALOGS_AT.EDIT_CATALOGS] ({ commit }: CatalogAC, payload: { catalog: Partial<ICatalog> }): void
    [CATALOGS_AT.DEL_CATALOGS] ({ commit }: CatalogAC, payload: { id: string }): void
    [CATALOGS_AT.SET_CATALOGS_STATUS] ({ commit }: CatalogAC, payload: { id: string }): void
    // [CATALOGS_AT.ADD_PRODUCTS]({ commit }: AugmentedActionContext, payload: number): Promise<number>
}

export const AINVOKER = {                                      // Actions Invoker
    [CATALOGS_AT.GET_CATALOGS]: 'catalogs/' + CATALOGS_AT.GET_CATALOGS,
    [CATALOGS_AT.ADD_CATALOGS]: 'catalogs/' + CATALOGS_AT.ADD_CATALOGS,
    [CATALOGS_AT.EDIT_CATALOGS]: 'catalogs/' + CATALOGS_AT.EDIT_CATALOGS,
    [CATALOGS_AT.DEL_CATALOGS]: 'catalogs/' + CATALOGS_AT.DEL_CATALOGS,
    [CATALOGS_AT.SET_CATALOGS_STATUS]: 'catalogs/' + CATALOGS_AT.SET_CATALOGS_STATUS
}

import { ActionContext } from 'vuex'
import { TCatalogsMutations } from './catalogs-mutation-types'
import { ICatalogState } from './catalogs-types'


export enum CATALOGS_AT {
    GET_CATALOGS = 'GET_CATALOGS',
    ADD_CATALOGS = 'ADD_CATALOGS'
}

export type CatalogAC = {                                                                                               // Catalog Action Context is an augmented/specific action extend from vue action context
    commit<K extends keyof TCatalogsMutations> (
        key: K,
        payload: Parameters<TCatalogsMutations[K]>[1]
    ): ReturnType<TCatalogsMutations[K]>
} & Omit<ActionContext<ICatalogState, any>, 'commit'>

export interface TCatalogActions {
    [CATALOGS_AT.GET_CATALOGS] ({ commit }: CatalogAC): void
    [CATALOGS_AT.ADD_CATALOGS] ({ commit }: CatalogAC, payload: { count: number }): void
    // [CATALOGS_AT.ADD_PRODUCTS]({ commit }: AugmentedActionContext, payload: number): Promise<number>
}

import { ICatalog, ICatalogState } from '@/store/types/catalogs/catalogs-types'


export enum CATALOGS_MT {
    CATALOGS_UPDATED = 'CATALOGS_UPDATED',
    CATALOG_DELETED = 'CATALOG_DELETED',
    SET_CATALOGS_STATUS = 'SET_CATALOGS_STATUS',
    BULK_SET_CATALOGS_STATUS = 'BULK_SET_CATALOGS_STATUS',
    BULK_REMOVE_CATALOGS = 'BULK_REMOVE_CATALOGS'
}

export type TCatalogsMutations<S = ICatalogState> = {
    [CATALOGS_MT.CATALOGS_UPDATED] (state: S, payload: ICatalog[]): void
    [CATALOGS_MT.CATALOG_DELETED] (state: S, payload: string): void
    [CATALOGS_MT.SET_CATALOGS_STATUS] (state: S, payload: { catalogId: string, newStatus: boolean }): void
    [CATALOGS_MT.BULK_SET_CATALOGS_STATUS] (state: S, payload: { ids: Array<string>, newStatus: boolean }): void
    [CATALOGS_MT.BULK_REMOVE_CATALOGS] (state: S, payload: { ids: Array<string> }): void
}

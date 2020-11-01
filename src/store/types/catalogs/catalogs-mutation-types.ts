import { ICatalog, ICatalogState } from '@/store/types/catalogs/catalogs-types'


export enum CATALOGS_MT {
    CATALOGS_UPDATED = 'CATALOGS_UPDATED',
    CATALOG_DELETED = 'CATALOG_DELETED'
}

export type TCatalogsMutations<S = ICatalogState> = {
    [CATALOGS_MT.CATALOGS_UPDATED] (state: S, payload: ICatalog[]): void
    [CATALOGS_MT.CATALOG_DELETED] (state: S, payload: string): void
}

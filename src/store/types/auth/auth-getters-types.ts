import { ICatalog, ICatalogState } from '@/store/types/catalogs/catalogs-types'
import { IShell } from '@/services/definitions'


export type TCatalogsGetters = {
    catalogs (state: ICatalogState): IShell<ICatalog>
    count (state: ICatalogState): number
}

export const GINVOKER = {                                              // Getter Invoker
    catalogs: 'catalogs/catalogs',
    count: 'catalogs/count'
}

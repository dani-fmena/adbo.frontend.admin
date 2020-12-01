import { ICatalog, ICatalogState } from '@/store/types/catalogs/catalogs-types'
import { IShell } from '@/services/definitions'


export type TCatalogsGetters = {
    catalogs (state: ICatalogState): IShell<ICatalog>
}

export const GINVOKER = {                                              // Getter Invoker
    catalogs: 'catalogs/catalogs',
}

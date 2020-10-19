import { ICatalog, ICatalogState } from '@/store/types/catalogs/catalogs-types'


export type TCatalogsGetters = {
    catalogs (state: ICatalogState): ICatalog[]
}

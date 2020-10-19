import { GetterTree } from 'vuex'
import { ICatalogState, ICatalog } from '@/store/types/catalogs/catalogs-types'
import { TCatalogsGetters } from '@/store/types/catalogs/catalogs-getters-types'


// const catalogs: Getter<ICatalogState, unknown> = (state: ICatalogState): ICatalog[] => state.catalogs

export const getters: GetterTree<ICatalogState, any> & TCatalogsGetters = {
    catalogs : (state: ICatalogState): ICatalog[] => state.catalogs
}

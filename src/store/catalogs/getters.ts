import { GetterTree } from 'vuex'
import { IShell } from '@/services/definitions'
import { toShell } from '@/services/helpers/help-conversion'
import { ICatalogState, ICatalog } from '@/store/types/catalogs/catalogs-types'
import { TCatalogsGetters } from '@/store/types/catalogs/catalogs-getters-types'


// const catalogs: Getter<ICatalogState, unknown> = (state: ICatalogState): ICatalog[] => state.catalogs

export const getters: GetterTree<ICatalogState, any> & TCatalogsGetters = {
    catalogs: (state: ICatalogState): IShell<ICatalog> => {
        return toShell(state.catalogs)
    },
    count: (state: ICatalogState) => { return state.count }
}

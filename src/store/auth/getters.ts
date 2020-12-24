import { GetterTree } from 'vuex'
import { IAuthState } from '@/store/types/auth/auth-types'
import { TAuthGetters } from '@/store/types/auth/auth-getters-types'


// const catalogs: Getter<ICatalogState, unknown> = (state: ICatalogState): ICatalog[] => state.catalogs

export const getters: GetterTree<IAuthState, any> & TAuthGetters = {
    isAuth: (state: IAuthState): boolean => { return state.logIn },
    at: (state: IAuthState): string => { return state.at }
}

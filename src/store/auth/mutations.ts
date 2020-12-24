import { MutationTree } from 'vuex'
import { AUTH_MT, TAuthMutations } from '../types/auth/auth-mutation-types'
import { IAuthState } from '@/store/types/auth/auth-types'


export const mutations: MutationTree<IAuthState> & TAuthMutations = {
    [AUTH_MT.AUTH_LOGGED_IN] (state: IAuthState) {
        state.logIn = true
    },
    [AUTH_MT.AUTH_LOGGED_OUT] (state: IAuthState) {
        state.logIn = false
    },
}

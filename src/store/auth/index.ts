import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'
import { IAuthState } from '@/store/types/auth/auth-types'


const state: IAuthState = {
    logIn: false,
    at: ''
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

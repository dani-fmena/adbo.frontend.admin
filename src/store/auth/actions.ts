import { ActionTree } from 'vuex'
import axios from '@/services/api/api'
import { AUTH_AT, TAuthActions, AuthAC } from '@/store/types/auth/auth-actions-types'
import { AUTH_MT } from  '@/store/types/auth/auth-mutation-types'
import { IAuthFormData, IAuthState } from '@/store/types/auth/auth-types'
import { ApiAuth } from '@/services/api/api-auth'


export const actions: ActionTree<IAuthState, any> & TAuthActions = {
    [AUTH_AT.LOGIN] (context: AuthAC, payload: IAuthFormData) {
        return new Promise<void>((resolve, reject) => {
            ApiAuth.reqAccess(payload as IAuthFormData & { grand_type: string })
            .then((response: any) => {
                const at = response.data.access_token
                
                if (at.length > 10) {
                    context.commit(AUTH_MT.AUTH_LOGGED_IN, undefined)
                    axios.defaults.headers['Authorization'] = `Bearer ${ at }`
                }
    
                resolve()
            })
            .catch((error) => {reject(error)})
        })
    },
}

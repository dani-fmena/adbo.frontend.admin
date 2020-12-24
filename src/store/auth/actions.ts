import { ActionTree } from 'vuex'
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
                    context.commit(AUTH_MT.AUTH_LOGGED_IN, at)
                    ApiAuth.setAccessToken(at)
                }
    
                resolve()
            })
            .catch((error) => {reject(error)})
        })
    },
    [AUTH_AT.LOGOUT] (context: AuthAC) {
        context.commit(AUTH_MT.AUTH_LOGGED_OUT, undefined)
        ApiAuth.removeAccessToken()
    }
}

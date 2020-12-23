import { ActionContext } from 'vuex'
import { TAuthMutations } from './auth-mutation-types'
import { IAuthState, IAuthFormData } from './auth-types'


export enum AUTH_AT {
    LOGIN = 'LOGIN',
}

export type AuthAC = {                                                                                               // Auth Action Context is an augmented/specific action extend from vue action context
    commit<K extends keyof TAuthMutations> (
        key: K,
        payload: Parameters<TAuthMutations[K]>[1]
    ): ReturnType<TAuthMutations[K]>
} & Omit<ActionContext<IAuthState, any>, 'commit'>

export interface TAuthActions {
    [AUTH_AT.LOGIN] ({ commit }: AuthAC, payload: IAuthFormData): Promise<void>
}

export const AINVOKER = {                                      // Actions Invoker
    [AUTH_AT.LOGIN]: 'auth/' + AUTH_AT.LOGIN,
}

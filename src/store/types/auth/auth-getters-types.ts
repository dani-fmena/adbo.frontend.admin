import { IAuthState } from '@/store/types/auth/auth-types'


export type TAuthGetters = {
    isAuth (state: IAuthState): boolean
    at (state: IAuthState): string
}

export const GINVOKER = {                                              // Getter Invoker
    isAuth: 'auth/isAuth',
    at: 'auth/at'
}

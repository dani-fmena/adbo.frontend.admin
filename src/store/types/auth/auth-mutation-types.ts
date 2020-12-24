import { IAuthState } from './auth-types'


export enum AUTH_MT {
    AUTH_LOGGED_IN = 'AUTH_LOGGED_IN',
    AUTH_LOGGED_OUT = 'AUTH_LOGGED_OUT',
}

export type TAuthMutations<S = IAuthState> = {
    [AUTH_MT.AUTH_LOGGED_IN] (state: S): void
    [AUTH_MT.AUTH_LOGGED_OUT] (state: S): void
}

import { IAuthState } from './auth-types'


export enum AUTH_MT {
    AUTH_LOGGED_IN = 'AUTH_LOGGED_IN',
}

export type TAuthMutations<S = IAuthState> = {
    [AUTH_MT.AUTH_LOGGED_IN] (state: S): void
}

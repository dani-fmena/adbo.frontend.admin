export interface IAuthState {                                                    // Vuex state
    logIn: boolean
}

export interface IAuthResponse {
    access_token: string
}

export type IAuthFormData = {
    username: string
    password: string
}

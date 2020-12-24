export interface IAuthState {                                                    // Vuex state
    logIn: boolean
    at: string
}

export interface IAuthResponse {
    access_token: string
}

export type IAuthFormData = {
    username: string
    password: string
}

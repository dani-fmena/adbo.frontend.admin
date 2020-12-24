import axios from 'axios'
import config from './config'
import store from '@/store'
import router from '@/router'
//@ts-ignore
import Nprogress from 'nprogress'
import { AINVOKER } from '@/store/types/auth/auth-actions-types'
import { PATHS } from '@/router/paths'


Nprogress.configure({ trickleSpeed: 1500, showSpinner: false, easing: 'ease', speed: 500 });

const customInstance = axios.create({
    baseURL: config.site.api,
    headers: {
        'Accept': 'application/json'
    },
    withCredentials: true
})

// I think that the code we have in this interceptor is going on detrimental of the app performance
//  ---- BEFORE A REQUEST ----
customInstance.interceptors.request.use(config => {
    
    // Trying to show the nprogress bar
    const a = document.querySelector('div#topper-border-cont')
    a!.setAttribute('class', a!.className + ' mp-4-nprogress')
    Nprogress.start()
    
    return config
    
}, error => {
    Nprogress.done()
    return Promise.reject(error)
})

// ---- BEFORE A RESPONSE ----
customInstance.interceptors.response.use(response => {
    
    // Trying to hide the nprogress bar
    const a = document.querySelector('div#topper-border-cont')
    a!.setAttribute('class', 'main-panel ps mp-stylized');
    Nprogress.done()
    
    return response
    
}, error => {
    Nprogress.done()
    
    // Handling Expired Token, when token expires, the user will be auth (according tho the state) and the store will have an access token, yet the token will bie invalid for the backend 'cause it's expiration time. So we need to handle this
    if(error.response.status !== 401) {
        store.dispatch(AINVOKER.LOGOUT)
        router.push(PATHS.login)
    }
    
    return Promise.reject(error)
})

export default customInstance

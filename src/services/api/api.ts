import axios from 'axios'
import config from './config'
//@ts-ignore
import Nprogress from 'nprogress'


Nprogress.configure({ trickleSpeed: 1500, showSpinner: false, easing: 'ease', speed: 500 });

const customInstance = axios.create({
    baseURL: config.site.api,
    headers: {
        'Accept': 'application/json'
    }
})
// I think that the code we have in this interceptor is pro detrimental about the performance of the application
// before a request
customInstance.interceptors.request.use(config => {
    const a = document.querySelector('#topper-border-cont')
    a!.setAttribute('class', a!.className + ' mp-4-nprogress')
    Nprogress.start()
    return config
})

// before a response
customInstance.interceptors.response.use(response => {
    const a = document.querySelector('#topper-border-cont')
    a!.setAttribute('class', 'main-panel ps mp-stylized');
    Nprogress.done()
    return response
})

export default customInstance

import axios from './api'
import config from './config'
import { AxiosPromise } from 'axios'
import { IAuthFormData, IAuthResponse } from '@/store/types/auth/auth-types'
import qs from 'query-string'


export class ApiAuth {
    public static reqAccess (formData: IAuthFormData & { grand_type: string }): AxiosPromise<IAuthResponse> {
        formData['grand_type'] = config.auth.grand_type
    
        return axios.post(
            `auth/token`,
            qs.stringify(formData),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    }
    
    public static setAccessToken (at: string) {
        axios.defaults.headers['Authorization'] = `Bearer ${ at }`          // Setting Bearer Token
    }
    
    public static removeAccessToken () {
        delete axios.defaults.headers['Authorization']                                  // Removing Bearer Token
    }
}

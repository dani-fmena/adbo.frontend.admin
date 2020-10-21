import axios from './api'
import { AxiosPromise } from 'axios'
import { ICatalog } from '@/store/types/catalogs/catalogs-types'


export class ApiCatalogs {
    public static getAll (): AxiosPromise<ICatalog[]> {
        return axios.get(`catalogs/`)
    }
}

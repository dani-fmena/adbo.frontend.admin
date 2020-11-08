import axios from './api'
import { AxiosPromise } from 'axios'
import { ICatalog } from '@/store/types/catalogs/catalogs-types'


export class ApiCatalogs {
    public static getAll (): AxiosPromise<ICatalog[]> {
        return axios.get(`catalogs/`)
    }
    
    public static delete (id: string): AxiosPromise<ICatalog> {
        return axios.delete(`catalogs/${ id }`)
    }
    
    public static create (catalog: Partial<ICatalog>): AxiosPromise<ICatalog> {
        return axios.post(`catalogs/`, catalog)
    }
}

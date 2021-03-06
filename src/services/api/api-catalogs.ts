import axios from './api'
import { AxiosPromise } from 'axios'
import { ICatalog } from '@/store/types/catalogs/catalogs-types'
import { IDTQueryBase } from '@/services/definitions'


export class ApiCatalogs {
    public static getCount (): AxiosPromise<number> {
        return axios.get(`catalogs/count`)
    }
    
    public static makeQueryRequest (queryData: IDTQueryBase): AxiosPromise<ICatalog[]> {
        return axios.get(`catalogs/`, { params: queryData })
    }
    
    public static delete (id: string): AxiosPromise<ICatalog> {
        return axios.delete(`catalogs/${ id }`)
    }
    
    public static create (catalog: Partial<ICatalog>): AxiosPromise<ICatalog> {
        return axios.post(`catalogs/`, catalog)
    }
    
    public static edit (catalog: Partial<ICatalog>): AxiosPromise<ICatalog> {
        return axios.put(`catalogs/`, catalog)
    }
    
    public static setStatus (id: string, isToEnable: boolean = true): AxiosPromise<void> {
        if (isToEnable) return axios.post(`catalogs/enable/${ id }`)
        else return axios.post(`catalogs/disable/${ id }`)
    }
    
    public static bulkEnable(ids: Array<string>): AxiosPromise<void> {
        return axios.post(`catalogs/bulk/enable`, ids)
    }
    
    public static bulkDisable(ids: Array<string>): AxiosPromise<void> {
        return axios.post(`catalogs/bulk/disable`, ids)
    }
    
    public static bulkRemove(ids: Array<string>): AxiosPromise<void> {
        return axios.post(`catalogs/bulk/remove`, ids)
    }
}

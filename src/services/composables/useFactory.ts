/* OBJECTS CREATIONS */
import { ICatalog } from '@/store/types/catalogs/catalogs-types'


export default function useFactory () {
    
    /***
     * Create a new empty Catalog
     */
    const mkCatalog = (): Partial<ICatalog> => {
        return {
            name: "",
            isEnable: true
        }
    }
    
    return {
        mkCatalog,
    }
}

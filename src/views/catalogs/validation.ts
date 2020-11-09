import { ICatalog } from '@/store/types/catalogs/catalogs-types'
import { vLengthMin, vRequired } from '@/services/validations/rules'


//region ======== SCHEMA ================================================================
export const VSCHEMA = {
    ['name' as keyof ICatalog]: (value: string) => {
        return vName(value, 'name')
    }
}
//endregion =============================================================================


//region ======== VALIDATIONS FUNCTIONS =================================================
function vName (val:any, field: string) : boolean | string {
    
    if (!vRequired(val)) return `The ${field} if required`
    if (!vLengthMin(val)) return `The ${field} of the catalog is invalid`
    
    return true
}
//endregion =============================================================================

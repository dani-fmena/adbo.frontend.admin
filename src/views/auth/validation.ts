import { ICatalog } from '@/store/types/catalogs/catalogs-types'
import { vLengthMin, vRequired } from '@/services/validations/rules'


//region ======== SCHEMA ================================================================
export const VSCHEMA = {
    ['username' as keyof ICatalog]: (value: string) => {
        return vUserName(value, 'username')
    },
    ['password' as keyof ICatalog]: (value: string) => {
        return vPassword(value, 'password')
    }
}
//endregion =============================================================================


//region ======== VALIDATIONS FUNCTIONS =================================================
function vUserName (val:any, field: string) : boolean | string {
    
    if (!vRequired(val)) return `The ${field} is required`
    if (!vLengthMin(val)) return `The ${field} is invalid`
    
    return true
}

function vPassword (val:any, field: string) : boolean | string {
    
    if (!vRequired(val)) return `The ${field} is required`
    if (!vLengthMin(val)) return `The ${field} is invalid`
    
    return true
}
//endregion =============================================================================

import { ICatalog } from '@/store/types/catalogs/catalogs-types'
import { vLengthMin, vRequired } from '@/services/validations/rules'


//region ======== SCHEMA ================================================================
export const VSCHEMA = {
    ['name' as keyof ICatalog]: (value: string) => {
        return vName(value)
    }
}
//endregion =============================================================================


//region ======== VALIDATIONS FUNCTIONS =================================================
function vName (val:any) : boolean | string {
    
    if (!vRequired(val)) return "The name if required"
    if (!vLengthMin(val)) return "The name of the catalog is invalid"
    
    return true
}
//endregion =============================================================================

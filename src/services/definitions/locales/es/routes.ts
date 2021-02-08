import { PATH_NAMES } from '@/services/definitions'

export default {
    //region ======== ROOTS =================================================================
    [PATH_NAMES.dashboard]: PATH_NAMES.dashboard,
    logout: 'salir',
    //endregion =============================================================================
    
    //region ======== CATALOGS ==============================================================
    [PATH_NAMES.catalogs]: 'Catálogos',
    [PATH_NAMES.catalogsForm]: 'Editar Catálogo',
    'catalog-create': 'Crear Catálogo',
    [PATH_NAMES.catalogsDetails]: 'Detalles de Catálogo',
    //endregion =============================================================================
    
    //region ======== USERS =================================================================
    [PATH_NAMES.users]: 'Usuarios',
    [PATH_NAMES.roles]: PATH_NAMES.roles,
    //endregion =============================================================================
}

export default {
    //region ======== PLACEHOLDERS ==========================================================
    'ph-user': 'usuario',
    'ph-pass': 'contraseña',
    'ph-search': 'buscar',
    //endregion =============================================================================
    
    //region ======== FIELDS ================================================================
    _id: 'ID',
    id: '@:data._id',     // This is a linked msg check 👉🏽 https://vue-i18n.intlify.dev/guide/essentials/syntax.html#linked-messages
    Name: 'Nombre',
    isEnable: 'Activo',
    
    // Catalogs
    size: 'Tamaño(MB)',
    Items: 'Elementos',
    Actions: 'Acciones',
    //endregion =============================================================================
    
    //region ======== PAGINATION ============================================================
    'footer-description': 'Mostrando del {start} al {end} de {total} total de entradas'
    //endregion =============================================================================
}

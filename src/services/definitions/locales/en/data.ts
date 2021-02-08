export default {
    //region ======== PLACEHOLDERS ==========================================================
    'ph-user': 'user',
    'ph-pass': 'password',
    'ph-search': 'search',
    //endregion =============================================================================
    
    //region ======== FIELDS ================================================================
    _id: 'ID',
    id: '@:data._id',  // This is a linked msg check 👉🏽 https://vue-i18n.intlify.dev/guide/essentials/syntax.html#linked-messages
    Name: 'Name',
    isEnable: 'Status',
    
    // Catalogs
    size: 'Size(MB)',
    Items: 'Items',
    Actions: 'Actions',
    //endregion =============================================================================
    
    //region ======== PAGINATION ============================================================
    'footer-description': 'Showing {start} to {end} of {total} entries'
    //endregion =============================================================================
}

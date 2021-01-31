export class PATHS {
    static readonly login = '/'
    
    static readonly dashboard = '/dashboard'
    static readonly default = '/default'
    static readonly about = '/about'
    
    static readonly catalogs = '/catalogs'
    static readonly catalogsForm = '/catalogs/:fmode/:id?'              // fmode -> form mode
    static readonly catalogsDetails = '/catalogs/details/:id'
    
    static readonly users = '/users'
    static readonly usersForm = '/users/:fmode/:id?'
    static readonly usersDetails = '/users/details/:id'
    static readonly roles = '/roles'
    static readonly rolesForm = '/roles/:fmode/:id?'
    static readonly rolesDetails = '/roles/details/:id'
}

export class PATH_NAMES {
    static readonly login = 'Login'
    static readonly dashboard = 'Dashboard'
    static readonly default = 'Default'
    static readonly about = 'About'
    
    static readonly catalogs = 'Catalogs'
    static readonly catalogsForm = 'Edit Catalogs'
    static readonly catalogsDetails = 'Catalogs Details'
    
    static readonly users = 'Users'
    static readonly usersForm = 'Edit User'
    static readonly usersDetails = 'User Details'
    static readonly roles = 'Roles'
    static readonly rolesForm = 'Edit Roles'
    static readonly rolesDetails = 'Roles Details'
}

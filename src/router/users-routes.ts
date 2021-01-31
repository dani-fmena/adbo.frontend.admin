import { RouteRecordRaw } from 'vue-router'
import { PATHS, PATH_NAMES } from '@/router/paths'
import { BaseDashboardLay } from '../layout'


export const usersRoutes: Array<RouteRecordRaw> = [
    
    // ======== USERS
    {
        path: PATHS.users,
        name: PATH_NAMES.users,
        component: () => import(/* webpackChunkName: "UsersView" */ '../views/users/users/UsersView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    {
        path: PATHS.usersForm,
        name: PATH_NAMES.usersForm,
        component: () => import(/* webpackChunkName: "FormCatalogView" */ '../views/users/users/FormUserView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    {
        path: PATHS.usersDetails,
        name: PATH_NAMES.usersDetails,
        component: () => import(/* webpackChunkName: "DetailsCatalogView" */ '../views/users/users/DetailsUserView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    
    // ======== ROLES & PERMS
    {
        path: PATHS.roles,
        name: PATH_NAMES.roles,
        component: () => import(/* webpackChunkName: "UsersView" */ '../views/users/roles/RolesView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    {
        path: PATHS.rolesForm,
        name: PATH_NAMES.rolesForm,
        component: () => import(/* webpackChunkName: "FormCatalogView" */ '../views/users/roles/FormRolesView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    {
        path: PATHS.rolesDetails,
        name: PATH_NAMES.rolesDetails,
        component: () => import(/* webpackChunkName: "DetailsCatalogView" */ '../views/users/roles/DetailsRolesView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    }
]

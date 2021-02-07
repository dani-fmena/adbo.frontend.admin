import { RouteRecordRaw } from 'vue-router'
import { RoutePaths, PATH_NAMES } from '@/services/definitions'
import { BaseDashboardLay } from '../layout'


export const usersRoutes: Array<RouteRecordRaw> = [
    
    // ======== USERS
    {
        path: RoutePaths.users,
        name: PATH_NAMES.users,
        component: () => import(/* webpackChunkName: "UsersView" */ '../views/users/users/UsersView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    {
        path: RoutePaths.usersForm,
        name: PATH_NAMES.usersForm,
        component: () => import(/* webpackChunkName: "FormCatalogView" */ '../views/users/users/FormUserView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    {
        path: RoutePaths.usersDetails,
        name: PATH_NAMES.usersDetails,
        component: () => import(/* webpackChunkName: "DetailsCatalogView" */ '../views/users/users/DetailsUserView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    
    // ======== ROLES & PERMS
    {
        path: RoutePaths.roles,
        name: PATH_NAMES.roles,
        component: () => import(/* webpackChunkName: "UsersView" */ '../views/users/roles/RolesView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    {
        path: RoutePaths.rolesForm,
        name: PATH_NAMES.rolesForm,
        component: () => import(/* webpackChunkName: "FormCatalogView" */ '../views/users/roles/FormRolesView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    {
        path: RoutePaths.rolesDetails,
        name: PATH_NAMES.rolesDetails,
        component: () => import(/* webpackChunkName: "DetailsCatalogView" */ '../views/users/roles/DetailsRolesView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    }
]

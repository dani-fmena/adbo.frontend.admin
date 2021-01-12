import { RouteRecordRaw } from 'vue-router'
import { PATHS, PATH_NAMES } from '@/router/paths'
import { BaseDashboardLay } from '../layout'


export const usersRoutes: Array<RouteRecordRaw> = [
    {
        path: PATHS.users,
        name: PATH_NAMES.users,
        component: () => import(/* webpackChunkName: "UsersView" */ '../views/users/UsersView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    // {
    //     path: PATHS.usersForm,
    //     name: PATH_NAMES.usersForm,
    //     component: () => import(/* webpackChunkName: "FormCatalogView" */ '../views/users/FormCatalogView.vue'),
    //     meta: { layout: BaseDashboardLay, reqAuth: true }
    // },
    // {
    //     path: PATHS.usersDetails,
    //     name: PATH_NAMES.usersDetails,
    //     component: () => import(/* webpackChunkName: "DetailsCatalogView" */ '../views/users/DetailsCatalogView.vue'),
    //     meta: { layout: BaseDashboardLay, reqAuth: true }
    // }
]

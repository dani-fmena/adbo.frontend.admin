import { RouteRecordRaw } from 'vue-router'
import { PATHS, PATH_NAMES } from '@/router/paths'
import { BaseDashboardLay } from '../layout'


export const catalogRoutes: Array<RouteRecordRaw> = [
    {
        path: PATHS.catalogs,
        name: PATH_NAMES.catalogs,
        component: () => import(/* webpackChunkName: "CatalogsView" */ '../views/catalogs/CatalogsView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    {
        path: PATHS.catalogsForm,
        name: PATH_NAMES.catalogsForm,
        component: () => import(/* webpackChunkName: "FormCatalogView" */ '../views/catalogs/FormCatalogView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    {
        path: PATHS.catalogsDetails,
        name: PATH_NAMES.catalogsDetails,
        component: () => import(/* webpackChunkName: "DetailsCatalogView" */ '../views/catalogs/DetailsCatalogView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    }
]

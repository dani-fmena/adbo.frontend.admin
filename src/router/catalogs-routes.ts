import { RouteRecordRaw } from 'vue-router'
import { RoutePaths, PATH_NAMES } from '@/services/definitions'
import { BaseDashboardLay } from '../layout'


export const catalogRoutes: Array<RouteRecordRaw> = [
    {
        path: RoutePaths.catalogs,
        name: PATH_NAMES.catalogs,
        component: () => import(/* webpackChunkName: "CatalogsView" */ '../views/catalogs/CatalogsView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    {
        path: RoutePaths.catalogsForm,
        name: PATH_NAMES.catalogsForm,
        component: () => import(/* webpackChunkName: "FormCatalogView" */ '../views/catalogs/FormCatalogView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    {
        path: RoutePaths.catalogsDetails,
        name: PATH_NAMES.catalogsDetails,
        component: () => import(/* webpackChunkName: "DetailsCatalogView" */ '../views/catalogs/DetailsCatalogView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    }
]

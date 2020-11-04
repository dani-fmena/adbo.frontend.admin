import { RouteRecordRaw } from 'vue-router'
import { PATHS, PATH_NAMES } from '@/router/paths'
import { BaseDashboardLay } from '../layout'


export const catalogRoutes: Array<RouteRecordRaw> = [
    {
        path: PATHS.catalogs,
        name: PATH_NAMES.catalogs,
        component: () => import('../views/catalogs/CatalogsView.vue'),
        meta: { layout: BaseDashboardLay }
    },
    {
        path: PATHS.catalogsForm,
        name: PATH_NAMES.catalogsForm,
        component: () => import('../views/catalogs/FormCatalogView.vue'),
        meta: { layout: BaseDashboardLay }
    },
    {
        path: PATHS.catalogsDetails,
        name: PATH_NAMES.catalogsDetails,
        component: () => import('../views/catalogs/DetailsCatalogView.vue'),
        meta: { layout: BaseDashboardLay }
    }
]

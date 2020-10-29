import { RouteRecordRaw } from 'vue-router'
import { PATHS, PATH_NAMES } from '@/router/paths'
import { CatalogsView, DetailsCatalogView, EditCatalogView } from '../views'
import { BaseDashboardLay } from '../layout'


export const catalogRoutes: Array<RouteRecordRaw> = [
    {
        path: PATHS.catalogs,
        name: PATH_NAMES.catalogs,
        component: CatalogsView,
        meta: { layout: BaseDashboardLay }
    },
    {
        path: PATHS.catalogsEdit,
        component: EditCatalogView,
        name: PATH_NAMES.catalogsEdit,
        meta: { layout: BaseDashboardLay }
    },
    {
        path: PATHS.catalogsDetails,
        component: DetailsCatalogView,
        name: PATH_NAMES.catalogsDetails,
        meta: { layout: BaseDashboardLay }
    }
]

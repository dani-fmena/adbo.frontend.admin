import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { DefaultView, DashboardView, LoginView, CatalogsView } from '../views'
import { BasePageLay, BaseDashboardLay } from '../layout'
import { PATHS } from './paths'


const routes: Array<RouteRecordRaw> = [
    {
        path: PATHS.path_login,
        name: PATHS.login,
        component: LoginView,
        meta: { layout: BasePageLay }
    },
    {
        path: PATHS.path_dashboard,
        name: PATHS.dashboard,
        component: DashboardView,
        meta: { layout: BaseDashboardLay }
    },
    {
        path: PATHS.path_catalogs,
        name: PATHS.catalogs,
        component: CatalogsView,
        meta: { layout: BaseDashboardLay }
    },
    {
        path: PATHS.path_default,
        name: PATHS.default,
        component: DefaultView,
        meta: { layout: BasePageLay }
    },
    {
        path: PATHS.path_about,
        name: PATHS.about,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        meta: { layout: BasePageLay }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

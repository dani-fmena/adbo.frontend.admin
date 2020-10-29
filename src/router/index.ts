import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { DefaultView, DashboardView, LoginView } from '../views'
import { catalogRoutes } from './catalogs-routes'
import { BasePageLay, BaseDashboardLay } from '../layout'
import { PATHS, PATH_NAMES } from './paths'


const routes: Array<RouteRecordRaw> = [
    {
        path: PATHS.login,
        name: PATH_NAMES.login,
        component: LoginView,
        meta: { layout: BasePageLay }
    },
    {
        path: PATHS.dashboard,
        name: PATH_NAMES.dashboard,
        component: DashboardView,
        meta: { layout: BaseDashboardLay }
    },
    ...catalogRoutes,
    {
        path: PATHS.default,
        name: PATH_NAMES.default,
        component: DefaultView,
        meta: { layout: BasePageLay }
    },
    {
        path: PATHS.about,
        name: PATH_NAMES.about,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        meta: { layout: BasePageLay }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

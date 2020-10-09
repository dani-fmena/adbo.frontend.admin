import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { DefaultView, DashboardView, LoginView } from '../views'
import { BasePageLay, BaseDashboardLay } from '../layout'
import { PathStrings } from './paths-strings'


const routes: Array<RouteRecordRaw> = [
    {
        path: PathStrings.path_login,
        name: PathStrings.login,
        component: LoginView,
        meta: { layout: BasePageLay }
    },
    {
        path: PathStrings.path_dashboard,
        name: PathStrings.dashboard,
        component: DashboardView,
        meta: { layout: BaseDashboardLay }
    },
    {
        path: PathStrings.path_default,
        name: PathStrings.default,
        component: DefaultView,
        meta: { layout: BasePageLay }
    },
    {
        path: PathStrings.path_about,
        name: PathStrings.about,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        meta: { layout: BasePageLay }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

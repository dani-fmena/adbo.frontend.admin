import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Default from '../views/Default.vue'
import Dashboard from '../views/Dashboard.vue'
import BasePage from '../layout/BasePage.vue'
import BaseDashboard from '../layout/BaseDashboard.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
        meta: { layout: BaseDashboard }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { layout: BasePage }
    },
    {
        path: '/default',
        name: 'Default',
        component: Default,
        meta: { layout: BasePage }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: { layout: BaseDashboard }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import { catalogRoutes } from './catalogs-routes'
import { BasePageLay, BaseDashboardLay } from '../layout'
import { PATHS, PATH_NAMES } from './paths'
import { GINVOKER } from '@/store/types/auth/auth-getters-types'
import { ApiAuth } from '@/services/api/api-auth'


const routes: Array<RouteRecordRaw> = [
    {
        path: PATHS.login,
        name: PATH_NAMES.login,
        component: () => import('../views/auth/LoginView.vue'),
        meta: { layout: BasePageLay }
    },
    {
        path: PATHS.dashboard,
        name: PATH_NAMES.dashboard,
        component: () => import(/* webpackChunkName: "DashboardView" */ '../views/DashboardView.vue'),
        meta: { layout: BaseDashboardLay, reqAuth: true }
    },
    ...catalogRoutes,
    {
        path: PATHS.default,
        name: PATH_NAMES.default,
        component: () => import(/* webpackChunkName: "DefaultView" */ '../views/DefaultView.vue'),
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

// GUARD - auth checker
router.beforeEach((to , _, next) => {
    
    if (store ===  undefined) next()
    else if (to.meta.reqAuth && !store.getters[GINVOKER.isAuth]) next(PATHS.login)                                  // Not logged / auth
    else if (to.name === PATH_NAMES.login && store.getters[GINVOKER.isAuth])                                        // Try to login but the user is logged in already
    {
        ApiAuth.setAccessToken(store.getters[GINVOKER.at])                                                          // As the user is logged in already the access_token has to be in the store
        next(PATHS.dashboard)
    }
    else next()                                                                                                     // Carry on
    
})

export default router

import {
    createRouter,
    createWebHistory
} from 'vue-router'

const routes = [{
        path: '/',
        name: 'Home',
        component: () => import("../views/index.vue")
    },
    {
        path: '/detail/:id',
        name: "detail",
        component: () => import("../views/detail.vue")
    },
    {
        path: '/passData',
        name: "passData",
        component: () => import("../views/parent.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
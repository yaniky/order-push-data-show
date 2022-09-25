import {
    createRouter, createWebHistory, Router, RouteRecordRaw
} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        name: "Home",
        component: () => import(/* webpackChunkName: 'home' */"@/page/home.vue")
    }
];

const router: Router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
import type {
    RouteRecordRaw,
} from 'vue-router';

// vite-ssg builds the router itself, since pre-rendering needs a memory history.
export const routes: RouteRecordRaw[] = [
    {
        component: () => {
            return import('./views/HomeView.vue');
        },
        name: 'home',
        path: '/',
    },
    {
        component: () => {
            return import('./views/AboutView.vue');
        },
        name: 'about',
        path: '/about',
    },
    {
        component: () => {
            return import('./views/PostView.vue');
        },
        name: 'post',
        path: '/posts/:slug',
        props: true,
    },
    // Pre-rendered to dist/404.html, which GitHub Pages serves for unmatched URLs.
    {
        component: () => {
            return import('./views/NotFound.vue');
        },
        name: 'not-found-page',
        path: '/404',
    },
    {
        component: () => {
            return import('./views/NotFound.vue');
        },
        name: 'not-found',
        path: '/:pathMatch(.*)*',
    },
];

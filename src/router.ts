import type { 
    RouteRecordRaw,
} from 'vue-router';

/*
 * vite-ssg builds the router itself (it needs a memory history when
 * pre-rendering in Node), so this exports plain route records rather
 * than a router instance.
 */
export const routes: RouteRecordRaw[] = [
    { 
        component: () => {
            return import('./views/HomeView.vue') 
        },
        name: 'home', 
        path: '/', 
    },
    { 
        component: () => {
            return import('./views/AboutView.vue') 
        },
        name: 'about', 
        path: '/about', 
    },
    { 
        component: () => {
            return import('./views/PostView.vue')
        }, 
        name: 'post', 
        path: '/posts/:slug', 
        props: true,
    },
    /*
     * Pre-rendered to dist/404.html, which GitHub Pages serves for any
     * unmatched URL. The catch-all below handles client-side navigation.
     */
    { 
        component: () => {
            return import('./views/NotFound.vue') 
        },
        name: 'not-found-page', 
        path: '/404', 
    },
    { 
        component: () => {
            return import('./views/NotFound.vue') 
        },
        name: 'not-found', 
        path: '/:pathMatch(.*)*', 
    },
];

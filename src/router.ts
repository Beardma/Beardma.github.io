import { 
    createRouter, 
    createWebHistory 
} from 'vue-router';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
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
        { 
            component: () => {
                return import('./views/NotFound.vue') 
            },
            name: 'not-found', 
            path: '/:pathMatch(.*)*', 
        },
    ],
    scrollBehavior: () => {
        return ({ top: 0 })
    },
})
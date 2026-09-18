import {
    ViteSSG,
} from 'vite-ssg';
import App from './App.vue';
import {
    routes,
} from './router';
import './style.css';

// vite-ssg looks for a named `createApp` export.
export const createApp = ViteSSG(
    App,
    {
        routes,
        scrollBehavior: () => {
            return {
                top: 0,
            };
        },
    },
);

import { 
    ViteSSG,
} from 'vite-ssg'
import './style.css'
import {
    routes,
} from './router';
import App from './App.vue'

// named export `createApp` is the entry point vite-ssg looks for
export const createApp = ViteSSG(
    App,
    {
        routes,
        scrollBehavior: () => {
            return ({ top: 0 });
        },
    },
);

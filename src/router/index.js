import Vue from 'vue';
import VueRouter from 'vue-router';
import Book from '../views/BookView.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'livro',
        component: () => import ('../views/BookView.vue')
    }
];

const router = new VueRouter ({

    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router;


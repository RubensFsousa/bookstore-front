import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/livro',
        name: 'livro',
        component: () => import('@/views/BookView.vue')
    },
    {
        path: '/editora',
        name: 'editora',
        component: () => import('@/views/PublisherView.vue')
    },
    {
        path: '/leitor',
        name: 'leitor',
        component: () => import('@/views/UserView.vue')
    },
    {
        path: '/aluguel',
        name: 'aluguel',
        component: () => import('@/views/RentView.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import CardPage from '@/pages/CardPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CardPage,
  },
  {
    path: '/order',
    name: 'order',
    component: OrderPage,
  },
  {
    path: '/order/:id',
    name: 'orderInfo',
    component: OrderInfoPage,
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFoundPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import SwapsOfMyWork from './views/SwapsOfMyWork.vue';
import SwapsOfMyCollection from './views/SwapsOfMyCollection.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
    },
    {
      path: '/my-art-on-secondary-market',
      name: 'my-art-on-secondary-market',
      component: SwapsOfMyWork,
    },
    {
      path: '/my-secondary-market-sales',
      name: 'my-secondary-market-sales',
      component: SwapsOfMyCollection,
    },
  ],
});

export default router;

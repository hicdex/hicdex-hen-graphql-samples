import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SwapsOfMyWork from './views/SwapsOfMyWork.vue';
import SwapsOfMyCollection from './views/SwapsOfMyCollection.vue';
import CreatorGallery from './views/CreatorGallery.vue';
import CollectorGallery from './views/CollectorGallery.vue';
import PriceHistory from './views/PriceHistory.vue';
import CreatorCollectors from './views/CreatorCollectors.vue';
import Docs from './views/Docs.vue';
import Sold from './views/Sold.vue';
import Objkt from './views/Objkt.vue';
import Charts from './views/Charts.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
    {
      path: '/creator-gallery',
      name: 'creator-gallery',
      component: CreatorGallery,
    },
    {
      path: '/collector-gallery',
      name: 'collector-gallery',
      component: CollectorGallery,
    },
    {
      path: '/price-history',
      name: 'price-history',
      component: PriceHistory,
    },
    {
      path: '/creator-collectors',
      name: 'creator-collectors',
      component: CreatorCollectors,
    },
    {
      path: '/sold',
      name: 'sold',
      component: Sold,
    },
    {
      path: '/objkt',
      name: 'objkt',
      component: Objkt,
    },
    {
      path: '/docs',
      name: 'docs',
      component: Docs,
    },
    {
      path: '/charts',
      name: 'charts',
      component: Charts,
    },
  ],
});

export default router;

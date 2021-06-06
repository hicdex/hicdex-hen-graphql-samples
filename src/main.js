import Vue from 'vue';
import GeistUI from '@geist-ui/vue';
import Buefy from 'buefy';
import VueApollo from 'vue-apollo';

import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';

import App from './App.vue';
import router from './router';

import 'buefy/dist/buefy.css';
import '../public/hicdex.css';

Vue.use(VueApollo);

Vue.use(Buefy);
Vue.use(GeistUI);

Vue.config.productionTip = false;

const link = new WebSocketLink({
  uri: 'wss://api.hicdex.com/v1/graphql',
  options: {
    reconnect: true,
    timeout: 30000,
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: true,
  }),
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');

<template>
  <div>
    <b-loading :is-full-page="true" v-model="$apollo.queries.hic_et_nunc_trade.loading" :can-cancel="false"></b-loading>

    <div v-if="error">{{ error }}</div>
    <b-field>
      <b-input placeholder="1234" v-model="objkt" autofocus></b-input>
    </b-field>
    <b-tabs v-model="filterStatus">
      <template v-for="filter in filters">
        <b-tab-item
          :key="filter.value"
          :value="filter.value"
          :label="filter.label">
        </b-tab-item>
      </template>
    </b-tabs>
    <HistoryItem :trades="filteredTrades" :objkt="objkt" />
    <div v-show="objkt && filterStatus === 'query'">
      <pre><code>{{ graphqlTemplate(query, {token: objkt}) }}</code></pre>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import HistoryItem from '../components/HistoryItem.vue';
import { graphqlTemplate } from '../utils';

export const QUERY = gql`
  query PriceHistory($token: bigint = "") {
    hic_et_nunc_trade(where: {token_id: {_eq: $token}}, order_by: {swap: {price: desc}}) {
      timestamp
      seller {
        address
      }
      buyer {
        address
      }
      swap {
        price
      }
      token {
        creator {
          address
        }
      }
    }
  }
`;
export default {
  components: {
    HistoryItem,
  },
  mounted() {
    if (this.$route.query.objkt) {
      this.objkt = this.$route.query.objkt;
    }
  },
  data() {
    return {
      objkt: undefined,
      filterStatus: 'all',
      hic_et_nunc_trade: [],
      error: null,
      filters: [
        { label: 'All', value: 'all' },
        { label: 'Price > 0.01', value: 'not_free' },
        { label: 'Query', value: 'query' },
      ],
      query: QUERY,
    };
  },
  watch: {
    objkt(newVal) {
      if (newVal !== this.$route.query.objkt) {
        this.$router.push({ name: 'price-history', query: { objkt: newVal } });
      }
    },
  },
  computed: {
    filteredTrades() {
      if (this.filterStatus === 'query') {
        return [];
      }
      if (this.filterStatus === 'not_free') {
        return this.hic_et_nunc_trade.filter((trade) => trade.swap.price > 0.01);
      }
      return this.hic_et_nunc_trade;
    },
  },
  methods: {
    graphqlTemplate,
    filterResults(type) {
      if (type.value === 'query') {
        this.filterStatus = 'query';
      } else if (type.value === 'not_free') {
        this.filterStatus = 'not_free';
      } else {
        this.filterStatus = 'all';
      }
    },
  },
  apollo: {
    hic_et_nunc_trade: {
      query: QUERY,
      variables() {
        return {
          token: this.objkt,
        };
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      skip() {
        return !this.objkt;
      },
    },
  },
};
</script>

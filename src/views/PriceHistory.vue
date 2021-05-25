<template>
  <div>
    <zi-spacer y="1" />
    <div class="overlay" v-if="$apollo.queries.hic_et_nunc_trade.loading">
      <div class="overlay-content">
        <zi-spinner size="big" />
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <zi-input placeholder="1234" v-model="objkt" size="medium" autofocus style="width: 400px" />
    <zi-spacer y="2" />
    <zi-tabs @label-selected="filterResults">
      <zi-tabs-item v-for="(item, index) in filters" :label="item.label" :value="item.value" :key="item.value + index">
      </zi-tabs-item>
    </zi-tabs>
    <HistoryItem :trades="filteredTrades" :objkt="objkt" />
    <div v-show="objkt">
      <zi-spacer y="2" />
      <h4>Using this query</h4>
      <pre><code>{{ graphqlTemplate(query, {token: objkt}) }}</code></pre>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import HistoryItem from '../components/HistoryItem.vue';
import { graphqlTemplate1 } from '../utils';

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
      console.log(this.hic_et_nunc_trade);
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
    graphqlTemplate: graphqlTemplate1,
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

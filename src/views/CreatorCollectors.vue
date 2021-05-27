<template>
  <div>
    <b-loading :is-full-page="true" v-model="$apollo.queries.hic_et_nunc_trade.loading" :can-cancel="false"></b-loading>

    <div v-if="error">{{ error }}</div>
    <b-field>
      <b-input placeholder="tz… or alice.tez" v-model="addressInput" autofocus></b-input>
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
    <BuyersList v-if="filterStatus === 'all'" :trades="trades" :address="address" />
    <div v-show="addressInput && filterStatus === 'query'">
      <pre><code>{{ graphqlTemplate(query, {address}) }}</code></pre>
    </div>
    <div v-if="filterStatus === 'csv'">
      <pre><code v-html="csv"></code></pre>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import BuyersList from '../components/BuyersList.vue';
import { getAddress, graphqlTemplate } from '../utils';

export const QUERY = gql`
  query OBJKTBuyers($address: String = "") {
    hic_et_nunc_trade(where: {seller: {address: {_eq: $address}}, token: {creator: {address: {_eq: $address}}}}, distinct_on: buyer_id) {
      buyer {
        address
        purchases_aggregate(where: {seller: {address: {_eq: $address}}}) {
          aggregate {
            count
          }
        }
      }
    }
  }
`;
export default {
  components: {
    BuyersList,
  },
  mounted() {
    if (this.$route.query.address) {
      this.address = this.$route.query.address;
      this.addressInput = this.address;
    }
  },
  data() {
    return {
      addressInput: '',
      address: '',
      hic_et_nunc_trade: [],
      trades: [],
      csv: '',
      error: null,
      filterStatus: 'all',
      filters: [
        { label: 'All', value: 'all' },
        { label: 'CSV', value: 'csv' },
        { label: 'Query', value: 'query' },
      ],
      query: QUERY,
    };
  },
  watch: {
    addressInput(newVal) {
       getAddress(newVal).then((address) => {
         if (address.length === 36 && this.address !== address) {
          this.$router.push({ name: 'creator-collectors', query: { address } });
         }
         this.address = address;
       });
    },
    hic_et_nunc_trade(newVal) {
      this.trades = [...newVal].sort((a, b) => b.buyer.purchases_aggregate.aggregate.count - a.buyer.purchases_aggregate.aggregate.count);
      this.csv = this.trades.map((obj) => [
          obj.buyer.purchases_aggregate.aggregate.count,
          obj.buyer.address,
        ].join(',')).join('\n');
    },
  },
  methods: {
    graphqlTemplate,
  },
  apollo: {
    hic_et_nunc_trade: {
      query: QUERY,
      variables() {
        return {
          address: this.address,
        };
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      skip() {
        return this.address.length !== 36;
      },
    },
  },
};
</script>

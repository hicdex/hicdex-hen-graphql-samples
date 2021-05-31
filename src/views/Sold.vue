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
    <SoldItem :trades="filteredTrades" :address="address" />
    <div v-show="addressInput && filterStatus === 'query'">
      <pre><code>{{ graphqlTemplate(query, {address}) }}</code></pre>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import SoldItem from '../components/SoldItem.vue';
import { getAddress, graphqlTemplate } from '../utils';

export const QUERY = gql`
  query Sales($address: String!) {
    hic_et_nunc_trade(where: {_or: [{seller: {address: {_eq: $address}}}, {token: {creator: {address: {_eq: $address}}}}]}, order_by: {timestamp: desc}) {
      timestamp
      token {
        id
        artifact_uri
        mime
        title
        creator {
          address
        }
      }
      buyer {
        address
      }
      amount
      swap {
        price
      }
    }
  }
`;
export default {
  components: {
    SoldItem,
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
      filterStatus: 'all',
      hic_et_nunc_trade: [],
      error: null,
      filters: [
        { label: 'All', value: 'all' },
        { label: 'Primary Sales', value: 'primary' },
        { label: 'Secondary Sales', value: 'secondary' },
        { label: 'Query', value: 'query' },
      ],
      query: QUERY,
    };
  },
  watch: {
    addressInput(newVal) {
       getAddress(newVal).then((address) => {
         if (address.length === 36 && this.address !== address) {
          this.$router.push({ name: 'sold', query: { address } });
         }
         this.address = address;
       });
    },
  },
  computed: {
    filteredTrades() {
      if (this.filterStatus === 'query') {
        return [];
      }
      if (this.filterStatus === 'primary') {
        return this.hic_et_nunc_trade.filter((trade) => trade.token.creator.address === this.address);
      }
      if (this.filterStatus === 'secondary') {
        return this.hic_et_nunc_trade.filter((trade) => trade.token.creator.address !== this.address);
      }
      return this.hic_et_nunc_trade;
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

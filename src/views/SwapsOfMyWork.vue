<template>
  <div>
    <b-loading :is-full-page="true" v-model="$apollo.queries.hic_et_nunc_swap.loading" :can-cancel="false"></b-loading>

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
    <SwapItem :swaps="filteredSwaps" :address="address" />
    <div v-show="addressInput && filterStatus === 'query'">
      <pre><code>{{ graphqlTemplate(query, {address}) }}</code></pre>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import SwapItem from '../components/SwapItem.vue';
import { getAddress, graphqlTemplate } from '../utils';

export const QUERY = gql`
  query meOnSecondaryMarket($address: String!) {
    hic_et_nunc_swap(
      where: {
        token: {
          creator: {address: {_eq: $address}},
          swaps: {creator: {address: {_neq: $address}}}
        },
        status: {_in: [0, 1]}
      },
      order_by: {token_id: desc}
    ) {
      price
      status
      token {
        title
        mime
        description
        id
        artifact_uri
      }
    }
  }
`;
export default {
  components: {
    SwapItem,
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
      hic_et_nunc_swap: [],
      error: null,
      filters: [
        { label: 'All', value: 'all' },
        { label: 'For Sale', value: 'active' },
        { label: 'Sold', value: 'finished' },
        { label: 'Query', value: 'query' },
      ],
      query: QUERY,
    };
  },
  watch: {
    addressInput(newVal) {
       getAddress(newVal).then((address) => {
         if (address.length === 36 && this.address !== address) {
          this.$router.push({ name: 'my-art-on-secondary-market', query: { address } });
         }
         this.address = address;
       });
    },
  },
  computed: {
    filteredSwaps() {
      if (this.filterStatus === 'query') {
        return [];
      }
      if (this.filterStatus === 'active') {
        return this.hic_et_nunc_swap.filter((swap) => swap.status === 0);
      }
      if (this.filterStatus === 'finished') {
        return this.hic_et_nunc_swap.filter((swap) => swap.status === 1);
      }
      if (this.filterStatus === 'canceled') {
        return this.hic_et_nunc_swap.filter((swap) => swap.status === 2);
      }
      return this.hic_et_nunc_swap;
    },
  },
  methods: {
    graphqlTemplate,
  },
  apollo: {
    hic_et_nunc_swap: {
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

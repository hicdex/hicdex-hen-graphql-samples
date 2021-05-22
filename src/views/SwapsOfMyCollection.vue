<template>
  <div>
    <zi-spacer y="1" />
    <div class="overlay" v-if="$apollo.queries.hic_et_nunc_swap.loading">
      <div class="overlay-content">
        <zi-spinner size="big" />
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <zi-input placeholder="tz…" v-model="address" size="medium" autofocus style="width: 400px" />
    <zi-spacer y="2" />
    <zi-tabs @label-selected="filterResults">
      <zi-tabs-item v-for="(item, index) in filters" :label="item.label" :value="item.value" :key="item.value + index">
      </zi-tabs-item>
    </zi-tabs>
    <SwapItem :swaps="filteredSwaps" :address="address" />
    <div v-show="address">
      <zi-spacer y="2" />
      <h4>Using this query</h4>
      <pre><code>{{ graphqlTemplate(query, address) }}</code></pre>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import SwapItem from '../components/SwapItem.vue';
import { graphqlTemplate1 } from '../utils';

export const ME_ON_SECONDARY_MARKET = gql`
  query mySecondaryMarketSales($address: String!) {
    hic_et_nunc_swap(
      where: {
        token: {creator: {address: {_neq: $address}}},
        status: {_in: [0, 1, 2]},
        creator: {address: {_eq: $address}}
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
      }
    }
  }
`;
export default {
  components: {
    SwapItem,
  },
  data() {
    return {
      address: '',
      filterStatus: 'all',
      hic_et_nunc_swap: [],
      error: null,
      filters: [
        { label: 'All', value: 'all' },
        { label: 'For Sale', value: 'active' },
        { label: 'Sold', value: 'finished' },
        { label: 'Canceled', value: 'canceled' },
      ],
      query: ME_ON_SECONDARY_MARKET,
    };
  },
  computed: {
    filteredSwaps() {
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
    graphqlTemplate: graphqlTemplate1,
    filterResults(type) {
      if (type.value === 'active') {
        this.filterStatus = 'active';
      } else if (type.value === 'finished') {
        this.filterStatus = 'finished';
      } else if (type.value === 'canceled') {
        this.filterStatus = 'canceled';
      } else {
        this.filterStatus = 'all';
      }
    },
  },
  apollo: {
    hic_et_nunc_swap: {
      query: ME_ON_SECONDARY_MARKET,
      variables() {
        return {
          address: this.address,
        };
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      skip() {
        return !this.address;
      },
    },
  },
};
</script>

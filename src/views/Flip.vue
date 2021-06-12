<template>
  <div>
    <b-loading :is-full-page="true" v-model="$apollo.queries.hic_et_nunc_token_holder.loading" :can-cancel="false"></b-loading>
    <b-loading :is-full-page="true" v-model="loading" :can-cancel="false"></b-loading>

    <div v-if="error">{{ error }}</div>
    <b-field>
      <b-input placeholder="tz… or alice.tez" v-model="addressInput" autofocus></b-input>
    </b-field>
    <FlipItem :items="items" :address="address" />
    <div v-show="addressInput && filterStatus === 'query'">
      <pre><code>{{ graphqlTemplate(query, {address}) }}</code></pre>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import FlipItem from '../components/FlipItem.vue';
import { getAddress, graphqlTemplate } from '../utils';

export const QUERY = gql`
  query FlipOpportunities($address: String!) {
    hic_et_nunc_token_holder(where: {holder_id: {_eq: $address}, quantity: {_gt: "0"}, token: {supply: {_gt: "0"}}}, order_by: {id: desc}) {
      token {
        id
        title
        mime
        artifact_uri
        display_uri
        supply
        creator_id
      }
    }
  }
`;

const TRADE_QUERY = gql`
  query Trades($seller_id: String!, $token_id: bigint!) {
    hic_et_nunc_trade(where: {seller_id: {_neq: $seller_id}, token_id: {_eq: $token_id}}, order_by: {id: desc}, limit: 1) {
      swap {
        price
      }
      timestamp
    }
  }
`;

const BUYS_QUERY = gql`
  query MyBuys($token_ids: [bigint!] = "", $buyer_id: String = "") {
    hic_et_nunc_trade(where: {token_id: {_in: $token_ids}, buyer_id: {_eq: $buyer_id}}) {
      swap {
        price
      }
      token_id
    }
  }
`;

export default {
  components: {
    FlipItem,
  },
  mounted() {
    if (this.$route.query.address) {
      this.address = this.$route.query.address;
      this.addressInput = this.address;
    }
  },
  data() {
    return {
      loading: false,
      addressInput: '',
      address: '',
      filterStatus: 'all',
      hic_et_nunc_token_holder: [],
      items: [],
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
          this.$router.push({ name: 'flip', query: { address } });
         }
         this.address = address;
       });
    },
    async hic_et_nunc_token_holder(data) {
      this.loading = true;
      const trades = await Promise.all(data.map(({ token: { id, creator_id: creatorId } }) => this.trades(id, creatorId)));
      // console.log({ objktIds: data.map(({ token: { id } }) => id) });
      const buys = await this.buys(data.map(({ token: { id } }) => id));
      // console.log(buys);
      for (let i = 0; i < data.length; i += 1) {
        data[i].buy = buys.find(({ token_id: tokenId }) => tokenId === data[i].token.id) || { swap: { price: 0 } };
        data[i].trade = trades[i];
      }
      const items = data.filter(({ trade }) => trade?.swap?.price).map((item) => {
        const boughtFor = item.buy.swap.price;
        const soldFor = item.trade.swap.price;
        if (boughtFor) {
          if (boughtFor <= soldFor) {
            item.diff = (soldFor / boughtFor) * 100;
            if (item.diff > 50) {
              item.diff = Math.round(item.diff);
            } else {
              item.diff = Math.round(item.diff, 2);
            }
          } else {
            item.diff = (1 - (soldFor / boughtFor)) * 100;
            if (item.diff > 50) {
              item.diff = Math.round(item.diff);
            } else {
              item.diff = Math.round(item.diff, 2);
            }
            item.diff = -item.diff;
          }
        } else {
          item.diff = '+ ∞';
        }
        return item;
      });

      items.sort((a, b) => {
        if (a.diff === '+ ∞') {
          return 1;
        }
        if (b.diff === '+ ∞') {
          return -1;
        }
        return b.diff - a.diff;
      });
      this.items = items;
      this.loading = false;
    },
  },
  methods: {
    graphqlTemplate,
    async trades(objktId, creatorAddr) {
      try {
        const { data } = await this.$apollo.query({
          query: TRADE_QUERY,
          variables: {
            seller_id: creatorAddr,
            token_id: objktId,
          },
        });
        if (data.hic_et_nunc_trade.length) {
          return data.hic_et_nunc_trade[0];
        }
      } catch (_err) {
        //
      }
      return false;
    },
    async buys(objktIds) {
      try {
        const { data } = await this.$apollo.query({
          query: BUYS_QUERY,
          variables: {
            buyer_id: this.address,
            token_ids: objktIds,
          },
        });
        return data.hic_et_nunc_trade;
      } catch (_err) {
        //
      }
      return [];
    },
  },
  apollo: {
    hic_et_nunc_token_holder: {
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

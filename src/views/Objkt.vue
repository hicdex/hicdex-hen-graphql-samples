<template>
  <div>
    <b-loading :is-full-page="true" v-model="$apollo.queries.hic_et_nunc_token_by_pk.loading" :can-cancel="false"></b-loading>

    <div v-if="error">{{ error }}</div>
    <b-field>
      <b-input placeholder="1234" v-model="objkt" autofocus></b-input>
    </b-field>

    <b-tabs v-model="filterStatus">
      <template v-for="filter in filters">
        <b-tab-item
          v-if="objkt || filter.label !== 'Query'"
          :key="filter.value"
          :value="filter.value"
          :label="filter.label">
        </b-tab-item>
      </template>
    </b-tabs>

    <div v-if="!objkt">Enter an OBJKT id above</div>
    <Objkt v-show="objkt && filterStatus !== 'query'"
      :objkt="hen"
      :ask="ask"
      :english="english"
      :dutch="dutch" />

    <div v-show="objkt && filterStatus === 'query'">
      <pre><code>{{ graphqlTemplate(query, {id: objkt}) }}</code></pre>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Objkt from '../components/Objkt.vue';
import { graphqlTemplate } from '../utils';

export const QUERY_HEN = gql`
  query Objkt($id: bigint!) {
    hic_et_nunc_token_by_pk(id: $id) {
      artifact_uri
      creator {
        address
        name
      }
      description
      display_uri
      id
      level
      mime
      royalties
      supply
      thumbnail_uri
      metadata
      timestamp
      title
      token_tags(order_by: {id: asc}) {
        tag {
          tag
        }
      }
      swaps(order_by: {id: asc}) {
        price
        timestamp
        status
        amount
        amount_left
        creator {
          address
          name
        }
      }
      trades(order_by: {timestamp: asc}) {
        amount
        buyer {
          address
          name
        }
        seller {
          address
          name
        }
        swap {
          price
        }
        timestamp
      }
      token_holders(where: {quantity: {_gt: "0"}}, order_by: {id: asc}) {
        quantity
        holder {
          address
          name
        }
      }
      hdao_balance
      extra
    }
  }
`;
export const QUERY_ENG = gql`
  query Objkt($id: bigint!) {
    english: hic_et_nunc_english_auction(where: {objkt_id: {_eq: $id}}, order_by: {id: asc}) {
      id
      price_increment
      reserve
      royalties
      status
      timestamp
      start_time
      end_time
      creator {
        address
        name
      }
      artist {
        address
        name
      }
      bids(order_by: {id: asc}) {
        id
        amount
        timestamp
        bidder {
          address
          name
        }
      }
    }
  }
`;

export const QUERY_DUT = gql`
  query Objkt($id: bigint!) {
    dutch: hic_et_nunc_dutch_auction(where: {objkt_id: {_eq: $id}}, order_by: {id: asc}) {
      id
      royalties
      status
      timestamp
      start_time
      end_time
      start_price
      buy_price
      creator {
        address
        name
      }
      artist {
        address
        name
      }
      buyer {
        address
        name
      }
    }
  }
`;

export const QUERY_ASK = gql`
  query Objkt($id: bigint!) {
    ask: hic_et_nunc_ask(where: {objkt_id: {_eq: $id}}, order_by: {id: asc}) {
      amount
      amount_left
      price
      royalties
      status
      timestamp
      artist {
        address
        name
      }
      creator {
        address
        name
      }
      fulfilled(order_by: {id: asc}) {
        amount
        timestamp
        buyer {
          address
          name
        }
      }
    }
  }
`;

export default {
  components: {
    Objkt,
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
      hic_et_nunc_token_by_pk: {},
      dutch: [],
      error: null,
      filters: [
        { label: 'Objkt', value: 'all' },
        { label: 'Query', value: 'query' },
      ],
      query: QUERY_HEN,
    };
  },
  watch: {
    objkt(newVal) {
      if (newVal !== this.$route.query.objkt) {
        this.$router.push({ name: 'objkt', query: { objkt: newVal } });
      }
    },
  },
  computed: {
    hen() {
      if (this.filterStatus === 'query') {
        return [];
      }
      return this.hic_et_nunc_token_by_pk;
    },
  },
  methods: {
    graphqlTemplate,
    filterResults(type) {
      if (type.value === 'query') {
        this.filterStatus = 'query';
      } else {
        this.filterStatus = 'all';
      }
    },
  },
  apollo: {
    hic_et_nunc_token_by_pk: {
      query: QUERY_HEN,
      variables() {
        return {
          id: this.objkt,
        };
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      skip() {
        return !this.objkt;
      },
    },
    english: {
      query: QUERY_ENG,
      variables() {
        return {
          id: this.objkt,
        };
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      skip() {
        return !this.objkt;
      },
    },
    dutch: {
      query: QUERY_DUT,
      variables() {
        return {
          id: this.objkt,
        };
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      skip() {
        return !this.objkt;
      },
    },
    ask: {
      query: QUERY_ASK,
      variables() {
        return {
          id: this.objkt,
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

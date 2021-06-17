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
          :key="filter.value"
          :value="filter.value"
          :label="filter.label">
        </b-tab-item>
      </template>
    </b-tabs>
    <Objkt :objkt="result" />
    <div v-show="objkt && filterStatus === 'query'">
      <pre><code>{{ graphqlTemplate(query, {id: objkt}) }}</code></pre>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Objkt from '../components/Objkt.vue';
import { graphqlTemplate } from '../utils';

export const QUERY = gql`
  query Objkt($id: bigint!) {
    hic_et_nunc_token_by_pk(id: $id) {
      artifact_uri
      creator_id
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
        creator_id
      }
      trades(order_by: {timestamp: asc}) {
        amount
        buyer_id
        seller_id
        swap {
          price
        }
        timestamp
      }
      token_holders(where: {quantity: {_gt: "0"}}, order_by: {id: asc}) {
        quantity
        holder_id
      }
      hdao_balance
      extra
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
      hic_et_nunc_token_by_pk: [],
      error: null,
      filters: [
        { label: 'Objkt', value: 'all' },
        { label: 'Query', value: 'query' },
      ],
      query: QUERY,
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
    result() {
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
      query: QUERY,
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

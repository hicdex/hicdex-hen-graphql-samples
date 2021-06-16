<template>
  <div>
    <b-loading :is-full-page="true" v-model="$apollo.queries.hic_et_nunc_token.loading" :can-cancel="false"></b-loading>

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
    <Gallery v-if="filterStatus !== 'query'" :objkts="hic_et_nunc_token.map(x => ({token: x}))" :address="address" />
    <div v-else>
      <pre><code>{{ graphqlTemplate(query, {address}) }}</code></pre>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Gallery from '../components/Gallery.vue';
import { getAddress, graphqlTemplate } from '../utils';

export const QUERY = gql`
  query creatorGallery($address: String!) {
    hic_et_nunc_token(where: {creator: {address: {_eq: $address}}, supply: {_gt: 0}}, order_by: {id: desc}) {
      id
      artifact_uri
      display_uri
      thumbnail_uri
      timestamp
      mime
      title
      description
      supply
      token_tags {
        tag {
          tag
        }
      }
      swaps(where: {status: {_eq: "0"}}, order_by: {price: asc}) {
        amount
        amount_left
        creator_id
        price
      }
    }
  }
`;

export default {
  components: {
    Gallery,
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
      hic_et_nunc_token: [],
      error: null,
      filterStatus: '',
      filters: [
        { label: 'All', value: 'all' },
        { label: 'Query', value: 'query' },
      ],
      query: QUERY,
    };
  },
  watch: {
    addressInput(newVal) {
       getAddress(newVal).then((address) => {
         if (address.length === 36 && this.address !== address) {
          this.$router.push({ name: 'creator-gallery', query: { address } });
         }
         this.address = address;
       });
    },
  },
  methods: {
    graphqlTemplate,
  },
  apollo: {
    hic_et_nunc_token: {
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

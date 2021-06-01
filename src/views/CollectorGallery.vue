<template>
  <div>
    <b-loading :is-full-page="true" v-model="$apollo.queries.hic_et_nunc_token_holder.loading" :can-cancel="false"></b-loading>

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
    <Gallery v-if="filterStatus !== 'query'" :objkts="hic_et_nunc_token_holder" :address="address" />
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
  query collectorGallery($address: String!) {
    hic_et_nunc_token_holder(where: {holder_id: {_eq: $address}}, order_by: {token_id: desc}) {
      token {
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
        creator {
          address
        }
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
      hic_et_nunc_token_holder: [],
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
          this.$router.push({ name: 'collector-gallery', query: { address } });
         }
         this.address = address;
       });
    },
  },
  methods: {
    graphqlTemplate,
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

<template>
  <div>
    <zi-spacer y="1" />
    <div class="overlay" v-if="$apollo.queries.hic_et_nunc_token.loading">
      <div class="overlay-content">
        <zi-spinner size="big" />
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <zi-input placeholder="tz… or alice.tez" v-model="addressInput" size="medium" autofocus style="width: 400px" />
    <zi-spacer y="2" />
    <Gallery :objkts="hic_et_nunc_token" :address="address" />
    <div v-show="addressInput">
      <zi-spacer y="2" />
      <h4>Using this query</h4>
      <pre><code>{{ graphqlTemplate(query, address) }}</code></pre>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Gallery from '../components/Gallery.vue';
import { getAddress, graphqlTemplate1 } from '../utils';

export const QUERY = gql`
  query creatorGallery($address: String!) {
    hic_et_nunc_token(where: {creator: {address: {_eq: $address}}}) {
      id
      artifact_uri
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
    }
  }
`;

export default {
  components: {
    Gallery,
  },
  data() {
    return {
      addressInput: '',
      address: '',
      filterStatus: 'all',
      hic_et_nunc_token: [],
      error: null,
      query: QUERY,
    };
  },
  watch: {
    addressInput(newVal) {
       getAddress(newVal).then((address) => {
         this.address = address;
       });
    },
  },
  methods: {
    graphqlTemplate: graphqlTemplate1,
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

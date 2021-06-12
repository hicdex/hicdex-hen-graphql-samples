<template>
  <div>
    <div v-if="!address">
      Enter a wallet address above
    </div>
    <p v-else-if="!swaps.length"></p>

    <b-table
      v-else
      :data="swaps">
      <b-table-column field="price" label="price" sortable numeric v-slot="props">
        {{ (props.row.price / 1000000).toFixed(2) }}
      </b-table-column>
      <b-table-column field="status" label="status" sortable v-slot="props">
        {{ statusText(props.row.status) }}
      </b-table-column>
      <b-table-column label="ID" field="token.id" numeric sortable v-slot="props">
          {{ props.row.token.id }}
      </b-table-column>
      <b-table-column label="OBJKT" field="token" sortable v-slot="props">
        <a :href="link(props.row.token.id)">
          {{ link(props.row.token.id) }}
        </a>
      </b-table-column>
      <b-table-column label="title" field="title" v-slot="props">
        <b-tooltip multilined type="is-dark" v-if="(props.row.token.mime.startsWith('image/') && !props.row.token.mime.includes('svg')) || props.row.token.display_uri">
          {{ props.row.token.title }}
          <template v-slot:content>
            <b-image
              :src="img(props.row.token.display_uri || props.row.token.artifact_uri)"
              :alt="props.row.token.title"
            ></b-image>
          </template>
        </b-tooltip>
        <span v-else>
          {{ props.row.token.title }}
        </span>
      </b-table-column>
      <b-table-column field="token.mime" label="mime" sortable v-slot="props">
          {{ props.row.token.mime }}
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
  export default {
    props: ['swaps', 'address'],
    mounted() {},
    methods: {
      link(id) {
        return `https://www.hicetnunc.xyz/objkt/${id}`;
      },
      statusText(statusId) {
        const statuses = {
          0: 'For Sale',
          1: 'Sold',
          2: 'Canceled',
        };
        return statuses[statusId];
      },
      img(ipfsUrl) {
        const matched = ipfsUrl.match(/ipfs:\/\/(.*)/);
        if (matched) {
          return `https://cloudflare-ipfs.com/ipfs/${matched[1]}`;
        }
        return '';
      },
    },
  };

</script>

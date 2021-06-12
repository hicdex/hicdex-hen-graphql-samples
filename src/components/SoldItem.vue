<template>
  <div>
    <div v-if="!address">
      Enter a wallet address above
    </div>
    <p v-else-if="!trades.length"></p>

    <b-table
      v-else
      :data="trades">
      <b-table-column field="timestamp" label="date" sortable v-slot="props">
        {{ new Date(props.row.timestamp).toLocaleDateString() }} {{ new Date(props.row.timestamp).toLocaleTimeString() }}
      </b-table-column>
      <b-table-column field="swap.price" label="price" sortable numeric v-slot="props">
        {{ ((props.row.amount * props.row.swap.price) / 1000000).toFixed(2) }}
      </b-table-column>
      <b-table-column label="OBJKT" field="token.id" sortable v-slot="props">
        <a :href="link(props.row.token.id)">
          {{ props.row.token.id }}
        </a>
      </b-table-column>
      <b-table-column label="title" field="token.title" sortable v-slot="props">
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
      <b-table-column label="Buyer" field="buyer.address" sortable v-slot="props">
        <a :href="addrLink(props.row.buyer.address)">
          {{ props.row.buyer.address }}
        </a>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
  export default {
    props: ['trades', 'address'],
    mounted() {},
    methods: {
      link(id) {
        return `https://www.hicetnunc.xyz/objkt/${id}`;
      },
      addrLink(id) {
        return `https://www.hicetnunc.xyz/tz/${id}`;
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

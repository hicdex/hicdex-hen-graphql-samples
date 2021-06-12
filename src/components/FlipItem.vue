<template>
  <div>
    <div v-if="!address">
      Enter a wallet address above
    </div>
    <p v-else-if="!items.length"></p>

    <b-table
      v-else
      :data="items">
      <b-table-column field="buy.swap.price" label="price you paid" sortable numeric v-slot="props">
        {{ (props.row.buy.swap.price / 1000000).toFixed(2) }}
      </b-table-column>
      <b-table-column field="highest_trade.swap.price" label="highest 2nd market price" sortable numeric v-slot="props">
        {{ (props.row.highest_trade.swap.price / 1000000).toFixed(2) }}
      </b-table-column>
      <b-table-column field="latest_trade.swap.price" label="most recent 2nd market price" sortable numeric v-slot="props">
        {{ (props.row.latest_trade.swap.price / 1000000).toFixed(2) }}
      </b-table-column>
      <b-table-column field="diff" label="change" numeric v-slot="props">
        {{ props.row.diff }}%
      </b-table-column>
      <b-table-column field="current_swaps.count" label="currently for sale" numeric v-slot="props">
        {{ props.row.current_swaps.count }} editions
        <br>
        <span v-show="props.row.current_swaps.count">
          (avg price: {{ (props.row.current_swaps.price_avg / 1000000).toFixed(2) }}
        </span>
      </b-table-column>
      <b-table-column label="OBJKT" field="token" sortable v-slot="props">
        <b-tooltip multilined type="is-dark" v-if="(props.row.token.mime.startsWith('image/') && !props.row.token.mime.includes('svg')) || props.row.token.display_uri">
          <a :href="link(props.row.token.id)"> {{ props.row.token.id }} </a>
          <template v-slot:content>
            <b-image
              :src="img(props.row.token.display_uri || props.row.token.artifact_uri)"
              :alt="props.row.token.title"
            ></b-image>
          </template>
        </b-tooltip>
        <span v-else>
          <a :href="link(props.row.token.id)"> {{ props.row.token.id }} </a>
        </span>
      </b-table-column>
      <b-table-column label="title" field="title" v-slot="props">
        {{ props.row.token.title }}
      </b-table-column>
      <b-table-column field="token.mime" label="mime" sortable v-slot="props">
          {{ props.row.token.mime }}
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
  export default {
    props: ['items', 'address'],
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

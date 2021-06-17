<template>
  <div>
    <div v-if="!objkt">
      Enter an OBJKT id above
    </div>
    <p v-else-if="!properties.length"></p>

    <div v-else>
      <h3 class="subtitle is-4 mt-6">Main Properties</h3>

      <b-table
        :data="properties">
        <b-table-column field="key" label="" sortable numeric v-slot="props">
          {{ props.row.key }}
        </b-table-column>
        <b-table-column field="val" label="" sortable v-slot="props">
          <span v-if="Array.isArray(props.row.val)">
            {{ props.row.val.map(x => x.tag.tag).join(', ') }}
          </span>
          <pre v-else-if="typeof props.row.val === 'object'"><code>{{ JSON.stringify(props.row.val, null, 2) }}</code></pre>
          <span v-else>
            {{ props.row.val }}
          </span>
        </b-table-column>
      </b-table>

      <!--<b-image
        :src="img(objkt.display_uri || objkt.artifact_uri)"
        :alt="objkt.title"
        responsive
        v-if="objkt.mime.startsWith('image/') && !objkt.mime.includes('svg')"
      ></b-image>-->

      <h3 class="subtitle is-4 mt-6">Swaps</h3>
      <b-table
        :data="objkt.swaps">
        <b-table-column field="timestamp" label="" sortable v-slot="props">
          {{ new Date(props.row.timestamp).toLocaleDateString() }} {{ new Date(props.row.timestamp).toLocaleTimeString() }}
        </b-table-column>
        <b-table-column field="creator" label="creator" sortable v-slot="props">
          <span v-show="props.row.creator_id === objkt.creator_id">
            <a :href="link(props.row.creator_id)">{{ props.row.creator_id }}</a>
          </span>
          <em v-show="props.row.creator_id !== objkt.creator_id">
            <a :href="link(props.row.creator_id)">{{ props.row.creator_id }}</a>
          </em>
        </b-table-column>
        <b-table-column field="status" label="status" sortable v-slot="props">
          {{ status[props.row.status] }}
        </b-table-column>
        <b-table-column field="amount" label="amount" numeric sortable v-slot="props">
          {{ props.row.amount }}
        </b-table-column>
        <b-table-column field="sold" label="sold" numeric sortable v-slot="props">
          {{ props.row.amount - props.row.amount_left }}
        </b-table-column>
        <b-table-column field="amount_left" label="left" numeric sortable v-slot="props">
          {{ props.row.amount_left }}
        </b-table-column>
        <b-table-column field="price" label="price" numeric sortable v-slot="props">
          {{ props.row.price / 1e6 }}
        </b-table-column>
      </b-table>

      <h3 class="subtitle is-4 mt-6">Trades</h3>
      <b-table
        :data="objkt.trades">
        <b-table-column field="timestamp" label="" sortable v-slot="props">
          {{ new Date(props.row.timestamp).toLocaleDateString() }} {{ new Date(props.row.timestamp).toLocaleTimeString() }}
        </b-table-column>
        <b-table-column field="seller_id" label="seller" sortable v-slot="props">
          <span v-show="props.row.seller_id === objkt.creator_id">
            <a :href="link(props.row.seller_id)">{{ props.row.seller_id }}</a>
          </span>
          <em v-show="props.row.seller_id !== objkt.creator_id">
            <a :href="link(props.row.seller_id)">{{ props.row.seller_id }}</a>
          </em>
        </b-table-column>
        <b-table-column field="buyer_id" label="buyer" sortable v-slot="props">
          <a :href="link(props.row.buyer_id)">{{ props.row.buyer_id }}</a>
        </b-table-column>
        <b-table-column field="amount" label="amount" numeric sortable v-slot="props">
          {{ props.row.amount }}
        </b-table-column>
        <b-table-column field="swap.price" label="price" numeric sortable v-slot="props">
          {{ props.row.swap.price / 1e6 }}
        </b-table-column>
      </b-table>

      <h3 class="subtitle is-4 mt-6">Holders</h3>
      <b-table
        :data="objkt.token_holders">
        <b-table-column field="holder_id" label="holder" sortable v-slot="props">
          <a :href="link(props.row.holder_id)">{{ props.row.holder_id }}</a>
        </b-table-column>
        <b-table-column field="quantity" label="quantity" numeric sortable v-slot="props">
          {{ props.row.quantity }}
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['objkt'],
    mounted() {},
    data() {
      return {
        status: {
          0: 'active',
          1: 'finished',
          2: 'canceled',
        },
      };
    },
    methods: {
      link(addr) {
        return `https://www.hicetnunc.xyz/tz/${addr}`;
      },
      img(ipfsUrl) {
        const matched = ipfsUrl.match(/ipfs:\/\/(.*)/);
        if (matched) {
          return `https://cloudflare-ipfs.com/ipfs/${matched[1]}`;
        }
        return '';
      },
    },
    computed: {
      properties() {
        return Object.entries(this.objkt)
          .filter(([key, val]) => typeof val !== 'object' || key === 'extra' || key === 'token_tags')
          .filter(([key, _val]) => !key.startsWith('__'))
          .map(([key, val]) => ({ key, val }));
      },
    },
  };

</script>

<template>
  <div>
    <div v-if="!objkt">
      Enter an OBJKT id above
    </div>
    <p v-else-if="!trades.length"></p>

    <b-table
      v-else
      :data="trades">
      <b-table-column field="swap.price" label="price" sortable numeric v-slot="props">
        {{ (props.row.swap.price / 1000000).toFixed(2) }}
      </b-table-column>
      <b-table-column field="timestamp" label="timestamp" sortable v-slot="props">
        {{ props.row.timestamp }}
      </b-table-column>
      <b-table-column field="seller.address" label="seller" sortable v-slot="props">
        <a
          :href="link(props.row.seller.address)"
          :class="{'secondary-sale': props.row.seller.address !== props.row.token.creator.address, 'primary-sale': props.row.seller.address === props.row.token.creator.address}">
          {{ link(props.row.seller.address) }}
        </a>
      </b-table-column>
      <b-table-column field="buyer.address" label="buyer" sortable v-slot="props">
        <a :href="link(props.row.buyer.address)">
          {{ link(props.row.buyer.address) }}
        </a>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
  export default {
    props: ['trades', 'objkt'],
    mounted() {},
    methods: {
      link(addr) {
        return `https://hicetnunc.art/tz/${addr}`;
      },
    },
  };

</script>

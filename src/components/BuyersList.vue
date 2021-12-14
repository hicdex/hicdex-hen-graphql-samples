<template>
  <div>
    <div v-if="!address">
      Enter a wallet address above
    </div>
    <p v-else-if="!trades.length"></p>

    <b-table
      v-else
      :data="trades">
      <b-table-column field="buyer.purchases_aggregate.aggregate.count" label="pieces bought" sortable numeric v-slot="props">
        {{ props.row.buyer.purchases_aggregate.aggregate.count }}
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
    props: ['trades', 'address'],
    mounted() {},
    methods: {
      link(addr) {
        return `https://hicetnunc.art/tz/${addr}`;
      },
    },
  };

</script>

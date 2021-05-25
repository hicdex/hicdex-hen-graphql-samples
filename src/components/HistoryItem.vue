<template>
  <div>
    <zi-note v-if="!objkt">
      Enter an OBJKT id above
    </zi-note>
    <p v-else-if="!trades.length">
      --
    </p>
    <zi-table
      v-else
      :data="trades"
      hover>
      <zi-table-column prop="price" label="price" width="150" @click="sortBy('price')">
        <template slot-scope="scope">
          <p style="text-align: right;">
            {{ (scope.row.swap.price / 1000000).toFixed(2) }}
          </p>
        </template>
      </zi-table-column>
      <zi-table-column prop="timestamp" label="time" @click="sortBy('timestamp')">
      </zi-table-column>
      <zi-table-column label="seller">
        <template slot-scope="scope">
          <a :href="link(scope.row.seller.address)" :class="{'secondary-sale': scope.row.seller.address !== scope.row.token.creator.address, 'primary-sale': scope.row.seller.address === scope.row.token.creator.address}">
            {{ link(scope.row.seller.address) }}
          </a>
        </template>
      </zi-table-column>
      <zi-table-column label="buyer">
        <template slot-scope="scope">
          <a :href="link(scope.row.buyer.address)">
            {{ link(scope.row.buyer.address) }}
          </a>
        </template>
      </zi-table-column>
    </zi-table>
  </div>
</template>

<script>
  export default {
    props: ['trades', 'objkt'],
    watch: {
      trades(newVal) {
        this.displayTrades = [...newVal];
      },
    },
    data() {
      return {
        displayTrades: [],
        sort: '-price',
      };
    },
    methods: {
      link(addr) {
        return `https://www.hicetnunc.xyz/tz/${addr}`;
      },
      sortBy(crit) {
        switch (crit) {
          case 'timestamp':
            console.log('paf');
            if (this.sort !== '-date') {
              this.displayTrades.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
              this.sort = 'date';
            } else {
              this.displayTrades.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
              this.sort = '-date';
            }
            break;
          default:
          case 'price':
            if (this.sort !== '-price') {
              this.displayTrades.sort((a, b) => a.swap.price - b.swap.price);
              this.sort = 'price';
            } else {
              this.displayTrades.sort((a, b) => b.swap.price - a.swap.price);
              this.sort = '-price';
            }
            break;
        }
      },
    },
    // watch: {
    //   trades() {
    //     console.log(this.trades);
    //   },
    // },
  };

</script>

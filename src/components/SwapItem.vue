<template>
  <div>
    <zi-note v-if="!address">
      Enter a wallet address above
    </zi-note>
    <p v-else-if="!swaps.length">
      --
    </p>
    <zi-table
      v-else
      :data="swaps"
      hover>
      <zi-table-column prop="price" label="price" width="150">
        <template slot-scope="scope">
          <p style="text-align: right;">
            {{ (scope.row.price / 1000000).toFixed(2) }}
          </p>
        </template>
      </zi-table-column>
      <zi-table-column prop="status" label="status" width="150">
        <template slot-scope="scope">
          {{ statusText(scope.row.status) }}
        </template>
      </zi-table-column>
      <zi-table-column label="OBJKT">
        <template slot-scope="scope">
          <a :href="link(scope.row.token.id)">
            {{ link(scope.row.token.id) }}
          </a>
        </template>
      </zi-table-column>
      <zi-table-column label="title">

        <template slot-scope="scope">
          <zi-tooltip>
            {{ scope.row.token.title }}
            <template v-slot:content>
              <zi-avatar
                v-if="scope.row.token.mime.startsWith('image/')"
                :src="img(scope.row.token.artifact_uri)"
                size="huge"
                shape="square" />
            </template>
          </zi-tooltip>
        </template>
      </zi-table-column>
      <zi-table-column prop="token.mime" label="mime">
        <template slot-scope="scope">
          {{ scope.row.token.mime }}
        </template>
      </zi-table-column>
    </zi-table>
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
    // watch: {
    //   swaps() {
    //     console.log(this.swaps);
    //   },
    // },
  };

</script>

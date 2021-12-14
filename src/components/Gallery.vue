<template>
  <div>
    <zi-note v-if="!address">
      Enter a wallet address above
    </zi-note>
    <p v-else-if="!objkts.length"></p>
    <div
      v-else
      :data="objkts"
      hover>
      <div v-for="(objkts, index) in group" :key="index" class="tile is-ancestor">
        <div class="tile is-parent is-4" v-for="objkt in objkts" :key="objkt.id">
          <article class="tile is-child card">
            <footer class="card-footer has-text-centered">
              <p class="card-footer-item">
                {{ primarySaleStatus(objkt.swaps) }}
                primary
                <br>
                {{ primaryPrice(objkt.swaps) }}
              </p>
              <p class="card-footer-item">
                {{ secondarySaleStatus(objkt.swaps) }}
                secondary
                <br>
                {{ secondaryPrice(objkt.swaps) }}
              </p>
              <p class="card-footer-item">
                {{ objkt.supply }}
                edition{{ objkt.supply === 1 ? '' : 's' }}
                <br>
              </p>
            </footer>
            <header class="card-header">
              <p class="card-header-title">
                {{ objkt.title }}
              </p>
            </header>
            <div class="card-image">
              <a :href="link(objkt.id)">
                <figure class="image" v-if="objkt.mime.startsWith('image/') || objkt.display_uri">
                  <img lazy :src="img(objkt)" :alt="objkt.title">
                </figure>
                <figure class="image" v-else>
                  <code>no thumbnail</code>
                </figure>
              </a>
            </div>
            <div class="card-content">
              <div class="content">
                <blockquote style="overflow: auto; white-space: break-spaces; text-overflow: ellipsis;">{{ objkt.description }}</blockquote>

                <code>{{ objkt.mime }}</code>
                <code>
                  <time :datetime="objkt.timestamp">{{ new Date(objkt.timestamp).toLocaleDateString() }} {{ new Date(objkt.timestamp).toLocaleTimeString() }}</time>
                </code>

                <b-field class="tags">
                  <b-tag rounded v-for="{tag} in objkt.token_tags" :key="tag.tag">
                    {{ tag.tag }}
                  </b-tag>
                </b-field>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-card p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
<script>
  export default {
    props: ['objkts', 'address'],
    mounted() {},
    computed: {
      group() {
        const groups = [];
        for (let i = 0; i < this.objkts.length; i += 3) {
          groups.push(this.objkts.slice(i, i + 3).map(({ token }) => token));
        }
        return groups;
      },
    },
    methods: {
      link(id) {
        return `https://hicetnunc.art/objkt/${id}`;
      },
      img(objkt) {
        let ipfsUrl = objkt.display_uri || objkt.artifact_uri;
        if (objkt.mime === 'image/png') {
          ipfsUrl = objkt.artifact_uri;
        }

        const matched = ipfsUrl.match(/ipfs:\/\/(.*)/);
        if (matched) {
          return `https://cloudflare-ipfs.com/ipfs/${matched[1]}`;
        }
        return '';
      },
      primarySaleStatus(swaps) {
        const primary = swaps.filter(({ creator_id: creator }) => creator === this.address);
        const primaryCount = primary.reduce((sum, { amount_left: left }) => sum + left, 0);
        if (!primaryCount) {
          return '0';
        }
        return primaryCount;
      },
      primaryPrice(swaps) {
        const primary = swaps.filter(({ creator_id: creator }) => creator === this.address);
        if (!primary.length) {
          return '';
        }
        return `${(primary[0].price / 1e6).toFixed(2)} xtz`;
      },
      secondarySaleStatus(swaps) {
        const secondary = swaps.filter(({ creator_id: creator }) => creator !== this.address);
        const secondaryCount = secondary.reduce((sum, { amount_left: left }) => sum + left, 0);
        if (!secondaryCount) {
          return '0';
        }
        return secondaryCount;
      },
      secondaryPrice(swaps) {
        const secondary = swaps.filter(({ creator_id: creator }) => creator !== this.address);
        if (!secondary.length) {
          return '';
        }
        return `${(secondary[0].price / 1e6).toFixed(2)} xtz`;
      },
    },
  };

</script>

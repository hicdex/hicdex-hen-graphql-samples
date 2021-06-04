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
          <article class="tile is-child  card">
            <header class="card-header">
              <p class="card-header-title">
                {{ objkt.title }}
              </p>
            </header>
            <div class="card-image">
              <figure class="image" v-if="objkt.mime.startsWith('image/')">
                <img lazy :src="img(objkt.artifact_uri)" :alt="objkt.title">
              </figure>
              <figure class="image" v-else-if="objkt.display_uri">
                <img lazy :src="img(objkt.display_uri)" :alt="objkt.title">
              </figure>
              <figure class="image" v-else>
                <code>no thumbnail</code>
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <ul>
                  <li>
                    <p>
                      link <a :href="link(objkt.id)">{{ link(objkt.id) }}</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      description {{ objkt.description }}
                    </p>
                  </li>
                  <li>
                    <p>
                      mime {{ objkt.mime }}
                    </p>
                  </li>
                  <li>
                    <p>
                      editions {{ objkt.supply }}
                    </p>
                  </li>
                </ul>

                <time :datetime="objkt.timestamp">{{ objkt.timestamp }}</time>

                <b-field>
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
        return `https://www.hicetnunc.xyz/objkt/${id}`;
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

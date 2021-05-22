<template>
  <div>
    <zi-note v-if="!address">
      Enter a wallet address above
    </zi-note>
    <p v-else-if="!objkts.length">
      --
    </p>
    <div
      v-else
      :data="objkts"
      hover>
      <zi-grid container :spacing="3" justify="center">
        <zi-grid v-for="objkt in objkts" :key="objkt.id" :xs="6">
          <zi-card class="gallery-card" shadow>
            <zi-image
              v-if="objkt.mime.startsWith('image/')"
              width="75%"
              :src="img(objkt.artifact_uri)" size="huge" />
            <ul>
              <li>
                <p>
                  link <a :href="link(objkt.id)">{{ link(objkt.id) }}</a>
                </p>
              </li>
              <li>
                <p>
                  title {{ objkt.title }}
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
                  file {{ objkt.artifact_uri }}
                </p>
              </li>
              <li>
                <p>
                  thumbnail {{ objkt.thumbnail_uri }}
                </p>
              </li>
              <li>
                <p>
                  editions {{ objkt.supply }}
                </p>
              </li>
            </ul>

            <zi-tag v-for="{tag} in objkt.token_tags" :key="tag.tag" type="danger">
              {{ tag.tag }}
            </zi-tag>
          </zi-card>
        </zi-grid>
      </zi-grid>
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

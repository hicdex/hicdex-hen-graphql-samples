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
          <zi-card shadow>
            <ul>
              <li>
                link <a :href="link(objkt.id)">{{ link(objkt.id) }}</a>
              </li>
              <li>
                title {{ objkt.title }}
              </li>
              <li>
                description {{ objkt.description }}
              </li>
              <li>
                mime {{ objkt.mime }}
              </li>
              <li>
                file {{ objkt.artifact_uri }}
              </li>
              <li>
                thumbnail {{ objkt.thumbnail_uri }}
              </li>
              <li>
                editions {{ objkt.supply }}
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

<script>
  export default {
    props: ['objkts', 'address'],
    mounted() {},
    methods: {
      link(id) {
        return `https://www.hicetnunc.xyz/objkt/${id}`;
      },
    },
  };

</script>

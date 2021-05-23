<template>
  <div id="app">
    <a
      aria-label="View source on GitHub"
      href="https://github.com/vhf/hicdex-hen-graphql-samples"
      class="github-corner">
      <svg viewBox="0 0 250 250" style="fill:#151513; color:#fff; border: 0;" aria-hidden="true">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
        <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
      </svg>
    </a>

    <zi-grid container :spacing="3" justify="center">
      <zi-grid :xs="20" :lg="10" v-if="this.$route.name === 'home'">
        <zi-spacer y="2" />

        <zi-card shadow>
          <h1>hicdex</h1>
          <h3>
            a blockchain indexer and GraphQL API for hic et nunc
          </h3>
          <p>
            hicdex is a Tezos indexers focused on indexing <a href="https://hicetnunc.xyz" target="_blank">hicetnunc.xyz</a>'s
            smart contracts activity. The indexed data is made available by exposing a public <a href="https://www.graphql.com/tutorials/" target="_blank">GraphQL</a> endpoint.
          </p>
        </zi-card>

        <zi-spacer y="1" />

        <zi-card shadow>
          <h4>Getting Started</h4>
          <p>
            Write queries on the <a href="https://api.hicdex.com/graphiql" style="font-weight: 700">GraphiQL explorer</a>
            <br>or use the endpoint <code style="font-weight: 700">https://api.hicdex.com/v1/graphql</code>
          </p>
          <h5>Sample Projects</h5>
          <p>
            Below are some sample tools built to showcase hicdex and to help you build your own tools based on H=N's data.
            Each tool also prints usable JavaScript code that shows how to achieve the same result as the tool.
          </p>
        </zi-card>

        <zi-spacer y="1" />

        <zi-row gutter="15">
          <zi-col>
            <router-link to="/my-art-on-secondary-market">
              <zi-card shadow>
                <h4>Your OBJKTS on the secondary market</h4>
                <p>
                  Which artworks of yours are either on sale on the secondary market
                  or have been sold on the secondary market.
                </p>
              </zi-card>
            </router-link>
          </zi-col>
          <zi-col>
            <router-link to="/my-secondary-market-sales">
              <zi-card shadow>
                <h4>Your sales on the secondary market</h4>
                <p>
                  What you have bought and are either trying to sell on the secondary market
                  or have sold on the secondary market.
                </p>
              </zi-card>
            </router-link>
          </zi-col>
        </zi-row>

        <zi-spacer y="1" />

        <zi-row gutter="15">
          <zi-col>
            <router-link to="/creator-gallery">
              <zi-card shadow>
                <h4>Showcase your creations</h4>
                <p>
                  All your artworks in a single call. Some artists might want to display their creations on their website.
                </p>
              </zi-card>
            </router-link>
          </zi-col>
          <zi-col>
            <router-link to="/collector-gallery">
              <zi-card shadow>
                <h4>Showcase your collection</h4>
                <p>
                  Why not show your collection on your website, build a nice gallery is if you were an actually gallery (hint: you are)
                </p>
              </zi-card>
            </router-link>
          </zi-col>
        </zi-row>
      </zi-grid>

      <zi-grid :xs="20" v-else >
        <router-view />
      </zi-grid>
    </zi-grid>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
};
</script>

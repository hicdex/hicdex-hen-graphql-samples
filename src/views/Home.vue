<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <div class="content">
            <h1 class="title is-2">
              hicdex
            </h1>

            <h2 class="subtitle is-4">a blockchain indexer and GraphQL API for hicetnunc</h2>

            <div class="content">
              <p>
                <a href="https://github.com/hicdex/hicdex" target="_blank">hicdex</a> is a Tezos indexers focused on indexing <a href="https://hicetnunc.xyz" target="_blank">hicetnunc.xyz</a>'s
                smart contracts activity. The indexed data is made available by exposing a public <a href="https://www.graphql.com/tutorials/" target="_blank">GraphQL</a> endpoint.
              </p>

              <h2 class="subtitle">getting started</h2>

              <p>
                Write queries on the <a href="https://api.hicdex.com/graphiql" style="font-weight: 700">GraphiQL explorer</a>
                or use the endpoint <code style="font-weight: 700">https://api.hicdex.com/v1/graphql</code>
              </p>

              <h2 class="subtitle">sample projects</h2>
              <p>
                Below are some sample tools built to showcase hicdex and to help you build your own tools based on H=N's data.
                Each tool also prints usable JavaScript code that shows how to achieve the same result as the tool.
              </p>
            </div>
          </div>
        </article>
      </div>

      <div class="tile is-vertical is-6">
        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/objkt">
                <p class="title">OBJKT by ID</p>
                <div class="content">
                  <p>
                    Audit a single objkt.
                  </p>
                </div>
            </router-link>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/price-history">
                <p class="title">OBJKT price history</p>
                <div class="content">
                  <p>
                    Explore the price history of an OBJKT.
                  </p>
                </div>
            </router-link>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/charts">
                <p class="title">HEN Statistics</p>
                <div class="content">
                  <p>
                    Some charts showing what's happening on HEN over time.
                  </p>
                </div>
            </router-link>
          </article>
        </div>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-vertical is-6">

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/sold">
                <p class="title">your latest sales</p>
                <div class="content">
                  <p>
                    What you sold and when, primary and secondary.
                  </p>
                </div>
            </router-link>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/my-secondary-market-sales">
                <p class="title">your sales on the secondary market</p>
                <div class="content">
                  <p>
                    What you have bought and are either trying to sell on the secondary market
                    or have sold on the secondary market.
                  </p>
                </div>
            </router-link>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/creator-gallery">
                <p class="title">your creations</p>
                <div class="content">
                  <p>
                    All your artworks in a single call. Some artists might want to display their creations on their website.
                  </p>
                </div>
            </router-link>
          </article>
        </div>

      </div>
      <div class="tile is-vertical is-6">

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/my-art-on-secondary-market">
                <p class="title">your OBJKTS on the secondary market</p>
                <div class="content">
                  <p>
                    Which artworks of yours are either on sale on the secondary market
                    or have been sold on the secondary market.
                  </p>
                </div>
            </router-link>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/creator-collectors">
                <p class="title">who collected your work</p>
                <div class="content">
                  <p>
                    A list of your biggest fans: everyone who bought one of your piece on the primary market and how many they bought total.
                  </p>
                </div>
            </router-link>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/collector-gallery">
                <p class="title">your collection</p>
                <div class="content">
                  <p>
                    Why not show your collection on your website, build a nice exhibition as if you were an actuall gallery (hint: you are.)
                  </p>
                </div>
            </router-link>
          </article>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {};
</script>

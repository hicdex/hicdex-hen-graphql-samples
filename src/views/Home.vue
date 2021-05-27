<template>
  <div>

    <section class="hero is-info">
      <div class="hero-body">
        <h1 class="title is-2">
          hicdex
        </h1>

        <h2 class="subtitle">a blockchain indexer and GraphQL API for hic et nunc</h2>

        <div class="content">
          <p>
            hicdex is a Tezos indexers focused on indexing <a href="https://hicetnunc.xyz" target="_blank">hicetnunc.xyz</a>'s
            smart contracts activity. The indexed data is made available by exposing a public <a href="https://www.graphql.com/tutorials/" target="_blank">GraphQL</a> endpoint.
          </p>

          <h2 class="subtitle">Getting Started</h2>

          <p>
            Write queries on the <a href="https://api.hicdex.com/graphiql" style="font-weight: 700">GraphiQL explorer</a>
            or use the endpoint <code style="font-weight: 700">https://api.hicdex.com/v1/graphql</code>
          </p>

          <h2 class="subtitle">Sample Projects</h2>
          <p>
            Below are some sample tools built to showcase hicdex and to help you build your own tools based on H=N's data.
            Each tool also prints usable JavaScript code that shows how to achieve the same result as the tool.
          </p>
        </div>
      </div>
    </section>

    <div class="columns home-cards">
      <div class="column is-half">
        <router-link to="/my-art-on-secondary-market">
          <article class="box home-card">
            <p class="title is-4">Your OBJKTS on the secondary market</p>
            <p>
              Which artworks of yours are either on sale on the secondary market
              or have been sold on the secondary market.
            </p>
          </article>
        </router-link>
      </div>

      <div class="column is-half">
        <router-link to="/my-secondary-market-sales">
          <article class="box home-card">
            <p class="title is-4">Your sales on the secondary market</p>
            <p>
              What you have bought and are either trying to sell on the secondary market
              or have sold on the secondary market.
            </p>
          </article>
        </router-link>
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <router-link to="/price-history">
          <article class="box home-card">
            <p class="title is-4">OBJKT price history</p>
            <p>
              Explore the price history of an OBJKT.
            </p>
          </article>
        </router-link>
      </div>

      <div class="column is-half">
        <router-link to="/creator-gallery">
          <article class="box home-card">
            <p class="title is-4">Your creations</p>
            <p>
              All your artworks in a single call. Some artists might want to display their creations on their website.
            </p>
          </article>
        </router-link>
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <router-link to="/collector-gallery">
          <article class="box home-card">
            <p class="title is-4">Your collection</p>
            <p>
              Why not show your collection on your website, build a nice exhibition as if you were an actuall gallery (hint: you are.)
            </p>
          </article>
        </router-link>
      </div>

      <div class="column is-half">
        <router-link to="/creator-collectors">
          <article class="box home-card">
            <p class="title is-4">Who collected your work</p>
            <p>
              A list of your biggest fans: everyone who bought one of your piece on the primary market and how many they bought total.
            </p>
          </article>
        </router-link>
      </div>
    </div>

  </div>
</template>

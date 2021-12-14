<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        hicdex (<a href="https://github.com/hicdex"><strong>source</strong></a>)
        by <a href="https://hicetnunc.art/tz/tz1LKpeN8ZSSFNyTWiBNaE4u4sjaq7J1Vz2z">marchingsquare</a>
        (<a href="https://twitter.com/marchingsquare">@marchingsquare</a>).
        <br>
        Explorer: <a href="https://api.hicdex.com/graphiql">api.hicdex.com/graphiql</a>
        <br>
        <router-link :to="{ name: 'docs' }">Docs</router-link> / Endpoint: <a href="https://api.hicdex.com/v1/graphql">api.hicdex.com/v1/graphql</a>
      </p>
    </div>
  </footer>
</template>

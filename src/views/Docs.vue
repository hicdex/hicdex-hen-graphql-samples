<template>
  <div>
    <h1 class="title is-spaced">Schema</h1>

    <p class="content">
      The main entities of the schema are listed below.
      <br>
      Rely on introspection / <a href="https://api.hicdex.com/graphiql">graphiql</a> to discover what fields and relations are available.
    </p>

    <h2 class="subtitle"><code>hic_et_nunc_token</code></h2>
    <p class="content">
      The OBJKTs table.
    </p>

    <h2 class="subtitle"><code>hic_et_nunc_holder</code></h2>
    <p class="content">
      Wallets / HEN users.
    </p>

    <h2 class="subtitle"><code>hic_et_nunc_swap</code></h2>
    <p class="content">
      Swaps are OBJKTs put up for sale.
      A swap has an amount and a price.
      Putting 10 editions objkt #123 for sale at 1 xtz means a swap with
      <code>amount=10</code>, <code>price=1000000</code>.
      <br>
      <code>status</code> can have one of three values describing the lifecycle of a swap:
      <ul>
        <li>
          <code>0</code>, active swap, something can be bought from this swap,
        </li>
        <li>
          <code>1</code>, finished swap, everything from this swap has been sold,
        </li>
        <li>
          <code>2</code>, canceled swap, the swap has been canceled, parts of it might have been sold but not all of it, otherwise it would be <code>1</code> (finished).
        </li>
      </ul>
    </p>

    <h2 class="subtitle"><code>hic_et_nunc_tag</code></h2>
    <p class="content">
      OBJKT tags
    </p>

    <h2 class="subtitle"><code>hic_et_nunc_token_holder</code></h2>
    <p class="content">
      Which wallet (see <code>hic_et_nunc_holder</code>) own what
    </p>

    <h2 class="subtitle"><code>hic_et_nunc_token_tag</code></h2>
    <p class="content">
      OBJKT &lt;-> tag relationship
    </p>

    <h2 class="subtitle"><code>hic_et_nunc_trade</code></h2>
    <p class="content">
      A trade represents an OBJKT being sold.
      <br>
      It has a relationship to the <code>buyer</code>, the <code>seller</code>, the <code>token</code> being sold/bought, the <code>swap</code> being acted upon.
    </p>

  </div>
</template>

<script>
export default {
  components: {},
};
</script>

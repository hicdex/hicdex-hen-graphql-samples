<template>
  <div>
    <div class="block">
      <cumulative />
    </div>

    <div class="block">
      <trade-avg />
    </div>

    <div class="content has-text-centered">
      <p>
        Big thanks to <strong><a href="https://twitter.com/__orderandchaos" target="_blank">__orderandchaos</a></strong>
        (<a href="https://www.hicetnunc.xyz/tz/tz1VgpmwW66LCbskjudK54Zp96vKn2cHjpGN" target="_blank">HEN</a>)
        for helping with these charts!
      </p>
    </div>
  </div>
</template>

<script>
import Cumulative from '../components/charts/Cumulative.vue';
import TradeAvg from '../components/charts/TradeAvg.vue';

export default {
  components: {
    Cumulative,
    TradeAvg,
  },
};
</script>

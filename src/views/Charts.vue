<template>
  <div>
    <div class="block">
      <cumulative />
    </div>

    <div class="block">
      <active-users />
      <p class="content mt-4">
        <em>A wallet is considered active if it either minted, swapped, or bought an objkt on that day.</em>
      </p>
    </div>

    <div class="block">
      <trade-avg />
    </div>

    <div class="block">
      <earnings-container />
    </div>

    <div class="content has-text-centered">
      <p>
        Big thanks to <strong><a href="https://twitter.com/__orderandchaos" target="_blank">__orderandchaos</a></strong>
        (<a href="https://hicetnunc.art/tz/tz1VgpmwW66LCbskjudK54Zp96vKn2cHjpGN" target="_blank">HEN</a>)
        for helping with these charts!
      </p>
    </div>
  </div>
</template>

<script>
import Cumulative from '../components/charts/Cumulative.vue';
import ActiveUsers from '../components/charts/ActiveUsers.vue';
import TradeAvg from '../components/charts/TradeAvg.vue';
import EarningsContainer from '../components/charts/EarningsContainer.vue';

export default {
  components: {
    ActiveUsers,
    Cumulative,
    TradeAvg,
    EarningsContainer,
  },
};
</script>

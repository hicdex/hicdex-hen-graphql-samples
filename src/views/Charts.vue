<template>
  <div>
    <cumulative />
    <trade-avg />
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

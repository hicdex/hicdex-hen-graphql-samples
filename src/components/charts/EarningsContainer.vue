<template>
  <div v-if="dates.length">
    <artist-vs-secondary :x="dates" :y="[artistEarningsDS, secondarySalesVolumesDS]" />
    <earnings-per-objkt :x="dates" :y="[artistEarningsPerTradeDS]" />
    <secondary :x="dates" :y="[secondarySalesVolumesDS, artistRoyaltiesEarningDS, tradesDS]" />
  </div>
</template>

<script>
import ArtistVsSecondary from './ArtistVsSecondary.vue';
import EarningsPerObjkt from './EarningsPerObjkt.vue';
import Secondary from './Secondary.vue';

export default {
  components: { EarningsPerObjkt, Secondary, ArtistVsSecondary },
  async mounted() {
    const json = [
      'cache/earnings.json',
    ].map((file) => fetch(`https://api.hicdex.com/${file}`).then((res) => res.json()));
    const data = await Promise.all(json);

    this.dates = data[0].map(({ date }) => date);
    this.artistEarningsDS = data[0].map(({ artist_earnings: artistEarnings }) => artistEarnings);
    this.artistRoyaltiesEarningDS = data[0].map(({ artist_royalties_earning: artistRoyaltiesEarning }) => artistRoyaltiesEarning);
    this.secondarySalesVolumesDS = data[0].map(({ secondary_sales_volumes: secondarySalesVolumes }) => secondarySalesVolumes);
    this.artistEarningsPerTradeDS = data[0].map(({ artist_earnings_per_trade: artistEarningsPerTrade }) => artistEarningsPerTrade);
    this.tradesDS = data[0].map(({ trades }) => trades);
  },
  data() {
    return {
      dates: [],
      artistEarningsDS: [],
      artistRoyaltiesEarningDS: [],
      secondarySalesVolumesDS: [],
      artistEarningsPerTradeDS: [],
      tradesDS: [],
    };
  },
};
</script>

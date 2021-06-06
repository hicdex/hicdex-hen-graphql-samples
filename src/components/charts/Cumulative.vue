<template>
    <line-chart :chart-data="series" />
</template>

<script>
import LineChart from './LineChart';
// https://www.chartjs.org/docs/2.9.4/

export default {
  components: {
    LineChart,
  },
  async mounted() {
    const labels = [
      'Objkts',
      'Sales',
    ];
    const json = [
      'cache/objkt_cumul.json',
      'cache/trade_cumul.json',
    ].map((file) => fetch(`https://api.hicdex.com/${file}`).then((res) => res.json()));
    const data = await Promise.all(json);
    const dates = data[0].map(({ date }) => date);

    const datasets = [];
    data.forEach((obj, i) => {
      datasets.push({
        label: labels[i],
        data: obj.map(({ count }) => count),
      });
      datasets.push({
        label: `${labels[i]} (sum)`,
        data: obj.map(({ sum }) => sum),
      });
    });

    this.series = {
      labels: dates,
      datasets,
    };
  },
  data() {
    return {
      series: {},
    };
  },
};

</script>

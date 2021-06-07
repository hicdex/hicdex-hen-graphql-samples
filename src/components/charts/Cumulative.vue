<template>
  <line-chart :chart-data="series" :options="options" :styles="chartStyles"/>
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
        borderColor: i === 0 ? '#ff00ff' : '#ff0000',
        fill: false,
        yAxisID: 'left-y-axis',
      });
      datasets.push({
        label: `${labels[i]} (sum)`,
        data: obj.map(({ sum }) => sum),
        borderColor: i === 0 ? '#0000ff' : '#00ff00',
        fill: true,
        yAxisID: 'right-y-axis',
      });
    });

    this.options = {
      title: {
        display: true,
        text: 'Sales',
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            id: 'left-y-axis',
            type: 'linear',
            position: 'left',
          }, {
            id: 'right-y-axis',
            type: 'linear',
            position: 'right',
          }],
      },
    };

    this.series = {
      labels: dates,
      datasets,
    };
  },
  data() {
    return {
      options: {},
      series: {},
      height: 300,
    };
  },
  computed: {
    chartStyles() {
      return {
        height: `${this.height}px`,
        position: 'relative',
      };
    },
  },
};
</script>

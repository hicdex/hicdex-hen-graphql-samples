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
      'Active Wallets',
      'Minted objkts',
    ];
    const colors = [
      { line: '#0078b0' },
      { bar: '#ffcc33' },
    ];
    const json = [
      'cache/active.json',
      'cache/objkt_cumul.json',
    ].map((file) => fetch(`https://api.hicdex.com/${file}`).then((res) => res.json()));
    const data = await Promise.all(json);
    const dates = data[0].map(({ date }) => date);

    const datasets = [];
    data.forEach((obj, i) => {
      if (i === 0) {
        datasets.push({
          type: 'line',
          label: labels[i],
          data: obj.map(({ count }) => count),
          backgroundColor: colors[i].line,
          fill: false,
          yAxisID: 'left-y-axis',
        });
      } else {
        datasets.push({
          type: 'bar',
          label: labels[i],
          data: obj.map(({ count }) => count),
          backgroundColor: colors[i].bar,
          fill: false,
          yAxisID: 'left-y-axis',
        });
      }
    });

    this.options = {
      title: {
        display: true,
        text: 'Daily unique active addresses',
        fontSize: 30,
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          offset: true,
          stacked: true,
        }],
        yAxes: [
          {
            id: 'left-y-axis',
            position: 'left',
            type: 'linear',
            // scaleLabel: {
            //   display: true,
            //   labelString: '#active wallets',
            // },
          }],
      },
      elements: {
        point: {
          radius: 2,
          hitRadius: 4,
        },
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
      height: 440,
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

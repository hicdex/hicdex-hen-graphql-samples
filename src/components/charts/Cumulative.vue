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
      if (i === 0) {
        datasets.push({
          type: 'line',
          label: `${labels[i]} (sum)`,
          data: obj.map(({ sum }) => sum),
          borderColor: '#270acf',
          fill: false,
          yAxisID: 'left-y-axis',
        });
      } else {
        datasets.push({
          type: 'line',
          label: `${labels[i]} (sum)`,
          data: obj.map(({ sum }) => sum),
          borderColor: '#0587ee',
          fill: false,
          yAxisID: 'left-y-axis',
        });
      }
    });
    data.forEach((obj, i) => {
      if (i === 0) {
        datasets.push({
          type: 'bar',
          label: labels[i],
          data: obj.map(({ count }) => count),
          backgroundColor: '#484848',
          fill: true,
          yAxisID: 'right-y-axis',
        });
      } else {
        datasets.push({
          type: 'bar',
          label: labels[i],
          data: obj.map(({ count }) => count),
          backgroundColor: '#a5a5a5',
          fill: true,
          yAxisID: 'right-y-axis',
        });
      }
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
            position: 'left',
            type: 'linear',
          }, {
            id: 'right-y-axis',
            position: 'right',
            type: 'linear',
            display: false,
            gridLines: {
              display: false,
            },
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

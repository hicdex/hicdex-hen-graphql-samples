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
    const colors = [
      { line: '#003f5c', bar: '#0078b0' },
      { line: '#b37400', bar: '#ffa600' },
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
        type: 'line',
        label: `${labels[i]} (sum)`,
        data: obj.map(({ sum }) => sum),
        borderColor: colors[i].line,
        fill: false,
        yAxisID: 'left-y-axis',
      });
    });
    data.forEach((obj, i) => {
      datasets.push({
        type: 'bar',
        label: labels[i],
        data: obj.map(({ count }) => count),
        backgroundColor: colors[i].bar,
        fill: true,
        yAxisID: 'right-y-axis',
      });
    });

    this.options = {
      title: {
        display: true,
        text: 'Sales & Objkts over time',
        fontSize: 30,
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          offset: true,
        }],
        yAxes: [
          {
            id: 'left-y-axis',
            position: 'left',
            type: 'linear',
            scaleLabel: {
              display: true,
              labelString: 'sum (lines)',
            },
          }, {
            id: 'right-y-axis',
            position: 'right',
            type: 'linear',
            scaleLabel: {
              display: true,
              labelString: 'daily (bars)',
            },
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

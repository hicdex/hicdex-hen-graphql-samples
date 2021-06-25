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
      '≤ 0.01 xtz',
      '> 0.01, < 10 xtz',
      '≥ 10 xtz',
    ];
    const colors = [
      { line: '#cc9900', bar: '#ffcc33' },
      { line: '#ff2676', bar: '#ff8ab5' },
      { line: '#0062ff', bar: '#66a1ff' },
    ];
    const json = [
      'cache/avg_a.json',
      'cache/avg_b.json',
      'cache/avg_c.json',
    ].map((file) => fetch(`https://api.hicdex.com/${file}`).then((res) => res.json()));
    const data = await Promise.all(json);
    const dates = [...Array(24)].map((_, i) => `${i} GMT`);

    const datasets = [];
    data.forEach((obj, i) => {
      datasets.push({
        type: 'line',
        label: `price ${labels[i]}`,
        data: obj.map(({ price }) => price),
        borderColor: colors[i].line,
        fill: false,
        yAxisID: 'left-y-axis',
      });
    });
    data.forEach((obj, i) => {
      datasets.push({
        type: 'bar',
        label: `sales priced ${labels[i]}`,
        data: obj.map(({ trades }) => trades),
        backgroundColor: colors[i].bar,
        fill: true,
        yAxisID: 'right-y-axis',
      });
    });

    this.options = {
      title: {
        display: true,
        text: 'Sales by price range by hour of the day (GMT)',
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
            ticks: { suggestedMin: 0 },
            scaleLabel: {
              display: true,
              labelString: 'average price',
            },
          }, {
            id: 'right-y-axis',
            position: 'right',
            type: 'linear',
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: '#sales',
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

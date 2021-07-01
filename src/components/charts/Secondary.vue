<template>
  <line-chart :chart-data="series" :options="options" :styles="chartStyles"/>
</template>

<script>
import LineChart from './LineChart';
// https://www.chartjs.org/docs/2.9.4/

export default {
  props: ['x', 'y'],
  components: {
    LineChart,
  },
  data() {
    const datasets = [
      {
        type: 'line',
        label: 'secondary sales',
        data: this.y[0],
        borderColor: '#0078b0',
        fill: false,
        yAxisID: 'secondary-volume-axis',
      },
      {
        type: 'line',
        label: 'royalties',
        data: this.y[1],
        borderColor: '#b37400',
        fill: false,
        yAxisID: 'royalties-axis',
      },
      {
        type: 'bar',
        label: 'sales',
        data: this.y[2],
        backgroundColor: '#ffa600',
        fill: false,
        yAxisID: 'trades-axis',
      },
    ];

    const options = {
      title: {
        display: true,
        text: 'Secondary Market',
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
            id: 'secondary-volume-axis',
            position: 'left',
            type: 'linear',
            ticks: { suggestedMin: 0 },
            scaleLabel: {
              display: true,
              labelString: 'xtz (secondary volume)',
            },
          }, {
            id: 'royalties-axis',
            position: 'right',
            type: 'linear',
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: 'xtz (royalties)',
            },
            gridLines: {
              display: false,
            },
          }, {
            id: 'trades-axis',
            position: 'right',
            type: 'linear',
            display: false,
            ticks: { suggestedMin: 0 },
            scaleLabel: {
              display: true,
              labelString: '#trades',
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

    return {
      options,
      series: {
        labels: this.x,
        datasets,
      },
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

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
        label: 'artist earnings',
        data: this.y[0],
        borderColor: '#0078b0',
        fill: false,
        yAxisID: 'secondary-volume-axis',
      },
      {
        type: 'line',
        label: 'secondary sales earnings',
        data: this.y[1],
        borderColor: '#b37400',
        fill: false,
        yAxisID: 'secondary-volume-axis',
      },
    ];

    const options = {
      title: {
        display: true,
        text: 'Artist (primary+royalties) vs Secondary volumes',
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
              labelString: 'xtz',
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

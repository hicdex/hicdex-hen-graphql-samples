<template>
  <div>
    <span>{{ swaps }} items </span>
    <zi-tabs @label-selected="filterResults">
      <zi-tabs-item v-for="(item, index) in filters" :label="item.label" :value="item.value" :key="item.value + index">
        <zi-note>
          {{ `${item.label} content` }}
        </zi-note>
      </zi-tabs-item>
    </zi-tabs>
  </div>
</template>

<script>
  export default {
    props: ['type', 'swaps', 'filterResults', 'filterType'],
    data() {
      return {
        filters: [
          { label: 'All', value: 'all' },
          { label: 'For Sale', value: 'active' },
          { label: 'Sold', value: 'finished' },
          { label: 'Canceled', value: 'canceled' },
          { label: 'Query', value: 'query' },
        ],
      };
    },
  };
</script>

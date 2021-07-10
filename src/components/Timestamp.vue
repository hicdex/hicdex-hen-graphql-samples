<template>
  <span class="is-family-monospace">
    <template v-if="Array.isArray(timestamp)">
      <span v-for="(ts, i) in timestamp" :key="ts">
        {{ (new Date(ts).toLocaleDateString()).replace(/(20\d{2})/, formatYear)}} {{ new Date(ts).toLocaleTimeString() }}
        <template v-if="i < timestamp.length">
          <br>
        </template>
      </span>
    </template>
    <template v-else>
      {{ (new Date(timestamp).toLocaleDateString()).replace(/(20\d{2})/, formatYear)}} {{ new Date(timestamp).toLocaleTimeString() }}
    </template>
  </span>
</template>

<script>
export default {
  props: ['timestamp'],
  methods: {
    formatYear(y) {
      return parseInt(y, 10) - 2000;
    },
  },
};
</script>

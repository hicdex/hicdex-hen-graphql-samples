<template>
  <span class="is-family-monospace">
    {{ new Date(timestamp).toLocaleDateString() }} {{ new Date(timestamp).toLocaleTimeString() }}
  </span>
</template>

<script>
export default {
  props: ['timestamp'],
};
</script>

<template>
  <a v-if="obj" :href="link(obj.address)" target="_blank">
    <template v-if="obj.name">
      <span>{{ obj.name }}</span>
      (<span>{{ obj.address }}</span>)
    </template>
    <template v-else>
      <span>{{ obj.address }}</span>
    </template>
  </a>
</template>

<script>
export default {
  props: ['obj'],
  methods: {
    link(addr) {
      return `https://www.hicetnunc.xyz/tz/${addr}`;
    },
  },
};
</script>

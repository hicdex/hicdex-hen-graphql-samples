<template>
  <a v-if="obj" :href="link(obj.address)" target="_blank">
    <template v-if="isEscrow(obj)">
      Contract: <span class="is-italic">{{ escrow[obj.address] }}</span>
      <span class="has-text-weight-light ml-1">{{ obj.address }}</span>
    </template>
    <template v-else-if="name(obj)">
      <span>{{ name(obj) }}</span>
      <span class="has-text-weight-light ml-1">{{ obj.address }}</span>
    </template>
    <template v-else>
      <span class="has-text-weight-light">{{ obj.address }}</span>
    </template>
  </a>
</template>

<script>
const escrow = {
  KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9: 'HEN swap v1',
  KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn: 'HEN swap v2',
  KT1Wvk8fon9SgNEPQKewoSL2ziGGuCQebqZc: 'objkt.com english',
  KT1XjcRq5MLAzMKQ3UHsrue2SeU2NbxUrzmU: 'objkt.com english v2',
  KT1ET45vnyEFMLS9wX1dYHEs9aCN3twDEiQw: 'objkt.com dutch',
  KT1W8PqJsZcpcAgDQH9SKQSZKvjVbpjUk8Sc: 'objkt.com dutch v2',
  KT1QJ71jypKGgyTNtXjkCAYJZNhCKWiHuT2r: 'objkt.com dutch v3',
  KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq: 'objkt.com marketplace',
};

export default {
  props: ['obj'],
  data() {
    return {
      escrow,
    };
  },
  methods: {
    link(addr) {
      return `https://www.hicetnunc.xyz/tz/${addr}`;
    },
    name(obj) {
      if (obj.name) {
        return obj.name;
      }
      return '';
    },
    isEscrow(obj) {
      return obj.address in escrow;
    },
  },
};
</script>

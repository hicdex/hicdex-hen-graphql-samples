<template>
  <div class="tile is-parent">
    <article class="tile is-child notification">
      <router-link :to="{ name: routeName }">
        <p class="title">{{ title }}</p>
        <div class="content">
          <slot />
        </div>
      </router-link>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    routeName: String,
    title: String,
  },
};
</script>

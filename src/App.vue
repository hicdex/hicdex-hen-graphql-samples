<template>
  <div id="app">
    <zi-grid container :spacing="3" justify="center">
      <zi-grid :xs="10" v-if="this.$route.name === 'home'">
        <zi-spacer y="3" />
        <zi-row gutter="15">
          <zi-col>
            <router-link to="/my-art-on-secondary-market">
              <zi-card shadow>
                <h4>Your OBJKTS on the secondary market</h4>
                <p>
                  Which artworks of yours are either on sale on the secondary market
                  or have been sold on the secondary market.
                </p>
              </zi-card>
            </router-link>
          </zi-col>
          <zi-col>
            <router-link to="/my-secondary-market-sales">
              <zi-card shadow>
                <h4>Your sales on the secondary market</h4>
                <p>
                  What you have bought and are either trying to sell on the secondary market
                  or have sold on the secondary market.
                </p>
              </zi-card>
            </router-link>
          </zi-col>
        </zi-row>
      </zi-grid>
      <zi-grid :xs="20" v-else >
        <router-view />
      </zi-grid>
    </zi-grid>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  mounted() {
    console.log(this.$route);
  },
};
</script>

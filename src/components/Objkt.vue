<template>
  <div>
    <div v-if="!objkt">
      Enter an OBJKT id above
    </div>

    <div v-else>
      <h3 class="subtitle is-4 mt-6">Main Properties</h3>

      <div class="b-table">

        <div class="table-wrapper has-mobile-cards">
          <table class="table">
            <tbody>

              <tr>
                <td class="has-text-right">timestamp</td>
                <td>
                  {{ objkt.timestamp }}
                </td>
              </tr>

              <tr>
                <td class="has-text-right">creator</td>
                <td>
                  <subjkt :obj="objkt.creator" />
                </td>
              </tr>

              <tr>
                <td class="has-text-right">title</td>
                <td><span>{{ objkt.title }}</span></td>
              </tr>

              <tr>
                <td class="has-text-right">description</td>
                <td><span>{{ objkt.description }}</span></td>
              </tr>

              <tr>
                <td class="has-text-right">token_tags</td>
                <td>
                  <span class="tags">
                    <span class="tag is-link is-light" v-for="token_tag in objkt.token_tags" :key="token_tag.tag.tag">
                      {{ token_tag.tag.tag }}
                    </span>
                  </span>
                </td>
              </tr>

              <tr>
                <td class="has-text-right">metadata</td>
                <td><span>{{ objkt.metadata }}</span></td>
              </tr>

              <tr>
                <td class="has-text-right">supply</td>
                <td><span>{{ objkt.supply }}</span></td>
              </tr>

              <tr>
                <td class="has-text-right">royalties</td>
                <td><span>{{ objkt.royalties }}</span></td>
              </tr>

              <tr>
                <td class="has-text-right">mime</td>
                <td><span>{{ objkt.mime }}</span></td>
              </tr>

              <tr>
                <td class="has-text-right">artifact_uri</td>
                <td><span>{{ objkt.artifact_uri }}</span></td>
              </tr>

              <tr>
                <td class="has-text-right">thumbnail_uri</td>
                <td><span>{{ objkt.thumbnail_uri }}</span></td>
              </tr>

              <tr>
                <td class="has-text-right">display_uri</td>
                <td><span>{{ objkt.display_uri }}</span></td>
              </tr>

              <tr>
                <td class="has-text-right">extra</td>
                <td><pre><code>{{ JSON.stringify(objkt.extra, null, 2) }}</code></pre></td>
              </tr>

              <tr>
                <td class="has-text-right">hdao_balance</td>
                <td><span>{{ (objkt.hdao_balance / 1e6).toFixed(5) }}</span></td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      <h3 class="subtitle is-4 mt-6">Holders</h3>
      <div v-if="!objkt.token_holders || !objkt.token_holders.length">No Holders.</div>
      <b-table v-else :data="objkt.token_holders">
        <b-table-column field="holder.address" label="holder" sortable v-slot="props">
          <subjkt :obj="props.row.holder" />
        </b-table-column>
        <b-table-column field="quantity" label="quantity" numeric sortable v-slot="props">
          {{ props.row.quantity }}
        </b-table-column>
      </b-table>

      <h3 class="subtitle is-3 mt-6"><a href="https://hicetnunc.xyz" target="_blank">hicetnunc</a></h3>

      <h3 class="subtitle is-4 mt-3">Swaps</h3>
      <div v-if="!swaps.length">No Swaps.</div>
      <b-table v-else :data="swaps">
        <b-table-column field="timestamp" label="" sortable v-slot="props">
          <timestamp :timestamp="props.row.timestamp" />
        </b-table-column>
        <b-table-column field="creator.address" label="creator" sortable v-slot="props">
          <span v-show="props.row.creator.address === objkt.creator.address">
            <subjkt :obj="props.row.creator" />
          </span>
          <em v-show="props.row.creator.address !== objkt.creator.address">
            <subjkt :obj="props.row.creator" />
          </em>
        </b-table-column>
        <b-table-column field="status" label="status" sortable v-slot="props">
          {{ status[props.row.status] }}
        </b-table-column>
        <b-table-column field="amount" label="amount" numeric sortable v-slot="props">
          {{ props.row.amount }}
        </b-table-column>
        <b-table-column field="sold" label="sold" numeric sortable v-slot="props">
          {{ props.row.sold}}
        </b-table-column>
        <b-table-column field="amount_left" label="left" numeric sortable v-slot="props">
          {{ props.row.amount_left }}
        </b-table-column>
        <b-table-column field="price" label="price" numeric sortable v-slot="props">
          {{ props.row.price / 1e6 }}
        </b-table-column>
      </b-table>

      <h3 class="subtitle is-4 mt-6">Trades</h3>
      <div v-if="!objkt.trades || !objkt.trades.length">No Trades.</div>
      <b-table v-else :data="objkt.trades">
        <b-table-column field="timestamp" label="" sortable v-slot="props">
          <timestamp :timestamp="props.row.timestamp" />
        </b-table-column>
        <b-table-column field="seller.address" label="seller" sortable v-slot="props">
          <span v-show="props.row.seller.address === objkt.creator.address">
            <subjkt :obj="props.row.seller" />
          </span>
          <em v-show="props.row.seller.address !== objkt.creator.address">
            <subjkt :obj="props.row.seller" />
          </em>
        </b-table-column>
        <b-table-column field="buyer.address" label="buyer" sortable v-slot="props">
          <subjkt :obj="props.row.buyer" />
        </b-table-column>
        <b-table-column field="amount" label="amount" numeric sortable v-slot="props">
          {{ props.row.amount }}
        </b-table-column>
        <b-table-column field="swap.price" label="price" numeric sortable v-slot="props">
          {{ props.row.swap.price / 1e6 }}
        </b-table-column>
      </b-table>

      <h3 class="subtitle is-3 mt-6"><a href="https://objkt.com" target="_blank">objkt.com</a></h3>

      <h3 class="subtitle is-4 mt-3">Asks</h3>
      <div v-if="!asks.length">No asks.</div>
      <b-table v-else :data="asks">
        <b-table-column field="timestamp" label="" sortable v-slot="props">
          <timestamp :timestamp="props.row.timestamp" />
        </b-table-column>
        <b-table-column field="creator.address" label="creator" sortable v-slot="props">
          <span v-show="props.row.creator.address === objkt.creator.address">
            <subjkt :obj="props.row.creator" />
          </span>
          <em v-show="props.row.creator.address !== objkt.creator.address">
            <subjkt :obj="props.row.creator" />
          </em>
        </b-table-column>
        <b-table-column field="status" label="status" sortable v-slot="props">
          {{ props.row.status }}
        </b-table-column>
        <b-table-column field="amount" label="amount" numeric sortable v-slot="props">
          {{ props.row.amount }}
        </b-table-column>
        <b-table-column field="sold" label="sold" numeric sortable v-slot="props">
          {{ props.row.sold}}
        </b-table-column>
        <b-table-column field="amount_left" label="left" numeric sortable v-slot="props">
          {{ props.row.amount_left }}
        </b-table-column>
        <b-table-column field="price" label="price" numeric sortable v-slot="props">
          {{ props.row.price / 1e6 }}
        </b-table-column>
      </b-table>

      <h3 class="subtitle is-4 mt-6">Fulfilled Asks</h3>
      <div v-if="!fulfilledAsks.length">No Fulfilled Asks</div>
      <b-table v-else :data="fulfilledAsks">
        <b-table-column field="timestamp" label="" sortable v-slot="props">
          <timestamp :timestamp="props.row.timestamp" />
        </b-table-column>
        <b-table-column field="seller.address" label="seller" sortable v-slot="props">
          <span v-show="props.row.seller.address === objkt.creator.address">
            <subjkt :obj="props.row.seller" />
          </span>
          <em v-show="props.row.seller.address !== objkt.creator.address">
            <subjkt :obj="props.row.seller" />
          </em>
        </b-table-column>
        <b-table-column field="buyer.address" label="buyer" sortable v-slot="props">
          <subjkt :obj="props.row.buyer" />
        </b-table-column>
        <b-table-column field="amount" label="amount" numeric sortable v-slot="props">
          {{ props.row.amount }}
        </b-table-column>
        <b-table-column field="price" label="price" numeric sortable v-slot="props">
          {{ props.row.price / 1e6 }}
        </b-table-column>
      </b-table>

      <h3 class="subtitle is-4 mt-6">English Auctions</h3>
      <div v-if="!englishs.length">No English Auctions</div>
      <div v-else>
        <b-table
          :data="englishs"
          detailed
          detail-key="id"
          detail-transition="fade"
          :show-detail-icon="true">
          <b-table-column field="start_time" label="start/end time" sortable v-slot="props">
            <span class="is-family-monospace">
              {{ new Date(props.row.start_time).toLocaleDateString() }} {{ new Date(props.row.start_time).toLocaleTimeString() }}<br>
              {{ new Date(props.row.end_time).toLocaleDateString() }} {{ new Date(props.row.end_time).toLocaleTimeString() }}
            </span>
          </b-table-column>
          <b-table-column field="creator.address" label="auction creator" sortable v-slot="props">
            <span v-show="props.row.creator.address === props.row.artist.address">
              <subjkt :obj="props.row.creator" />
            </span>
            <em v-show="props.row.creator.address !== props.row.artist.address">
              <subjkt :obj="props.row.creator" />
            </em>
          </b-table-column>
          <b-table-column field="status" label="status" sortable v-slot="props">
            {{ props.row.status }}
          </b-table-column>
          <b-table-column field="reserve" label="reserve" sortable numeric v-slot="props">
            {{ props.row.reserve / 1e6 }}
          </b-table-column>
          <b-table-column field="price_increment" label="price_increment" sortable numeric v-slot="props">
            {{ props.row.price_increment / 1e6 }}
          </b-table-column>
          <b-table-column field="bids_count" label="bids" sortable numeric v-slot="props">
            <a @click="props.toggleDetails(props.row)">
              {{ props.row.bids_count }}
            </a>
          </b-table-column>

          <template #detail="props">
            <b-table :data="props.row.bids">
              <b-table-column field="timestamp" label="bid time" sortable v-slot="bid">
                <timestamp :timestamp="bid.row.timestamp" />
              </b-table-column>
              <b-table-column field="bidder" label="bidder" sortable v-slot="bid">
                <subjkt :obj="bid.row.bidder" />
              </b-table-column>
              <b-table-column field="amount" label="price" numeric sortable v-slot="bid">
                {{ bid.row.amount / 1e6 }}
              </b-table-column>
            </b-table>
          </template>

        </b-table>
      </div>
<!--
      <h3 class="subtitle is-4 mt-6">Dutch Auctions</h3>
      <div v-if="!dutchs.length">No Dutch Auctions</div>
      <div v-else>
        <b-table
          :data="dutchs"
          detailed
          detail-key="id"
          detail-transition="fade"
          :show-detail-icon="true">
          <b-table-column field="start_time" label="start/end time" sortable v-slot="props">
            <span class="is-family-monospace">
              {{ new Date(props.row.start_time).toLocaleDateString() }} {{ new Date(props.row.start_time).toLocaleTimeString() }}<br>
              {{ new Date(props.row.end_time).toLocaleDateString() }} {{ new Date(props.row.end_time).toLocaleTimeString() }}
            </span>
          </b-table-column>
          <b-table-column field="creator.address" label="auction creator" sortable v-slot="props">
            <span v-show="props.row.creator.address === props.row.artist.address">
              <subjkt :obj="props.row.creator" />
            </span>
            <em v-show="props.row.creator.address !== props.row.artist.address">
              <subjkt :obj="props.row.creator" />
            </em>
          </b-table-column>
          <b-table-column field="status" label="status" sortable v-slot="props">
            {{ props.row.status }}
          </b-table-column>
          <b-table-column field="reserve" label="reserve" sortable numeric v-slot="props">
            {{ props.row.reserve / 1e6 }}
          </b-table-column>
          <b-table-column field="price_increment" label="price_increment" sortable numeric v-slot="props">
            {{ props.row.price_increment / 1e6 }}
          </b-table-column>
          <b-table-column field="bids_count" label="bids" sortable numeric v-slot="props">
            <a @click="props.toggleDetails(props.row)">
              {{ props.row.bids_count }}
            </a>
          </b-table-column>

          <template #detail="props">
            <b-table :data="props.row.bids">
              <b-table-column field="timestamp" label="bid time" sortable v-slot="bid">
                <timestamp :timestamp="bid.row.timestamp" />
              </b-table-column>
              <b-table-column field="bidder" label="bidder" sortable v-slot="bid">
                <subjkt :obj="bid.row.bidder" />
              </b-table-column>
              <b-table-column field="amount" label="price" numeric sortable v-slot="bid">
                {{ bid.row.amount / 1e6 }}
              </b-table-column>
            </b-table>
          </template>

        </b-table>
      </div>-->

    </div>
  </div>
</template>

<script>
import Timestamp from './Timestamp.vue';
import Subjkt from './Subjkt.vue';

export default {
  components: {
    Subjkt,
    Timestamp,
  },
  props: ['objkt', 'ask', 'english', 'dutch'],

  mounted() {
    // console.log(this.objkt);
  },
  data() {
    return {
      status: {
        0: 'active',
        1: 'finished',
        2: 'canceled',
      },
    };
  },
  methods: {
    link(addr) {
      return `https://www.hicetnunc.xyz/tz/${addr}`;
    },
    img(ipfsUrl) {
      const matched = ipfsUrl.match(/ipfs:\/\/(.*)/);
      if (matched) {
        return `https://cloudflare-ipfs.com/ipfs/${matched[1]}`;
      }
      return '';
    },
  },
  computed: {
    properties() {
      return Object.entries(this.objkt)
        .filter(([key, val]) => typeof val !== 'object' || key === 'extra' || key === 'token_tags')
        .filter(([key, _val]) => !key.startsWith('__'))
        .map(([key, val]) => ({ key, val }));
    },
    swaps() {
      if (!this.objkt.swaps) return [];
      return this.objkt.swaps.map((swap) => {
        swap.sold = swap.amount - swap.amount_left;
        return swap;
      });
    },
    asks() {
      if (!this.ask) return [];
      return this.ask.map((ask) => {
        ask.sold = ask.amount - ask.amount_left;
        return ask;
      });
    },
    dutchs() {
      if (!this.dutch) return [];
      return this.dutch.map((dutch) => {
        dutch.bids_count = dutch.bids.length;
        return dutch;
      });
    },
    englishs() {
      if (!this.english) return [];
      return this.english.map((english) => {
        english.bids_count = english.bids.length;
        return english;
      });
    },
    fulfilledAsks() {
      if (!this.ask) return [];
      const trades = [];
      this.asks.forEach((ask) => {
        ask.fulfilled.forEach((fullfilled) => {
          fullfilled.seller = { ...ask.creator };
          fullfilled.price = ask.price;
          trades.push(fullfilled);
        });
      });
      return trades;
    },
  },
};

</script>

<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <div class="content">
            <h1 class="title is-2">
              hicdex
            </h1>

            <h2 class="subtitle is-4">a blockchain indexer and GraphQL API for hicetnunc</h2>

            <div class="content">
              <p>
                <a href="https://github.com/hicdex/hicdex" target="_blank">hicdex</a> is a Tezos indexers focused on indexing <a href="https://hicetnunc.xyz" target="_blank">hicetnunc.xyz</a>'s
                smart contracts activity. The indexed data is made available by exposing a public <a href="https://www.graphql.com/tutorials/" target="_blank">GraphQL</a> endpoint.
              </p>

              <h2 class="subtitle">getting started</h2>

              <p>
                Write queries on the <a href="https://api.hicdex.com/graphiql" style="font-weight: 700">GraphiQL explorer</a>
                or use the endpoint <code style="font-weight: 700">https://api.hicdex.com/v1/graphql</code>
              </p>

              <h2 class="subtitle">sample projects</h2>
              <p>
                Below are some sample tools built to showcase hicdex and to help you build your own tools based on H=N's data.
                Each tool also prints usable JavaScript code that shows how to achieve the same result as the tool.
              </p>
            </div>
          </div>
        </article>
      </div>

      <div class="tile is-vertical is-6">
        <tile routeName="objkt" title="OBJKT by ID">
          <p>
            Audit a single objkt.
          </p>
        </tile>

        <tile routeName="price-history" title="OBJKT price history">
          <p>
            Explore the price history of an OBJKT.
          </p>
        </tile>

        <tile routeName="charts" title="HEN Statistics">
          <p>
            Some charts showing what's happening on HEN over time.
          </p>
        </tile>

      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-vertical is-6">

        <tile routeName="sold" title="your latest sales">
          <p>
            What you sold and when, primary and secondary.
          </p>
        </tile>

        <tile routeName="my-secondary-market-sales" title="your sales on the secondary market">
          <p>
            What you have bought and are either trying to sell on the secondary market
            or have sold on the secondary market.
          </p>
        </tile>

        <tile routeName="creator-gallery" title="your creations">
          <p>
            All your artworks in a single call. Some artists might want to display their creations on their website.
          </p>
        </tile>

        <tile routeName="collector-gallery" title="your collection">
          <p>
            Why not show your collection on your website, build a nice exhibition as if you were an actuall gallery (hint: you are.)
          </p>
        </tile>

        <!--<tile routeName="flip" title="flip opportunities">
          <p>
            What in your collection would be the worth putting on the secondary market?
          </p>
        </tile>-->

      </div>

      <div class="tile is-vertical is-6">

        <div class="tile is-parent">
          <article class="tile is-child is-warning notification">
            <p class="title">help hicdex</p>
            <div class="content">
              <p>
                If you value this tool, please support my effort and the time I spend developing it and maintaining it.
              </p>

              <div class="field has-addons">
                <div class="control">
                  <a class="button" @click="donate" :disabled="disableDonation">
                    Donate
                  </a>
                </div>
                <div class="control has-icons-right">
                  <input class="input" type="number" placeholder="amount" v-model="donation">
                  <span class="icon is-right">
                    xtz
                  </span>
                </div>
                <p class="control text-post-field">
                  to hicdex.tez
                </p>
              </div>

              <p>
                You can also
                <a style="text-decoration: underline !important;" href="https://www.hicetnunc.xyz/tz/tz1LKpeN8ZSSFNyTWiBNaE4u4sjaq7J1Vz2z" target="_blank">
                buy some generative art</a>,
                although my artistic output dropped dramatically with all the time dedicated to hicdex.
              </p>

              <p class="notification">
                <a :href="list[n].url" target="_blank">
                  {{ list[n].url }}
                </a> (by <a :href="twitterLink(list[n].twitter)">@{{ list[n].twitter }}</a>)
                <br>
                <em>
                  {{ list[n].description }}
                </em>
                <br>
                <progress class="progress is-warning is-small" :value="((n/list.length * 100) + 3) % 100" max="100"></progress>
              </p>
            </div>
          </article>
        </div>

        <tile routeName="my-art-on-secondary-market" title="your OBJKTS on the secondary market">
          <p>
            Which artworks of yours are either on sale on the secondary market
            or have been sold on the secondary market.
          </p>
        </tile>

        <tile routeName="creator-collectors" title="who collected your work">
          <p>
            A list of your biggest fans: everyone who bought one of your piece on the primary market and how many they bought total.
          </p>
        </tile>

      </div>

    </div>

  </div>
</template>

<script>
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import Tile from '../components/Tile.vue';

const Tezos = new TezosToolkit('https://mainnet.smartpy.io/');
const options = { name: 'hicdex' };
const wallet = new BeaconWallet(options);

Tezos.setWalletProvider(wallet);

const list = [
  {
    url: 'https://hicetnunc.xyz',
    twitter: 'hicetnunc2000',
    description: 'is powered by hicdex',
  },
  {
    url: 'https://oncyber.io',
    twitter: 'oncyber_io',
    description: 'uses hicdex to create 3D art galleries',
  },
  {
    url: 'https://hic.af',
    twitter: 'gwendall',
    description: 'relies on hicdex',
  },
  {
    url: 'https://www.henext.xyz',
    twitter: 'HenextXyz',
    description: 'relies on hicdex',
  },
  {
    url: 'https://www.bunnyknights.com',
    twitter: 'BunnyKnights',
    description: 'has a gallery powered by hicdex',
  },
  {
    url: 'https://glry.xyz/value',
    twitter: 'glryxyz',
    description: 'uses hicdex to compute your collection appraisal',
  },
  {
    url: 'https://hennycomb.glitch.me',
    twitter: 'secondcass',
    description: 'relies on hicdex to show you the newest mints of your favorite artists',
  },
  {
    url: 'https://hen.radio',
    twitter: '__orderandchaos',
    description: 'is powered by hicdex',
  },
  {
    url: 'https://hic.art',
    twitter: '1x1_NFT',
    description: 'relies on hicdex',
  },
  {
    url: 'https://www.tezospirates.xyz/',
    twitter: 'Flygohr',
    description: 'is powered by hicdex',
  },
];

export default {
  components: {
    Tile,
  },
  data() {
    return {
      donation: undefined,
      list,
      n: 0,
      interval: null,
    };
  },
  computed: {
    disableDonation() {
      const parsedDonation = parseFloat(this.donation);
      return Number.isNaN(parsedDonation);
    },
  },
  methods: {
    async donate() {
      if (this.disableDonation) return;

      await wallet
        .requestPermissions({ network: { type: 'mainnet' } })
        .then((_) => wallet.getPKH());

      Tezos.wallet
        .transfer({ to: 'tz1L4TadX36D5bqmmBQKg1g4CmvjHtk67toL', amount: parseFloat(this.donation) })
        .send()
        .then((op) => {
          console.log(`Hash: ${op.opHash}`);

          op.confirmation()
            .then((result) => {
              console.log(result);
              if (result.completed) {
                console.log('Transaction correctly processed!');
              } else {
                console.log('An error has occurred');
              }
            })
            .catch((err) => console.log(err));
        });
    },
    twitterLink(nick) {
      return `https://twitter.com/${nick}`;
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.n = (this.n + 1) % this.list.length;
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

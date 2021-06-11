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
        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/objkt">
              <p class="title">OBJKT by ID</p>
              <div class="content">
                <p>
                  Audit a single objkt.
                </p>
              </div>
            </router-link>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/price-history">
              <p class="title">OBJKT price history</p>
              <div class="content">
                <p>
                  Explore the price history of an OBJKT.
                </p>
              </div>
            </router-link>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/charts">
              <p class="title">HEN Statistics</p>
              <div class="content">
                <p>
                  Some charts showing what's happening on HEN over time.
                </p>
              </div>
            </router-link>
          </article>
        </div>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-vertical is-6">

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/sold">
              <p class="title">your latest sales</p>
              <div class="content">
                <p>
                  What you sold and when, primary and secondary.
                </p>
              </div>
            </router-link>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/my-secondary-market-sales">
              <p class="title">your sales on the secondary market</p>
              <div class="content">
                <p>
                  What you have bought and are either trying to sell on the secondary market
                  or have sold on the secondary market.
                </p>
              </div>
            </router-link>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/creator-gallery">
              <p class="title">your creations</p>
              <div class="content">
                <p>
                  All your artworks in a single call. Some artists might want to display their creations on their website.
                </p>
              </div>
            </router-link>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/collector-gallery">
              <p class="title">your collection</p>
              <div class="content">
                <p>
                  Why not show your collection on your website, build a nice exhibition as if you were an actuall gallery (hint: you are.)
                </p>
              </div>
            </router-link>
          </article>
        </div>

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
                  relies on hicdex {{ list[n].description }}
                </em>
                <br>
                <progress class="progress is-warning is-small" :value="((n/list.length * 100) + 3) % 100" max="100"></progress>
              </p>
            </div>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/my-art-on-secondary-market">
              <p class="title">your OBJKTS on the secondary market</p>
              <div class="content">
                <p>
                  Which artworks of yours are either on sale on the secondary market
                  or have been sold on the secondary market.
                </p>
              </div>
            </router-link>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child notification">
            <router-link to="/creator-collectors">
              <p class="title">who collected your work</p>
              <div class="content">
                <p>
                  A list of your biggest fans: everyone who bought one of your piece on the primary market and how many they bought total.
                </p>
              </div>
            </router-link>
          </article>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';

const Tezos = new TezosToolkit('https://mainnet.smartpy.io/');
const options = { name: 'hicdex' };
const wallet = new BeaconWallet(options);

Tezos.setWalletProvider(wallet);

const list = [
  {
    url: 'https://hicetnunc.xyz',
    twitter: 'hicetnunc2000',
    description: '',
  }, {
    url: 'https://oncyber.io',
    twitter: 'oncyber_io',
    description: 'to create 3D art galleries',
  }, {
    url: 'https://glry.xyz/value',
    twitter: 'glryxyz',
    description: 'to compute your collection appraisal',
  }, {
    url: 'https://hennycomb.glitch.me',
    twitter: 'secondcass',
    description: 'to show you the newest mints of your favorite artists',
  }, {
    url: 'https://www.objkt.bid',
    twitter: 'NFTPROTECTOR',
    description: 'to create an auction system for H=N',
  },
];

export default {
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
    }, 7000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<template>
  <article class="p-3" :class="{ even: index % 2 === 0, odd: index % 2 !== 0 }">
    <summary>
      <h3>{{ formatTimestamp(item.timeStamp) }}</h3>
      <p :class="item.status">{{ item.status }}</p>
      <p>
        <b>{{ item.orderValue }}</b
        ><i> SEK</i>
      </p>
    </summary>

    <transition>
      <details class="" @click="onOpen" :open="isOpen">
        <section class="p-3">
          <h4 class="pv-2">Order id:</h4>
          <p class="ml-3">
            <i>{{ item._id }}</i>
          </p>
          <h4 class="pv-2">Products:</h4>
          <ul class="ml-3" v-for="(product, i) in products" :key="i">
            <li class="mv-1">
              <i>product-id: </i>
              <router-link :to="`/products/${product._id}`">
                <a
                  ><u>{{ product._id }}</u></a
                >
              </router-link>
            </li>
            <li>
              <span class="mv-1">name:{{ product.title }}</span>
              <span class="mv-1">
                <b> price:{{ product.price }}</b></span
              >
            </li>
          </ul>

          <h4 class="pv-2">Information:</h4>
          <ul class="ml-3">
            <li>
              <span>{{ user.name }}</span
              ><i class="gg-user"></i>
            </li>
            <li>
              <span style="display:flex;align-items:center;">{{ user.email }} <i class="gg-mail"> </i></span>
            </li>
            <li>
              <span>{{ user.adress.street }} </span>
              <span>{{ user.adress.zip }} </span>
              <span>{{ user.adress.city }} </span>
            </li>
          </ul>

          <h4 class="pv-2">Order price:</h4>
          <span class="ml-3">{{ totalOrderPrice }} SEK</span>
        </section>
      </details>
    </transition>
  </article>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false, // Toggle collapse
      hasLoaded: false, // Tack get request
      products: [],
      totalOrderPrice: 0,
    };
  },
  props: {
    item: Object,
    index: {
      type: Number,
      value: 0,
    },
    user: {
      type: Object,
      default: function () {
        return {
          adress: "Not yet implemented for <anonymous> non-users",
          email: "-//-",
        };
      },
    },
  },
  // watch: {
  //   isOpen: {
  //     handler(ev) {
  //       // When handler is activated. Make get requests to fill in items from their ids
  //       console.log({ev},this.isOpen)
  //     },
  //   },
  // },
  methods: {
    formatTimestamp(timestamp) {
      let date = new Date(timestamp);
      let formatter = new Intl.DateTimeFormat("sv-SE");
      return formatter.format(date);
    },
    onOpen(ev) {
      let { explicitOriginalTarget } = ev;
      if (explicitOriginalTarget.tagName !== "DETAILS") return;
      //this.isOpen = explicitOriginalTarget.hasAttribute("open") ? true : false;
      this.isOpen = !this.isOpen;
      if (!this.isOpen) return;

      (async () => {
        let _ = await this.loadProductsByCurrentOrderId(ev);
        this.getOrderPrice();
      })();
    },
    getOrderPrice() {
      if (this.products.length < 1) return 0;
      this.totalOrderPrice = this.products.reduce((a, b) => a.price + b.price);
    },
    async loadProductsByCurrentOrderId(ev) {
      //let response = await this.$store.dispatch("loadProductsFromDB");
      let response = await this.$store.dispatch(
        "getProductsByOrderId",
        this.item._id
      );
      this.products = response;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
summary {
  display: flex;
  justify-content: flex-start;
}
summary > *:not(h3) {
  margin-left: 0.5rem;
}
details {
  cursor: pointer;
}
details section {
  cursor: initial;
}
.tiny {
  font-size: 0.8rem;
}
.in-process,
.inProcess {
  color: $blood-orange-opacity-70;
  font-weight: 800;
}
.done,
.Done {
  color: darkgreen;
  font-weight: 800;
}
.even {
  background-color: $gray-1;
}
.odd {
  background-color: $gray-2;
}
</style>
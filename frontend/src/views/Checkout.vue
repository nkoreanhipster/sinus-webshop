<template>
  <section class="wrapper">
    <h1 class="mv-5">Your Cart</h1>

    <div class="columns">
      <div class="">
        <div class="flex mb-4">
          <span class="light mr-2">ITEMS</span>
          <hr />
        </div>

        <ProductMiniature
          v-for="item in cartItems"
          :key="item.obj._id"
          :product="item.obj"
          :duplicateCount="item.duplicateCount || 0"
        />
        <hr class="dotted" />
        <p class="text">TOTAL: {{ cartItemSum }}</p>
      </div>

      <div class="">
        <div class="flex mb-4">
          <span class="light mr-2">DELIVERY </span>
          <hr />
        </div>

        <label class="light small" for="name">Name</label>
        <input type="text" class="" name="name" v-model="user.name" />
        <label class="light small" for="street">Street Adress</label>
        <input type="text" class="" name="street" v-model="user.street" />
        <div class="">
          <label class="light small half-width" for="city">City</label>
          <input
            type="text"
            class="half-width"
            name="city"
            v-model="user.city"
          />
          <label class="light small half-width" for="zip">Zip Code</label>
          <input type="text" class="half-width" name="zip" v-model="user.zip" />
        </div>
      </div>

      <div class="">
        <div class="flex mb-4">
          <span class="light mr-2">PAYMENT DETAILS </span>
          <hr />
        </div>

        <label class="light small" for="name">Card Owner</label>
        <input
          type="text"
          class=""
          name="card_owner"
          v-model="user.cardOwner"
        />
        <label class="light small" for="card_number">Card Number</label>
        <input
          type="text"
          class=""
          name="card_number"
          v-model="user.cardNumber"
        />
        <div>
          <label class="light small half-width" for="valid_until"
            >Valid until</label
          >
          <input
            type="date"
            class="half-width"
            v-model="user.validUntil"
            name="valid_until"
          />
          <label class="light small half-width" for="cvv">CVV</label>
          <input type="text" class="half-width" v-model="user.cvv" name="cvv" />
        </div>
      </div>
    </div>

    <div class="p-3" style="text-align: right">
      <b class="p-3" :class="{ failure: !orderSent, success: orderSent }">{{
        message
      }}</b>
      <button
        class="btn-black"
        :class="{ failure: !orderSent, success: orderSent }"
        @click="order"
      >
        Take my Money!
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ProductMiniature from "@/components/ProductMiniature.vue";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "CHECKOUT",
  },
  data() {
    return {
      user: {
        name: "",
        street: "",
        city: "",
        zip: "",
        cardOwner: "",
        cardNumber: "",
        validUntil: "",
        cvv: "",
      },
      message: "",
      orderSent: false,
      itemsInCart:0
    };
  },
  created() {
    this.$store.dispatch("closeAllModals");
    this.$store.dispatch("changeBannerSize", { maxHeight: 200 });
    this.message = "";
    this.orderSent = false;
  },
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      let { name } = this.$store.getters.currentUser;
      this.user.name = name;
    }
  },
  computed: {
    ...mapGetters([
      "cart",
      "totalItemsInCart",
      "sumOfCartItems",
      "currentUser",
      "isAuthenticated",
    ]),
    cartItems() {
      let cart = this.cart;
      // Oh god.
      // Strangle me.
      cart.sort((a, b) => (a._id > b._id ? 1 : b._id > a._id ? -1 : 0));
      var out = [];
      for (var j = 0; j < cart.length; j++) {
        const obj = cart[j];
        let found = out.find((x) => x.obj._id === obj._id);
        if (found) continue;
        let duplicateCount = cart.filter((x) => x._id === obj._id).length;
        out.push({ obj, duplicateCount });
      }
      return out;
    },
    cartItemSum() {
      return this.sumOfCartItems;
    },
    isUserAuthenticated() {
      return this.isAuthenticated;
    },
    currentUserData() {
      return this.currentUser;
    },
  },
  methods: {
    // Activated on button click
    async order() {
      this.message = "";
      this.orderSent = false;

      if (this.$store.getters.totalItemsInCart < 1) {
        this.message = "0 items in cart";
        return;
      }

      // Loop userdata and check if any value is bad length
      let errorCounts = Object.entries(this.user).filter(([key, val]) => {
        console.log(key,val,val.length)
        return val.length < 1;
      }).length;

      if (errorCounts > 0) {
        this.message = "Something went wrong. Stuff not filled in";
        return;
      }

      let {name,street,city,zip} = this.user;
      let {cardOwner,cardNumber,validUntil,cvv} = this.user;

      let payload = {
        customer:{name,street,city,zip},
        payment:{cardOwner,cardNumber,validUntil,cvv}
      };

      let response = await this.$store.dispatch("submitNewOrder", payload);
      this.orderSent = true;
      this.message = response;
      this.$store.dispatch("clearCart");
      // alert(JSON.stringify(response));
    },
  },
  components: { ProductMiniature },
};
</script>

<style lang="scss" scoped>
.half-width {
  max-width: 49%;
}
</style>
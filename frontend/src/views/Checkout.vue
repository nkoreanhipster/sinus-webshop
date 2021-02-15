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
          v-model="user.card_owner"
        />
        <label class="light small" for="card_number">Card Number</label>
        <input
          type="text"
          class=""
          name="card_number"
          v-model="user.card_number"
        />
        <div>
          <label class="light small half-width" for="valid_until"
            >Valid until</label
          >
          <input
            type="date"
            class="half-width"
            v-model="user.valid_until"
            name="valid_until"
          />
          <label class="light small half-width" for="ccv">CCV</label>
          <input type="text" class="half-width" v-model="user.ccv" name="ccv" />
        </div>
      </div>
    </div>

    <div class="p-3" style="text-align: right">
      <b
        class="p-3"
        :class="{ 'failure': !orderSent, 'success': orderSent }"
        >{{ message }}</b
      >
      <button class="btn-black" :class="{ 'failure': !orderSent, 'success': orderSent }" @click="order">
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
        zip: ",",
        card_owner: "",
        card_number: "",
        valid_until: "",
        ccv: "",
      },
      message: "",
      orderSent: false,
    };
  },
  created() {
    this.$store.dispatch("closeAllModals");
    this.$store.dispatch("changeBannerSize", { maxHeight: 200 });
    this.message = "";
    this.orderSent = false;
  },
  computed: {
    ...mapGetters(["cart", "totalItemsInCart", "sumOfCartItems"]),
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
  },
  methods: {
    // Activated on button click
    async order() {
      this.message = "";
      this.orderSent = false;
      // Loop userdata and check if any value is bad length
      let errorCounts = Object.entries(this.user).filter(
        ([key, val]) => val.length < 1
      ).length;

      if (errorCounts > 0) {
        this.message = "Something went wrong. Stuff not filled in";
        return;
      }
      let response = await this.$store.dispatch("submitNewOrder", this.user);
      this.orderSent = true;
      this.message = response;
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
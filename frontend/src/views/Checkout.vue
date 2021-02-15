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
        <input type="text" class="" name="name" />
        <label class="light small" for="street">Street Adress</label>
        <input type="text" class="" name="street" />
        <div class="">
          <label class="light small half-width" for="city">City</label>
          <input type="text" class="half-width" name="city" />
          <label class="light small half-width" for="zip">Zip Code</label>
          <input type="text" class="half-width" name="zip" />
        </div>
      </div>

      <div class="">
        <div class="flex mb-4">
          <span class="light mr-2">PAYMENT DETAILS </span>
          <hr />
        </div>

        <label class="light small" for="name">Card Owner</label>
        <input type="text" class="" name="card_owner" />
        <label class="light small" for="card_number">Card Number</label>
        <input type="text" class="" name="card_number" />
        <div>
          <label class="light small half-width" for="valid_until"
            >Valid until</label
          >
          <input type="date" class="half-width" name="valid_until" />
          <label class="light small half-width" for="ccv">CCV</label>
          <input type="text" class="half-width" name="ccv" />
        </div>
      </div>
    </div>

    <div class="p-3" style="text-align: right">
      <button class="btn-black" @click="order">Take my Money!</button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ProductMiniature from "@/components/ProductMiniature.vue";
// import {
//   addDuplicateCountProperty,
//   removeDuplicatesFromArray,
// } from "@/lib/array-helpers.js";

export default {
  created() {
    this.$store.dispatch("closeAllModals");
    this.$store.dispatch("changeBannerSize", { maxHeight: 200 });
  },
  computed: {
    ...mapGetters(["cart", "totalItemsInCart", "sumOfCartItems"]),
    cartItems() {
       let cart = this.cart
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
    // userCartItems() {
    //   let myCart = this.cart;
    //   addDuplicateCountProperty(myCart);
    //   myCart = removeDuplicatesFromArray(myCart);
    //   return myCart;
    // },
    // getMeMyCartItemsSumTotalYeah() {
    //   return this.sumOfCartItems;
    // },
  },
  methods: {
    async order() {
      let response = await this.$store.dispatch("submitNewOrder");
      alert(JSON.stringify(response));
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
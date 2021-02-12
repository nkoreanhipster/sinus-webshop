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
          :key="item.id"
          :product="item"
        />
        <hr class="dotted" />
        <p class="text">TOTAL: {{ cartItemSum }}</p>
      </div>
      
      <div class="input-field">
        <div class="flex mb-4">
          <span class="light mr-2">DELIVERY </span>
          <hr />
        </div>

        <label class="light small" for="name">Name</label>
        <input type="text" name="name" />
        <label class="light small" for="street">Street Adress</label>
        <input type="text" name="street" />
        <label class="light small" for="city">City</label>
        <input type="text" name="city" />
        <label class="light small" for="zip">Zip Code</label>
        <input type="text" name="zip" />
      </div>
      
      <div class="input-field">
        <div class="flex mb-4">
          <span class="light mr-2">PAYMENT DETAILS </span>
          <hr />
        </div>

        <label class="light small" for="name">Card Owner</label>
        <input type="text" name="card_owner" />
        <label class="light small" for="card_number">Card Number</label>
        <input type="text" name="card_number" />
        <label class="light small" for="valid_until">Valid until</label>
        <input type="text" name="valid_until" />
        <label class="light small" for="ccv">CCV</label>
        <input type="text" name="ccv" />
      </div>
    </div>

    <div class="p-3" style="text-align:right;">
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
  computed: {
    ...mapGetters(["cart", "totalItemsInCart", "sumOfCartItems"]),
    cartItems() {
      return this.cart;
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
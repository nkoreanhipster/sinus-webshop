<template>
  <section>
    <p class="opacity-40">/product-cart - checkout</p>

    <ProductItem
      v-for="item in userCartItems"
      :key="item.id"
      :product="item"
    ></ProductItem>

    <p>Total:{{ getMeMyCartItemsSumTotalYeah }}</p>
    <button @click="order">Take my Money!</button>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ProductItem from "@/components/ProductItem.vue";
import {
  addDuplicateCountProperty,
  removeDuplicatesFromArray,
} from "@/lib/array-helpers.js";

export default {
  computed: {
    ...mapGetters(["cart", "sumOfCartItems"]),
    userCartItems() {
      let myCart = this.cart;
      addDuplicateCountProperty(myCart);
      myCart = removeDuplicatesFromArray(myCart);
      return myCart;
    },
    getMeMyCartItemsSumTotalYeah() {
      return this.sumOfCartItems;
    },
  },
  methods: {
    async order() {
      let response = await this.$store.dispatch("submitNewOrder");
      alert(JSON.stringify(response));
    },
  },
  components: { ProductItem },
};
</script>
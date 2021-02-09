<template>
  <section>
    <p class="opacity-40">/product-cart - checkout</p>
    <div>
      <ProductItem
        v-for="item in userCartItems"
        :key="item.id"
        :product="item"
      ></ProductItem>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex"
import ProductItem from "@/components/ProductItem.vue"
import {addDuplicateCountProperty,removeDuplicatesFromArray} from '@/lib/array-helpers.js'

export default {
  computed: {
    ...mapGetters(["cart"]),
    userCartItems() {
      let myCart = this.cart
      addDuplicateCountProperty(myCart)
      myCart = removeDuplicatesFromArray(myCart)
      return myCart
    },
  },
  components:{ProductItem}
};
</script>
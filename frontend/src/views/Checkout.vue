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

      <div class="">
        <div class="flex mb-4">
          <span class="light mr-2">DELIVERY </span>
          <hr />
        </div>

        <label class="light small" for="name">Name</label>
        <input type="text" class="" name="name" v-model="user.name" :required="user.name.length > 1"/>
        <label class="light small" for="street">Street Adress</label>
        <input type="text" class="" name="street" v-model="user.street" :required="user.name.length > 1"/>
        <div class="">
          <label class="light small half-width" for="city">City</label>
          <input type="text" class="half-width" name="city" v-model="user.city" :required="user.name.length > 1"/>
          <label class="light small half-width" for="zip">Zip Code</label>
          <input type="text" class="half-width" name="zip" v-model="user.zip" :required="user.name.length > 1"/>
        </div>
      </div>

      <div class="">
        <div class="flex mb-4">
          <span class="light mr-2">PAYMENT DETAILS </span>
          <hr />
        </div>

        <label class="light small" for="name">Card Owner</label>
        <input type="text" class="" name="card_owner" v-model="user.card_owner" :required="user.name.length > 1"/>
        <label class="light small" for="card_number">Card Number</label>
        <input type="text" class="" name="card_number" v-model="user.card_number" :required="user.name.length > 1"/>
        <div>
          <label class="light small half-width" for="valid_until">Valid until</label>
          <input type="date" class="half-width" v-model="user.valid_until" name="valid_until" :required="user.name.length > 1"/>
          <label class="light small half-width" for="ccv">CCV</label>
          <input type="text" class="half-width" v-model="user.ccv" name="ccv" :required="user.name.length > 1"/>
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
  metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'CHECKOUT'
    },
    data() {
    return {
      user: {
        name: '',
        street: '',
        city: '',
        zip: ',',
        card_owner:'',
        card_number:'',
        valid_until: '',
        ccv: '',
      }
    };
  },
  created() {
    this.$store.dispatch("closeAllModals");
    this.$store.dispatch("changeBannerSize", { maxHeight: 200 });
  },
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
      let response = await this.$store.dispatch("submitNewOrder", this.user);
      alert(JSON.stringify(response));
    },
  },
  components: { ProductMiniature },
};
</script>

<style lang="scss" scoped>
.half-width{
  max-width: 49%;
}
</style>
<template>
  <section class="wrapper">
    <h1 class="mt-5 mb-4">Admin Products</h1>
    <div class="flex mb-4">
      <span class="light mr-2">Add / Edit</span>
      <hr />
    </div>

    <div class="input-box">
      <div class="columns">
        <div class="input-file-box">
          <label for="photo">Product Photo</label>
          <input name="photo" type="file" />
        </div>
        <div>
          <label for="photo">Product Name</label>
          <input type="text" name="title" v-model="selectedProduct.title"/>
          <label for="short_desc">Product short desc</label>
          <input type="text" name="short_desc" v-model="selectedProduct.shortDesc"/>
          <label for="price">Product Price</label>
          <input type="number" name="price" v-model="selectedProduct.price" />
          <label for="serial">Product Serial</label>
          <input type="text" name="serial" v-model="selectedProduct.serial" />
        </div>
        <div>
          <label for="long_desc">Product Description</label>
          <textarea name="long_desc" id="" cols="30" rows="10" v-model="selectedProduct.longDesc"></textarea>
          <button>Uppdatera!</button>
        </div>
      </div>
    </div>

    <h2>Products</h2>
    <div class="admin-products" v-for="product in products" :key="product._id">
      <span @click="setSelectedProduct(product)">
      {{ product }}
        <button disabled>ta bort</button> 
        <button disabled>uppdatera</button> 
      </span>
    </div>

    <h1 class="mt-5">Orders</h1>
    <ul>
      <li v-for="item in orderHistoryOfAllUsers" :key="item._id">
        <p>{{ item }}</p>
      </li>
    </ul>

    <div>
      <button class="btn-black" @click="logout">Logout</button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    if (this.role !== "admin" || !this.authenticated) {
      this.$router.push({ path: "register" });
    }
  },
  data() {
    return {
      orderHistoryOfAllUsers: [],
      selectedProduct:{}
    };
  },
  mounted() {
    this.$store.dispatch("closeAllModals");
    this.$store.dispatch("changeBannerSize", {
      maxHeight: 100,
    });
    this.getAllOrders();
    this.loadProductCatalog();
  },
  methods: {
    logout() {
      location.reload();
    },
    async getAllOrders() {
      let res = await this.$store.dispatch("getAllOrders");
      console.log("????????????", { res });
      this.orderHistoryOfAllUsers = res;
      return res;
    },
    async loadProductCatalog() {
      let response = await this.$store.dispatch("loadProductsFromDB");
    },
    setSelectedProduct(product){
      this.selectedProduct = product
    }
  },
  computed: {
    ...mapGetters(["productCatalog", "userRole", "isAuthenticated"]),
    products() {
      return this.productCatalog;
    },
    role() {
      return this.userRole;
    },
    authenticated() {
      return this.isAuthenticated;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.input-box {
  background-color: $gray-5;
  padding: 1rem;
  & .input-file-box {
    padding: 1rem;
    border: 0.2rem dotted rgba(255, 255, 255, 0.4);
    & label {
      margin: 1rem;
    }
  }
}
.input-box input {
  border-color: rgba(255, 255, 255, 0.4);
  background-color: transparent;
}
.input-box input,
.input-box label {
  font-family: Open Sans;
  color: rgba(255, 255, 255, 0.8);
}
.admin-products span:hover{
  color: rgba(206, 105, 105, 0.9);
  cursor: pointer;
}
</style>
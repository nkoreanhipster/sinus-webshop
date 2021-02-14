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
          <input type="text" name="name" />
          <label for="short_desc">Product short desc</label>
          <input type="text" name="short_desc" />
          <label for="price">Product Price</label>
          <input type="text" name="price" />
          <label for="serial">Product Serial</label>
          <input type="text" name="serial" />
        </div>
        <div>
          <label for="long_desc">Product Description</label>
          <textarea name="long_desc" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>

    <h1 class="mt-5">Orders</h1>
    <ul>
      <li v-for="(item, index) in orderHistoryOfAllUsers" :key="index">
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
    };
  },
  mounted() {
    this.$store.dispatch("closeAllModals");
    this.$store.dispatch("changeBannerSize", {
      maxHeight: 100,
    });
  },
  methods: {
    logout() {
      location.reload();
    },
    async getAllOrders() {
      let orders = await this.$store.dispatch("getAllOrders");
      this.orderHistoryOfAllUsers = orders;
    },
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
</style>
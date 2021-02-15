<template>
  <section class="wrapper">
    <h1 class="mt-5 mb-4">Admin Products</h1>
    <div class="flex mb-4">
      <span class="light mr-2">Add / Edit</span>
      <hr />
    </div>

    <div class="input-box">
      <div class="columns">
        <div>
          <label class="" for="photo">Product Photo</label>
          <div
            class="input-file-box"
            :style="{ backgroundImage: `url(${selectedProduct.imgFile})` }"
            :data-url="selectedProduct.imgFile"
          >
            <input name="photo" type="file" />
            <!-- todo; fix -->
            <label for="photo">Product Photo</label>
            <input
              name="photo_url"
              type="text"
              v-model="selectedProduct.imgFile"
            />
          </div>
        </div>
        <div>
          <label class="" for="photo">Product Name</label>
          <input type="text" name="title" v-model="selectedProduct.title" />
          <label for="short_desc">Product short desc</label>
          <input
            type="text"
            name="short_desc"
            v-model="selectedProduct.shortDesc"
          />
          <label for="price">Product Price</label>
          <input
            type="number"
            min="0"
            max="99999999999"
            name="price"
            v-model.number="selectedProduct.price"
          />
          <label for="serial">Product Serial</label>
          <input type="text" name="serial" v-model="selectedProduct.serial" />
        </div>
        <div>
          <label class="" for="long_desc">Product Description</label>
          <textarea
            name="long_desc"
            id=""
            cols="30"
            rows="10"
            v-model="selectedProduct.longDesc"
          ></textarea>
          <button
            class="btn-mustard mv-3 mr-3"
            :disabled="patchMode !== 'edit'"
            @click="updateProduct"
          >
            Uppdatera!
          </button>
          <button
            class="btn-mustard mv-3"
            :disabled="patchMode !== 'add'"
            @click="newProduct"
          >
            Spara!
          </button>
        </div>
      </div>
    </div>

    <span>{{ message }}</span>

    <h2 class="mt-3">Products</h2>
    <div class="admin-products" v-for="product in products" :key="product._id">
      <span @click="setSelectedProduct(product)">
        {{ product }}
        <button @click="deleteProduct(product)">ta bort</button>
        <button disabled @click="setSelectedProduct(product)">uppdatera</button>
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
import { randomVersionNumber } from "@/lib/randomizer";
export default {
  metaInfo: {
      // all titles will be injected into this template
      title: 'ADMIN'
    },
  created() {
    if (this.role !== "admin" || !this.authenticated) {
      this.$router.push({ path: "register" });
    }
  },
  data() {
    return {
      orderHistoryOfAllUsers: [],
      selectedProduct: {},
      inputboxImgSource:
        "https://api.jkb.zone/images/de595758ab2eb950942758b2f4f8d8a545b3b82a.XLb6IeF.png",
      inputboxDataUrl: "",
      patchMode: "add",
      message: "",
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
  watch: {
    "selectedProduct.imgFile"() {
      console.log("!!!");
    },
  },
  methods: {
    logout() {
      location.reload();
    },
    async getAllOrders() {
      let res = await this.$store.dispatch("getAllOrders");
      this.orderHistoryOfAllUsers = res;
      return res;
    },
    async loadProductCatalog() {
      let response = await this.$store.dispatch("loadProductsFromDB");
    },
    setSelectedProduct(product) {
      this.patchMode = "edit";
      let rv = randomVersionNumber();
      product.imgFile = this.removeQuestionParameters(product.imgFile);
      // Världens fulhack
      if (this.selectedProduct.imgFile === product.imgFile) {
        product.imgFile = `${product.imgFile}${rv}`;
      }
      this.selectedProduct = product;
    },
    removeQuestionParameters(str) {
      return str.split("?").shift();
    },
    async newProduct() {
      let res = await this.$store.dispatch("addProduct", this.selectedProduct);
      this.selectedProduct = {};
      this.message = res;
    },
    async deleteProduct(product) {
      let res = await this.$store.dispatch("deleteProduct", product._id);
      this.selectedProduct = {};
      this.message = res;
    },
    async updateProduct() {
      let res = await this.$store.dispatch(
        "updateProduct",
        this.selectedProduct
      );
      this.selectedProduct = {};
      this.message = res;
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
.input-box label {
  margin-bottom: 1rem;
}
.admin-products span:hover {
  color: rgba(206, 105, 105, 0.9);
  cursor: pointer;
}
.input-file-box {
  background-repeat: no-repeat;
  background-size: contain;
  overflow: scroll;
  margin: 0.4rem 0;
}
.input-file-box::after {
  content: attr(data-url);
  color: $blood-orange;
}
</style>
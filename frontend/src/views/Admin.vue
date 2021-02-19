<template>
  <section class="wrapper">
    <h1 class="mt-5 mb-4" id="admin-products-header">Admin Products</h1>
    <div class="flex mb-4">
      <span class="light mr-2">Add / Edit</span>
      <hr />
    </div>

    <div class="input-box">
      <div class="columns" style="max-width: 100%; max-height: 100%">
        <div>
          <label class="" for="photo">Product Photo</label>
          <div
            class="input-file-box"
            :style="{ backgroundImage: `url(${selectedProduct.imgFile})` }"
            :data-url="selectedProduct.imgFile"
          >
            <img src="" alt="">
          </div>
            <label for="photo" class="mt-2">Photo url:</label>
            <input
              name="photo_url"
              type="text"
              v-model="selectedProduct.imgFile"
            />
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
          <label for="serial" class="mt-2">Product Serial</label>
          <input type="text" name="serial" v-model="selectedProduct.serial" />
        </div>
        <div>
          <label class="" for="long_desc">Product Description</label>
          <textarea
            name="long_desc"
            id=""
            cols="30"
            rows="10"
            style="resize: none; width: 100%"
            v-model="selectedProduct.longDesc"
          ></textarea>
          <button
            class="btn-mustard mv-3 mr-3"
            :disabled="patchMode !== 'edit'"
            @click="updateProduct"
            id="updateProductButton"
          >
            Spara!
          </button>
          <button
            class="btn-mustard mv-3"
            :disabled="patchMode !== 'add'"
            @click="newProduct"
            id="addProductButton"
          >
            Lägg till!
          </button>
        </div>
      </div>
    </div>

    <span class="p-3">{{ message.message }}</span>

    <section class="admin-products">
      <h1 class="mt-3 mb-4">Products</h1>
      <div class="" v-for="product in products" :key="product._id">
        <span
          @click="
            setSelectedProduct(product);
            topFunction($event);
          "
        >
          <h2>
            {{ product.title }}
          </h2>
          <h3>{{ product.price }} SEK</h3>
          <img
            :src="product.imgFile"
            style="clear: both; float: left"
            class="image-small"
          />
          <p>
            <i> {{ product.shortDesc }}</i>
          </p>
          <p class="desc">
            {{ product.longDesc }}
          </p>
          <button @click="deleteProduct(product)" class="delete-button mb-3">
            ta bort
          </button>
          <button disabled @click="setSelectedProduct(product)">
            uppdatera
          </button>
        </span>
      </div>
    </section>
    <hr />
    <section class="mb-4">
      <h1 class="mt-3 mb-4">Orders</h1>
      <ul>
        <li v-for="(item, index) in orders" :key="index">
          <OrderDescription
            :item="item"
            :index="index"
            :user="item.__match"
          ></OrderDescription>
        </li>
      </ul>
      <div>
        <button class="btn-black m-3" @click="logout">Logout</button>
      </div>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { randomVersionNumber } from "@/lib/randomizer";
import OrderDescription from "@/components/OrderDescription.vue";
export default {
  metaInfo: {
    // all titles will be injected into this template
    title: "ADMIN",
  },
  created() {
    if (this.role !== "admin" || !this.authenticated) {
      this.$router.push({ path: "register" });
    }
  },
  data() {
    return {
      orders: [],
      selectedProduct: {},
      inputboxImgSource:
        "https://api.jkb.zone/images/de595758ab2eb950942758b2f4f8d8a545b3b82a.XLb6IeF.png",
      inputboxDataUrl: "",
      patchMode: "add",
      message: "",
      items: [],
      potentialUser: {},
      // users: [],
    };
  },
  mounted() {
    this.potentialUser = {};
    this.$store.dispatch("closeAllModals");
    this.$store.dispatch("changeBannerSize", {
      maxHeight: 200,
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
      let orders = await this.$store.dispatch("getAllOrders");
      let users = await this.$store.dispatch("getAllUsers");
      for (let order of orders) {
        let isMatch =
          users.find((x) => x.orderHistory.includes(order._id)) || null;
        console.log(isMatch);
        if (!isMatch) {
          continue;
        }
        order.__match = isMatch;
      }
      this.orders = orders;
    },
    async loadProductCatalog() {
      let response = await this.$store.dispatch("loadProductsFromDB");
    },
    setSelectedProduct(product) {
      this.patchMode = "edit";
      this.selectedProduct = product;
    },
    async newProduct() {
      setTimeout(() => {
        this.patchMode = "edit";
      }, 1150);
      let res = await this.$store.dispatch("addProduct", this.selectedProduct);
      this.selectedProduct = {};
      this.message = res;
      await this.loadProductCatalog();
      var element = document.getElementById("addProductButton");
      element.classList.add("btn-success");
    },
    async deleteProduct(product) {
      let res = await this.$store.dispatch("deleteProduct", product._id);
      this.selectedProduct = {};
      this.message = res;
    },
    async updateProduct() {
      setTimeout(() => {
        this.patchMode = "add";
      }, 1150);
      let res = await this.$store.dispatch(
        "updateProduct",
        this.selectedProduct
      );
      this.selectedProduct = {};
      this.message = res;
      var element = document.getElementById("updateProductButton");
      element.classList.add("btn-success");
    },
    topFunction(event) {
      console.log(event, event.target);
      if (event.target.classList.contains("delete-button")) {
        return;
      }
      let target = document.querySelector("#admin-products-header");
      target.scrollIntoView({
        behavior: "smooth",
      });
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
  components: { OrderDescription },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.input-box {
  background-color: $gray-5;
  padding: 1rem;
  display: flex;
  & .input-file-box {
    padding: 1rem;
    border: 0.2rem dotted rgba(255, 255, 255, 0.4);

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

.admin-products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.admin-products > h1 {
  grid-column: 1 / 5;
}
.admin-products .desc {
  font-style: italic;
  font-weight: 300;
  font-size: 1.2rem;
}

.admin-products span:hover {
  color: rgba(206, 105, 105, 0.9);
  cursor: pointer;
}
.input-file-box {
  background-repeat: no-repeat;
  background-size: contain;
  height: 15rem;
  overflow: auto;
  max-width: 30rem;
}
.input-file-box::after {
  // content: attr(data-url);
  color: $blood-orange;
}
</style>
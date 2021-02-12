<template>
  <section class="wrapper">
    <h1 class="mv-5">Order history</h1>
    <article class="">
      <div class="flex mb-4">
        <span class="light mr-2">IN PROGRESS </span>
        <hr />
      </div>
      <ol>
        <li class="mb-2" v-for="(item, index) in allProducts" :key="index">
          <ol>
            <span class="light">Items: </span>
            <span class="text small" v-for="(x, i) in item.items" :key="i">{{ x }}, </span>
          </ol>
          <p>Timestamp: {{ item.timeStamp }}</p>
          <p>Status: {{ item.status }}</p>
          <p>orderValue: {{ item.orderValue }}:-</p>
          <p>_id: {{ item._id }}</p>
        </li>
      </ol>
      <div class="flex mb-4">
        <span class="light mr-2">DONE </span>
        <hr />
      </div>
      <ol>
        <li></li>
      </ol>

      <div>
        <button class="btn-black" @click="logout">Logout</button>
      </div>
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // Sad attempt at security
  beforeCreate() {
    if (!this.$store.state.isAuthenticated) {
      this.$router.push({ path: "register" });
    }
  },
  data() {
    return {};
  },
  methods: {
    async getOrderHistory() {
      await this.$store.dispatch("getUserOrderHistory");
    },
    // Fake logout by refreshing
    logout(){
        location.reload()
    }
  },
  mounted() {
    this.getOrderHistory();
  },
  computed: {
    ...mapGetters(["orderHistory"]),
    allProducts() {
      return this.orderHistory;
    },
  },
};
</script>

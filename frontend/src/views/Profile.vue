<template>
  <section class="wrapper">
    <h1 class="mv-5">Order history</h1>

    <section class="mb-5">
      <div class="flex">
        <span class="light mr-2"
          >IN PROGRESS ({{ ordersInProgress.length }})
        </span>
        <hr />
      </div>
      <ol>
        <li class="mb-2" v-for="(item, index) in ordersInProgress" :key="index">
          <OrderDescription :item="item" :index="index" :user="currentUser"></OrderDescription>
        </li>
      </ol>
    </section>

    <section class="mb-5">
      <div class="flex">
        <span class="light mr-2">DONE ({{ ordersDone.length }}) </span>
        <hr />
      </div>
      <ol>
        <li class="mb-2" v-for="(item, index) in ordersDone" :key="index">
          <ol>
            <span class="light">Items: </span>
            <span class="text small" v-for="(x, i) in item.items" :key="i"
              >{{ x }},
            </span>
          </ol>
          <p>Timestamp: {{ item.timeStamp }}</p>
          <p>Status: {{ item.status }}</p>
          <p>orderValue: {{ item.orderValue }}:-</p>
          <p>_id: {{ item._id }}</p>
        </li>
      </ol>
    </section>

    <section class="mb-5">
      <div class="flex mb-4">
        <span class="light mr-2">PROFILE INFO </span>
        <hr />
      </div>
      <div>
        <span><i>role:</i>{{ currentUser.role }}</span
        ><br />
        <span><i>name:</i>{{ currentUser.name }}</span
        ><br />
        <span><i>email:</i>{{ currentUser.email }}</span
        ><br />
        <span><i>adress:</i>{{ currentUser.adress }}</span
        ><br />
      </div>
    </section>

    <div class="mb-3">
      <button class="btn-black" @click="logout">Logout</button>
    </div>
  </section>
</template>


<script>
import { mapGetters } from "vuex";
import OrderDescription from "@/components/OrderDescription.vue";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "PROFILE",
  },
  // Sad attempt at security
  created() {
    if (this.role !== "customer" || !this.authenticated) {
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
    logout() {
      location.reload();
    },
  },
  mounted() {
    this.$store.dispatch("closeAllModals");
    this.$store.dispatch("changeBannerSize", { maxHeight: 150 });
    this.getOrderHistory();
  },
  computed: {
    ...mapGetters([
      "orderHistory",
      "currentUser",
      "isAuthenticated",
      "userRole",
    ]),
    ordersInProgress() {
      // let orders = this.orderHistory
      if (!Array.isArray(this.orderHistory) || this.orderHistory.length < 1) {
        return [];
      }
      return this.orderHistory.filter((order) =>
        /inProcess/i.test(order.status)
      );
    },
    ordersDone() {
      if (!Array.isArray(this.orderHistory) || this.orderHistory.length < 1) {
        return [];
      }
      return this.orderHistory.filter((order) => /done/i.test(order.status));
    },
    getCurrentUser() {
      return this.currentUser;
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


<style>
</style>
<template>
  <article class="p-3" :class="{ even: index % 2 === 0, odd: index % 2 !== 0 }">
    <summary>
      <h3>{{ formatTimestamp(item.timeStamp) }}</h3>
      <p :class="item.status">{{ item.status }}</p>
      <p>
        <b>{{ item.orderValue }}</b
        ><i> SEK</i>
      </p>
    </summary>

    <transition>
      <details>
        <section class="p-3">
          <h4 class="pv-2">Order id:</h4>
          <p class="ml-3">
            <i>{{ item._id }}</i>
          </p>
          <h4 class="pv-2">Products:</h4>
          <ul class="ml-3" v-for="(x, i) in item.items" :key="i">
            <li>
              <router-link :to="`/products/${x}`">
                <a>{{ x }}</a>
              </router-link>
            </li>
          </ul>

          <h4 class="pv-2">Information:</h4>
          <ul class="ml-3">
            <li>
              <span>{{ user.adress }}</span>
            </li>
            <li>
              <span>{{ user.email }}</span
              ><i class="gg-email"></i>
            </li>
          </ul>
        </section>
      </details>
    </transition>
  </article>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false, // Toggle collapse
    };
  },
  props: {
    item: Object,
    index: {
      type: Number,
      value: 0,
    },
    user: {
      type: Object,
      default: function () {
        return {
          adress: "Not yet implemented for <anonymous> non-users",
          email: "-//-",
        };
      },
    },
  },
  methods: {
    formatTimestamp(timestamp) {
      let date = new Date(timestamp);
      let formatter = new Intl.DateTimeFormat("sv-SE");
      return formatter.format(date);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
summary {
  display: flex;
  justify-content: flex-start;
}
summary > *:not(h3) {
  margin-left: 0.5rem;
}
details {
  cursor: pointer;
}
details section {
  cursor: initial;
}
.tiny {
  font-size: 0.8rem;
}
.in-process,
.inProcess {
  color: $blood-orange-opacity-70;
  font-weight: 800;
}
.done,
.Done {
  color: darkgreen;
  font-weight: 800;
}
.even {
  background-color: $gray-1;
}
.odd {
  background-color: $gray-2;
}
</style>
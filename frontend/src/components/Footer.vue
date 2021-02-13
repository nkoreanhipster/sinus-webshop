<template>
  <footer class="p-4">
    <i>banner_max_height</i>
    <input type="number" minlength="0" maxlength="500" v-model.number="maxHeight" @change="changeSizeOfBanner" />
    <i>banner_min_height</i>
    <input type="number" minlength="0" maxlength="200" v-model.number="minHeight" @change="changeSizeOfBanner" />
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      minHeight: 1,
      maxHeight: 100,
    };
  },
  methods: {
    changeSizeOfBanner(ev) {
      console.log({
        maxHeight: this.maxHeight,
        minHeight: this.minHeight,
      });

      this.$store.dispatch("changeBannerSize", {
        minHeight: this.minHeight,
        maxHeight: this.maxHeight,
      });
    },
  },
  mounted() {
    let { minHeight, maxHeight } = this.$store.getters.bannerSize;
    this.minHeight = minHeight;
    this.maxHeight = maxHeight;
  },
  // computed:{
  //   ...mapGetters(["bannerSize"]),
  //   getBannerSize() {
  //       return  this.bannerSize;
  //   }
  // },
};
</script>

<template>
  <footer class="p-4 columns">
    <section>
      <i>Settings</i>
      <input type="checkbox" v-model="isChecked"/>
      <div class="collapsable" :class="{'is-collapsed':isChecked}">
        <i>banner_max_height</i>
        <input
          type="number"
          minlength="0"
          maxlength="500"
          v-model.number="maxHeight"
          @change="changeSizeOfBanner"
        />
        <i>banner_min_height</i>
        <input
          type="number"
          minlength="0"
          maxlength="200"
          v-model.number="minHeight"
          @change="changeSizeOfBanner"
        />
      </div>
    </section>
    <section></section>
    <section></section>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      minHeight: 1,
      maxHeight: 100,
      isChecked:true,
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
<style lang="scss" scoped>
.collapsable {
  visibility: hidden;
}

.collapsable.is-collapsed {
  visibility: visible;
}
</style>

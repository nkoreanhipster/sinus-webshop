<template>
  <article>
    <div class=""><img :src="product.imgFile" class="image-small" /></div>
    <div class="">
      <h2 v-if="duplicateCount > 1">
        <span>{{ product.title }}</span
        ><i>(x{{ duplicateCount }})</i>
      </h2>
      <h2 v-else>{{ product.title }}</h2>
      <p class="black-60">{{ product.shortDesc }}</p>
      <p class="black-40">{{ product.serial || "000000" }}</p>
    </div>
    <div class="">
      <p>{{ product.price }}</p>
      <p class="m-1 icon-remove" @click="removeItemFromCart"></p>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    // ProductObject från parent
    product: Object,
    // If more than one
    duplicateCount: Number,
  },
  methods: {
    removeItemFromCart() {
      console.log(1);
      this.$store.dispatch("removeFromCart", this.product);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
article {
  display: flex;
  justify-content: space-between;
}
article h2,
p {
  margin: 0.4rem;
}
.icon-remove {
  position: relative;
  width: 3rem;
  height: 3rem;
  border-color: $gray-3;
  cursor: pointer;
  &:hover {
    border-color: $failure;
  }
  &:active,
  &:focus {
    border-color: $gray-5;
  }
}
.icon-remove::after {
  content: "";
  top: 1rem;
  left: 0;
  position: absolute;
  width: 2rem;
  border: 3px solid;
  border-color: inherit;
  transform: rotate(45deg);
}
.icon-remove::before {
  content: "";
  top: 1rem;
  left: 0;
  position: absolute;
  width: 2rem;
  border: 3px solid;
  border-color: inherit;
  transform: rotate(-45deg);
}
</style>
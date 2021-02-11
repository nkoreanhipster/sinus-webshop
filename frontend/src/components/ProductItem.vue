<template>
  <article class="product-item bg-gray-1" @click="goToDetailedView">
    <div class="mb-3">
      <span class="title"> {{ product.title }} SEK </span>
      <span class="text"> {{ product.price }} SEK </span>
    </div>
    <div class="image-medium img-container">
      <img src="~@/assets/bag.svg" class="bag" @click="addToCart(product)" />
      <!--  
        :data-url="`@/assets/${product.imgFile}`"

        -->
      <img
        :src="require(`@/assets/${product.imgFile}`)"
        alt="/images/gallagher-not.found.png"
        class="image blur-in"
      />
    </div>
  </article>
</template>

<script>
export default {
  props: {
    // ProductObject från parent
    product: Object,
  },
  methods: {
    addToCart() {
      this.$store.dispatch("addProductToCart", this.product);
    },
    goToDetailedView() {
      this.$store.dispatch("toggleModal", 'cover');
    },
  },
};
</script>

<style scoped lang="scss">
.product-item {
  user-select: none;
  margin: 0.25rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 100ms ease;
  & div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  &:hover {
    background-color: rgba(0,0,0,0.5);
    cursor: pointer;
  }
  &:active {
    background-color: rgba(102, 148, 64, 0.5);
    cursor: pointer;
  }
}
.img-container {
  position: relative;
  // background-image: "~@/assets/bag.svg";
  // width: 21rem;
  & .image {
    position: relative;
    // top: 0;
    // left: 0;
    // width: 100%;
    // height: auto;
  }

  & .bag {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    cursor: pointer;
    border-radius: 50%;
    width: 3.6rem;
    height: 3.6rem;
    text-align: center;
    padding: 0.3rem;
    background-color: rgba(0,0,0,0.5);
  }
}
.bag:hover {
  color: hotpink;
  background-color: black;
}
</style>
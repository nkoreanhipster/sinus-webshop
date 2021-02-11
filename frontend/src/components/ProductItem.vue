<template>
  <!-- 
        {
          "_id":"GuqDUmEKIx2vQLSq" // generated serverside
          "title"
          "price" {Number}
          "shortDesc"
          "category"
          "longDesc"
          "imgFile"  // Asset logic on clientside
          "serial"{Number}
        }
   -->
  <div class="product-item">
    <img
      :src="product.imgFile"
      @error="$event.target.src = '/images/gallagher-not.found.png'"
    />
    <img src="~@/assets/bag.svg"/>
    <p>{{ product.title }}</p>
    <i>{{ product.price }} SEK</i>

    <p>shortDesc: {{ product.shortDesc }}</p>
    <p>
      <u>countOfDuplicates: {{ product.countOfDuplicates }}</u>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    // ProductObject från parent
    product: Object,
  },
};
</script>

<style>
</style>
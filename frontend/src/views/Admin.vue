<template>
  <section class="wrapper">
    <h1>Admin Products</h1>
    <div class="mb-4">
      <span class="light mr-2">Add / Edit</span>
      <hr />
    </div>

    <h1>Orders</h1>
  </section>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("closeAllModals");
    this.$store.dispatch("changeBannerSize", {
      maxHeight: 100,
    });
  },
};
</script>

<style>
</style>
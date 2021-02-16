<template>
  <ul>
      <li class="mb-3 odd-child-style" v-for="item in orderHistoryOfAllUsers" :key="item._id">
        <p>Time: {{ item.timeStamp }}</p>
        <p>Status: {{ item.status }}</p>
        <p>ID: {{ item._id }}</p>
        <p>Order value: {{ item.orderValue }}</p>
      </li>
    </ul>
</template>

<script>
export default {

}
</script>

<style>
    .odd-child-style li:nth-child(2) {
        color: lime;
}
</style>
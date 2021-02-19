<template>
  <div>
    <label :for="name"></label>
    <input
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
    />
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    type: String,
    placeholder: String,
    value: String,
  },
};
</script>

<template>
  <span class="example-drag-handle">
    <slot></slot>
  </span>
</template>

<script>
// Makeshift handle because the directive doesnt work with vitepress
export default {
  mounted() {
    this.$el.sortableHandle = true;
  },
};
</script>

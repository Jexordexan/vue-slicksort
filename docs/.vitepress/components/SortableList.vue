<template>
  <ul class="example-list">
    <slot />
  </ul>
</template>

<script>
import { ContainerMixin } from '../../../src';
export default {
  mixins: [ContainerMixin],
};
</script>

<style lang="scss" scoped></style>

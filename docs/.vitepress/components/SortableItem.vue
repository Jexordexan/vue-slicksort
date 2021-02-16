<template>
  <li class="example-list-item" :style="{ height: item.height + 'px', background: item.background }">
    <ClientOnly>
      <!-- <span v-drag-handle class="handle" v-if="showHandle"></span> -->
    </ClientOnly>
    {{ item.value }}
  </li>
</template>

<script>
import { ElementMixin } from '../../../src';

export default {
  mixins: [ElementMixin],
  props: {
    item: {
      type: Object,
      required: true,
    },
    showHandle: Boolean,
  },
};
</script>

<style lang="scss" scoped></style>

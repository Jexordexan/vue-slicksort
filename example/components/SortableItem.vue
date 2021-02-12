<template>
  <li class="list-item" :style="{ height: item.height + 'px' }">{{ item.value }}</li>
</template>

<script>
import { ElementMixin } from '../../src';

export default {
  mixins: [ElementMixin],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>

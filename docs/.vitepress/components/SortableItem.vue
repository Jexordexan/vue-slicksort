<template>
  <li
    class="example-list-item"
    :style="{ height: item.height + 'px', background: item.background }"
  >
    <DragHandle v-if="showHandle" class="example-drag-handle" />
    {{ item.value }}
    <button v-if="showHandle" class="doc-button space-start">Add to cart</button>
  </li>
</template>

<script>
import { ElementMixin } from '../../../src'
import DragHandle from './DragHandle.vue'

export default {
  mixins: [ElementMixin],
  components: {
    DragHandle,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    showHandle: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.button {
  margin-left: auto;
}
</style>

<template>
  <li class="list-item" :style="{height: item.height + 'px'}" >
    <span v-handle class="handle" v-if="showHandle"></span>
    {{item.value}}
  </li>
</template>

<script>
export default {
  mixins: [ElementMixin],
  props: ['item', 'showHandle'],
  directives: { handle: HandleDirective },
}
</script>

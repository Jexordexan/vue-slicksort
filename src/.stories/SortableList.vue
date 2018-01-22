<template>
  <ul class="list">
    <slot />
  </ul>
</template>

<script>
import { ContainerMixin } from '../index';

export default {
  mixins: [ContainerMixin]
}
</script>

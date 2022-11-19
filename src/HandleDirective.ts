import { Directive } from 'vue';

// Export Sortable Element Handle Directive
export const HandleDirective: Directive = {
  beforeMount(el) {
    el.sortableHandle = true;
  },
};

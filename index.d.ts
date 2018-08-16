declare module 'vue-slicksort' {
  import Vue, { DirectiveOptions } from 'vue';

  export const ContainerMixin: Vue;
  export const ElementMixin: Vue;

  export const SlickList: Vue;
  export const SlickItem: Vue;

  export const HandleDirective: DirectiveOptions;

  export function arrayMove<T>(
    arr: Array<T>,
    prevIndex: number,
    newIndex: number
  ): Array<T>;
}

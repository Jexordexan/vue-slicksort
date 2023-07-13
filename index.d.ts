declare module 'vue-slicksort' {
  import { DirectiveOptions, Component, Plugin } from 'vue';

  export const ContainerMixin: Component;
  export const ElementMixin: Component;

  export const SlickList: Component;
  export const SlickItem: Component;
  export const DragHandle: Component;

  export const HandleDirective: DirectiveOptions;

  export function arrayMove<T>(arr: Array<T>, prevIndex: number, newIndex: number): Array<T>;

  export const plugin: Plugin;
}

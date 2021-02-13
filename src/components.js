import { h } from 'vue';
import { ElementMixin } from './ElementMixin';
import { ContainerMixin } from './ContainerMixin';

function create (name, defaultTag, mixin) {
  return {
    name,
    mixins: [ mixin ],
    props: {
      tag: {
        type: String,
        default: defaultTag,
      },
    },
    render (h) {
      return h(this.tag, this.$slots.default);
    },
  };
}

export const SlickList = create('slick-list', 'ul', ContainerMixin);
export const SlickItem = create('slick-item', 'li', ElementMixin);

import { ElementMixin } from './ElementMixin';
import { ContainerMixin } from './ContainerMixin';

function create (name, mixin) {
  return {
    name,
    mixins: [ mixin ],
    props: {
      tag: {
        type: String,
        default: 'div',
      },
    },
    render (h) {
      return h(this.tag, this.$slots.default);
    },
  };
}

export const SlickList = create('slick-list', ContainerMixin);
export const SlickItem = create('slick-item', ElementMixin);

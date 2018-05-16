import './Storybook.scss';

import Vue from 'vue';
import { storiesOf } from '@storybook/vue';

import { ContainerMixin, ElementMixin, HandleDirective, SlickItem, SlickList } from '../index';
import SortableItem from './SortableItem.vue'
import SortableList from './SortableList.vue'
import StandaloneList from './Standalone.vue'
import DemoList from './DemoList.vue'
import NestedList from './nested-list-example/OuterList.vue'
import createList from './createList'
import actions from './actions'

document.title = 'Vue Slicksort';

function generateComponent(pageTitle, count, variableHeight = false, sortableProps = {}) {
  return () => ({ 
    render: (h) => h(DemoList, { 
      props: { 
        pageTitle, 
        count, 
        variableHeight, 
        sortableProps 
      } 
    }) 
  })
}

storiesOf('Vertical sorting', module)
  .add('Simple list', generateComponent('Simple list', 10))
  .add('Variable height', generateComponent('Variable height', 10, true))
  .add('Autoscroll', generateComponent('Autoscroll', 100, true))

storiesOf('Optional props', module)
  .add('useDragHandle', generateComponent('Use drag handle', 10, false, { useDragHandle: true}))
  .add('lockAxis', generateComponent('Lock axis', 100, true, { lockAxis: 'y' }))
  .add('helperClass', generateComponent('Stylized helper', 100, true, { helperClass: 'stylizedHelper' }))
  .add('Horizontal list', generateComponent('Simple horizontal list', 10, false, { axis: 'x' }))

storiesOf('Advanced use', module)
  .add('Nested list', () => NestedList)


storiesOf('Standalone components', module)
  .add('Simple list', () => StandaloneList)
## 功能

- **`v-model` Compatible** – 依照 `v-model` 标准让所有数组可编辑
- **Mixin Components** – 使用 `Mixin` 与你现有的组件集成
- **Standalone Components** – 对于简单的列表直接使用现成组件
- **Drag handle, auto-scrolling, locked axis, events, and more!** - 拖拽 handle,自动滚动，坐标轴锁定，事件等等
- **Suuuper smooth animations** – 追逐 60FPS 的梦想 🌈
- **Horizontal lists, vertical lists, or a grid** ↔ ↕ ⤡ - 支持水平列表，垂直列表和网格
- **Touch support** 👌- 支持触控操作
- **Oh yeah, and it's DEPENDENCY FREE!** 👌- 没有依赖其他库

## 安装

使用 [npm](https://www.npmjs.com/package/vue-slicksort):

```
  $ npm install vue-slicksort --save
```

使用 yarn:

```
  $ yarn add vue-slicksort
```

使用 CDN:

```html
<script src="https://unpkg.com/vue-slicksort@latest/dist/vue-slicksort.min.js"></script>
```

然后，使用支持 CommonJS 或者 ES2015 modules 的模块打包工具，例如 [webpack](https://github.com/webpack/webpack):

```js
// 使用类似 Babel 这样的 ES6 编译工具
import { ContainerMixin, ElementMixin } from 'vue-slicksort';

// 不使用 ES6 的编译工具
var slicksort = require('vue-slicksort');
var ContainerMixin = slicksort.ContainerMixin;
var ElementMixin = slicksort.ElementMixin;
```

如果你通过 `<script>` 标签加载：

```html
<script>
  var { ContainerMixin, ElementMixin, HandleDirective } = window.VueSlicksort;
</script>
```

## 用法

### 基础示例

```js
import Vue from 'vue';
import { ContainerMixin, ElementMixin } from 'vue-slicksort';

const SortableList = {
  mixins: [ContainerMixin],
  template: `
    <ul class="list">
      <slot />
    </ul>
  `,
};

const SortableItem = {
  mixins: [ElementMixin],
  props: ['item'],
  template: `
    <li class="list-item">{{item}}</li>
  `,
};

const ExampleVue = {
  name: 'Example',
  template: `
    <div class="root">
      <SortableList lockAxis="y" v-model="items">
        <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item"/>
      </SortableList>
    </div>
  `,
  components: {
    SortableItem,
    SortableList,
  },
  data() {
    return {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],
    };
  },
};

const app = new Vue({
  el: '#root',
  render: (h) => h(ExampleVue),
});
```

就这样！默认情况下，Vue Slickort 不附带任何样式，因为它的目的是在现有组件上做扩展。

## Slicksort components

为了实现两个 mixins 预先设置了两个组件，使用方式如下：

```javascript
import { SlickList, SlickItem } from 'vue-slicksort';

const ExampleVue = {
  name: 'Example',
  template: `
    <div class="root">
      <SlickList lockAxis="y" v-model="items">
        <SlickItem v-for="(item, index) in items" :index="index" :key="index">
          {{ item }}
        </SlickItem>
      </SlickList>
    </div>
  `,
  components: {
    SlickItem,
    SlickList,
  },
  data() {
    return {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],
    };
  },
};
```

## 为什么我要用这个?

现在已经有一些很好的（Drag & Drop）拖放库了（例如, [vuedraggable](https://github.com/SortableJS/Vue.Draggable) 就很棒），如果这些库能满足你的需求，你应该先试一下他们。然而，大部分的库依赖 HTML5 的（Drag & Drop）拖放 API，会有一些严重的兼容或限制问题。例如，如果你需要支持触控设备，再如果你需要锁定只在一个坐标方向上拖动，或者想要在节点进行排序时有动画，这些都会变得很麻烦。Vue Slicksort 提供了一系列简单的组件混入旨在解决之前提到的这些问题。如果你正在寻找一种非常简单、移动友好的方式将可排序功能添加到你的列表中，那么你算是来对地方了。

## 定制化和属性集

你可以在任何使用了 `ContainerMixin` 的组件上应用单一的 `props` 选项，在执行排序期间，该组件还会发出几个事件。下面是一个自定义组件的示例

You apply options as individual `props` on whatever component is using the `ContainerMixin`. The component also emits several events during a sorting operation. Here's an example of a customized component:

```html
<SortableContainer
  :value="items"
  :transitionDuration="250"
  :lockAxis="'y'"
  :useDragHandle="true"
  @sort-start="onSortStart($event)"
>
  <!-- SortableElement 的内容放在这里 -->
</SortableContainer>
```

## `ContainerMixin` 外层容器的 mixin

### Props

#### `value` _(required)_

type: _Array_

`value` 可以从`v-model`继承，但必须设置为 `Container` 里面 `v-for` 遍历的列表相同的列表

#### `axis`

type: _String_

default: `y`

条目能按照水平，垂直，或者网格进行拖动，可选值有: `x`, `y` or `xy`

#### `lockAxis`

type: _String_

当在排序时，你可以按照你的意愿锁定一个坐标轴方向进行移动，这是 HTML5 的 Drag & Drop 做不到的。可选值有: `x`, `y` or `xy`

#### `helperClass`

type: _String_

如果你想给排序中的元素添加一些样式(注意：这个 class 是加给正在排序的那个拖起来的元素的)，可以用这个属性。

#### `appendTo`

type: _String_

default: `body`

如果你想给正在排序的元素指定一个父元素并添加进去，可以使用这个属性，提供一个字符串的 querySelector 即可，默认是添加到 body 中的。

#### `transitionDuration`

type: _Number_

default: `300`

被拖动的元素移动时，其他元素的过渡持续时间（即 transition 属性的 duration）,如果你想把过渡动画取消，可以设置成 0 。

#### `draggedSettlingDuration`

type: _Number_

default: `null`

覆写拖动的元素放开然后到安放位置的动画间隔时间（即放开拖拽后到元素进入安放位置的过渡时间），如果不设置，会按照 `transitionDuration` 的设置。

#### `pressDelay`

type: _Number_

default: `0`

如果你希望元素仅在按下一定时间后才可排序，更改此属性即可。 移动端合理的值是 `200`，此属性不能与 `distance` 一起使用。（这个属性可以用来解决拖动元素上有点击事件，但是点击事件不生效的情况）

#### `pressThreshold`

type: _Number_

default: `5`

忽略 press 事件之前可容忍的运动像素数

#### `distance`

type: _Number_

default: `0`

如果你希望元素仅在拖动一定的像素（即拖动一定距离）后才可排序，可以使用这个属性，此属性不能与 `pressDelay` 一起使用。（这个属性可以用来解决拖动元素上有点击事件，但是点击事件不生效的情况，个人感觉比 pressDelay 更合适）

#### `useDragHandle`

type: _Boolean_

default: `false`

如果你使用的是 `HandleDirective` ，将其设置为 `true`

#### `useWindowAsScrollContainer`

type: _Boolean_

default: `false`

如果需要，可以将 `window` 设置为滚动容器。（只有 `Container` 出现滚动条时才能看出效果）

#### `hideSortableGhost`

type: _Boolean_

default: `true`

控制是否自动隐藏 ghost 元素。默认情况下，为方便起见，Vue Slicksort 列表将自动隐藏当前正在排序的元素。 如果你想应用自己的样式，请将其设置为 false 。

#### `lockToContainerEdges`

type: _Boolean_

default: `false`

你可以将可排序元素的移动锁定到其父容器 `Container`。

#### `lockOffset`

type: _`OffsetValue` or [ `OffsetValue`, `OffsetValue` ]_\*

default: `"50%"`

当 `lockToContainerEdges` 设置为 `true`，这个属性可以控制可排序 helper（即拖起来的那个元素）与其父容器 `Container` 的顶部/底部边缘之间的偏移距离。百分比的值是相对于当前正在排序的项目的高度，如果希望为锁定容器的顶部和底部指定不同的行为，还可以传入一个 `array`（例如：`["0％"，"100％"]`）。

\* `OffsetValue` 可以是有限 `Number` ，也可以是由数字和单位（`px` or `%`）组成的 `String` 。 例如： `10` （与 `"10px"`相同）， `"50%"`

#### `shouldCancelStart`

type: _Function_

default: [Function](https://github.com/Jexordexan/vue-slicksort/blob/main/src/ContainerMixin.js#L41)

该函数在排序开始之前被调用，可以用于编程方式在排序开始之前取消排序。 默认情况下，如果事件目标`input`, `textarea`, `select` 或 `option`，它将取消排序。

#### `getHelperDimensions`

type: _Function_

default: [Function](https://github.com/Jexordexan/vue-slicksort/blob/main/src/ContainerMixin.js#L49)

可选的 `function({node, index, collection})` 返回 SortableHelper 的计算尺寸，有关更多详细信息，请参见[默认实现](https://github.com/Jexordexan/vue-slicksort/blob/main/src/ContainerMixin.js#L49)。

### Events

事件是从 Container 元素发出的，可以使用 `v-bind` 或 `@ `指令绑定。

#### `@sort-start`

emits: `{ event: MouseEvent, node: HTMLElement, index: number, collection: string }`

排序开始时触发。

#### `@sort-move`

emits: `{ event }`

在排序期间移动鼠标时触发。

#### `@sort-end`

emits: `{ event, newIndex, oldIndex, collection }`

排序结束时触发。

#### `@input`

emits: `Array`

在排序结束然后新排序的列表生成后触发。

---

## `ElementMixin`

### Props

#### `index` _(required)_

type: _Number_

这是元素在列表中的排序索引，是必填属性。

#### `collection`

type: _Number or String_

default: `0`

元素所属的集合。如果你在同一 `Container` 中有多组可排序元素，这将很有用。[例子](http://Jexordexan.github.io/vue-slicksort/#/basic-configuration/multiple-lists)

#### `disabled`

type: _Boolean_

default: `false`

元素是否可排序

## `HandleDirective`

`v-handle` 指令在可拖动元素内部使用。（即用了这个指令，可以让拖动只在元素的某个位置生效）

`Container` 必须由 `:useDragHandle` 属性，且设置为 `true` 时才能正常工作。

这里有关于此的一个简单元素的例子

```html
<template>
  <li class="list-item">
    <!-- 拖动只在 span 元素上生效 -->
    <span v-handle class="handle"></span>
    {{item.value}}
  </li>
</template>

<script>
  import { ElementMixin, HandleDirective } from 'vue-slicksort';

  export default {
    mixins: [ElementMixin],
    directives: { handle: HandleDirective },
  };
</script>
```

# FAQ

<!-- ### Running Examples

In root folder:

```
	$ npm install
	$ npm run storybook
``` -->

### Upgrade from v0.x.x

事件名已经全部从驼峰命名更改为中划线分隔（dash-case），以适应内联 HTML 模板。

### Grid support?

需要排序一个网格中的元素？我们已经实现了，将 `axis` 属性设置成 `xy`即可，当前仅限于支持所有格子设置相同宽度和高度的网格。我们会继续努力在不久的未来支持可变宽度的支持

### Item disappearing when sorting / CSS issues （拖动元素消失）

在进行排序时，`vue-slicksort` 创建一个你正在排序的元素的克隆元素（即上面一直提到的 _sortable-helper_ ），然后添加到 `appendTo` 属性设置的标签的末尾。原始的元素会一直在 DOM 中保持在原来的位置直到拖动结束（使用了内联样式使其不可见）。如果从 CSS 角度来看， _sortable-helper_ 出了问题，可能是因为你的 draggable 元素的选择器依赖了一个不存在的父元素（还是刚才说的，因为 _sortable-helper_ 位于 `appendTo` 属性设置的标签的末尾）。也可能是 `z-index` 的问题，例如，在一个 Bootstrap modal（弹框）中使用 `vue-slicksort` ，如果想让 _sortable-helper_ 在弹框中展示出来，你就得增加它的 `z-index` ，来提高层级。

### Click events being swallowed（Click 事件无效）

默认情况，`vue-slicksort` 在 `mousedown` 时立即出发。如果你想要阻止这种行为，有一些现成的方法。你可以在启用排序之前使用 `distance` 属性设置一个触发拖动的最小距离（单位是像素）。也可以在启用排序之前使用 `pressDelay` 增加一个触发拖动的延迟。或者你也可以使用[HandleDirective](https://github.com/Jexordexan/vue-slicksort/blob/main/src/HandleDirective.js)

### Scoped styles

如果你在可排序列表中使用 scoped styles ，你可以使用 `appendTo` 属性。

## Dependencies

Slicksort 无依赖。`vue` 是仅有的前置依赖。

## Example

这里有一个 `vue-slicksort` 的 [demo 项目](https://github.com/qiqihaobenben/vue-slicksort-demo)，可以 down 到本地跑起来，把上面介绍的属性和事件实际用一下。

## Reporting Issues

如果你觉得发现了问题，请 [报告该问题](https://github.com/Jexordexan/vue-slicksort/issues) 以及所有相关详细信息以重现该问题。 提 issue 最简单的方法是 fork 此 [jsfiddle](https://jsfiddle.net/Jexordexan/1puv2L6c/) 。

## Asking for help

如果是个性化的支持请求，请用 `question` 标签标记 issue。

## Contributions

欢迎提交 Feature requests / pull requests 。

## Thanks

这个库很大程度上是基于 Claudéric Demers (@clauderic) 的 [react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc) ，它是一个表现非常好的简单且高效的拖拽库。

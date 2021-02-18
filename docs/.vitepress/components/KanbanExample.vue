<template>
  <div class="kanban-board">
    <h2>{{ kanban.name }}</h2>
    <p>
      This example uses many advanced features at once. You can see the source code
      <a href="https://github.com/Jexordexan/vue-slicksort/blob/docs/docs/.vitepress/components/KanbanExample.vue"
        >here</a
      >.
    </p>
    <ul>
      <li>Nested lists</li>
      <li>Drag and drop</li>
      <li>Grid sort</li>
      <li>Lock axis</li>
      <li>Drag handle</li>
      <li>Helper styles</li>
    </ul>
    <SlickList v-model:list="kanban.columns" axis="x" class="column-container" lock-axis="x" use-drag-handle>
      <SlickItem v-for="(col, i) in kanban.columns" :key="col.id" :index="i" class="kanban-column">
        <header>
          <DragHandle />
          {{ col.name }}
          ({{ col.items.length }})
        </header>
        <SlickList
          v-model:list="col.items"
          axis="xy"
          :group="col.group"
          class="kanban-list"
          helper-class="kanban-helper"
        >
          <SlickItem v-for="(item, j) in col.items" :key="item.id" :index="j" class="kanban-list-item">
            <div class="kanban-list-item-inner">
              {{ item.value }}
            </div>
          </SlickItem>
        </SlickList>
      </SlickItem>
    </SlickList>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { SlickList, SlickItem } from '../../../src';
import DragHandle from './DragHandle.vue';
import { stringsToItems } from './utils';

export default {
  components: {
    SlickList,
    SlickItem,
    DragHandle,
  },
  setup() {
    const kanban = reactive({
      name: 'Kanban Example',
      columns: [
        {
          id: 'todos',
          name: 'To Do',
          group: 'items',
          items: stringsToItems([
            'Vue 3 support',
            'TypeScript support',
            'Cancel dragging',
            'Multiselect',
            'Accessibility',
            'UI Tests',
            'Keyboard navigation',
          ]),
        },
        {
          id: 'inprogress',
          name: 'In Progress',
          group: 'items',
          items: stringsToItems(['Fix drag settling jankiness']),
        },
        {
          id: 'review',
          name: 'Review',
          group: 'items',
          items: stringsToItems([]),
        },
        {
          id: 'done',
          name: 'Done',
          group: 'items',
          items: stringsToItems(['Vue 3 support', 'TypeScript support']),
        },
      ],
    });

    return {
      kanban,
    };
  },
};
</script>

<style lang="scss" scoped>
.kanban-board {
  padding-top: var(--header-height);
  max-width: 1400px;
  margin: auto;
}

.column-container {
  display: flex;
  align-items: start;
}

.kanban-column {
  width: 400px;
  margin: 10px;
  padding: 10px;
  background: #eee;
  border-radius: 20px;

  > header {
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 1.5rem;
    font-weight: bold;
  }
}

.kanban-list {
  max-height: 500px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
}
</style>

<style lang="scss">
.kanban-list-item {
  width: calc(50% - 10px);
  margin: 5px;

  .kanban-list-item-inner {
    min-height: 100px;
    padding: 10px 15px;
    border-radius: 10px;
    background: white;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
    cursor: grab;
    transition: background 0.2s, transform 0.2s;
  }

  &.kanban-helper .kanban-list-item-inner {
    transform: rotate(10deg);
    background: #9b51e0;
    color: white;
  }
}
</style>

<template>
  <div class="groups-example">
    <div class="win-overlay" v-if="showWinScreen">
      <div>
        <h1>Winner!</h1>
        <button class="doc-button" @click="resetList">Reset</button>
      </div>
    </div>
    <div v-for="list in lists" :key="list.id" class="list-wrapper">
      <h4>{{ list.name }}</h4>
      <code>group: '{{ list.group }}'</code>
      <br />
      <code>accept: {{ list.accept }}</code>
      <SortableList
        axis="y"
        :group="list.group"
        :accept="list.accept"
        :block="list.block"
        v-model:list="list.items"
        @sort-end="track('event', 'sort_end', { list_name: 'group_example' })"
        @sort-remove="track('event', 'sort_end', { list_name: 'group_example' })"
      >
        <SortableItem
          v-for="(item, index) in list.items"
          :key="item.id"
          :index="index"
          :item="item"
        />
      </SortableList>
    </div>
  </div>
  <details>
    <summary>v-models</summary>
    <div class="language-js">
      <pre class="lang-js"><code>lists: {{ lists }}</code></pre>
    </div>
  </details>
</template>

<script>
import { ref, watch } from 'vue'
import { random, range, track } from './utils'

import SortableItem from './SortableItem.vue'
import SortableList from './SortableList.vue'

let id = 100

const colors = ['#eb5757', '#9b51e1', '#58cbf2']

const makeList = () => {
  return [
    {
      id: id++,
      name: 'List A',
      group: 'a',
      accept: ['b'],
      items: range(3).map((value) => {
        return {
          value: 'Item ' + (value + 1),
          height: random(49, 100),
          background: colors[value],
          id: id++,
        }
      }),
    },
    {
      id: id++,
      name: 'List B',
      group: 'b',
      accept: true,
      items: range(3).map((value) => {
        return {
          value: 'Item ' + (value + 1),
          height: random(49, 120),
          background: colors[value],
          id: id++,
        }
      }),
    },
    {
      id: id++,
      name: 'List C',
      group: 'c',
      accept: ['b'],
      items: range(3).map((value) => {
        return {
          value: 'Item ' + (value + 1),
          height: random(49, 120),
          background: colors[value],
          id: id++,
        }
      }),
    },
  ]
}

export default {
  name: 'GroupExample',
  props: {
    winScreen: Boolean,
  },
  components: {
    SortableItem,
    SortableList,
  },
  setup(props) {
    const lists = ref(makeList())

    const showWinScreen = ref(false)

    const resetList = () => {
      lists.value = makeList()
      showWinScreen.value = false
      track('event', 'game_reset')
    }

    watch(
      () => lists.value,
      (newValue) => {
        if (!props.winScreen) return
        const mapped = newValue.map((l) => l.items.map((i) => i.value))

        const winning = [
          ['Item 1', 'Item 1', 'Item 1'],
          ['Item 2', 'Item 2', 'Item 2'],
          ['Item 3', 'Item 3', 'Item 3'],
        ]

        if (JSON.stringify(mapped) === JSON.stringify(winning)) {
          showWinScreen.value = true
          confetti.start()
          track('event', 'game_win')

          setTimeout(() => {
            confetti.stop()
          }, 5000)
        }
      },
      {
        deep: true,
      },
    )

    return {
      lists,
      showWinScreen,
      resetList,
      track,
    }
  },
}
</script>

<style scoped>
.groups-example {
  display: flex;
  position: relative;
}

.list-wrapper {
  width: 33%;
}

.win-overlay {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>

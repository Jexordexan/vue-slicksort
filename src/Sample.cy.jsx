import { mount } from '@cypress/vue';
import { SlickList, SlickItem } from './index';
import { ref } from 'vue';

const components = {
  setup() {
    const list = ref([1,2,3]);
    return () => <SlickList v-model:list={list.value} data-cy="list">
      {list.value.map((item, i) => <SlickItem key={item} index={i} data-cy="item">
        Item {item}
      </SlickItem>)}
    </SlickList>;
  },
};

describe('it', () => {
  it('works', () => {
    mount(components);
    cy.get('cy:list cy:item').first().should('contain', 'Item').drag({ x: 80, y: 50 });
    cy.get('cy:list').should('have.text', 'Item 2Item 3Item 1');
  });
});

import { mount } from '@cypress/vue';
import { SlickList, SlickItem } from './';

const wrapper = {
  name: 'Wrapper',
  components: {
    SlickList,
    SlickItem,
  },
  data() {
    return {
      list: ['1', '2', '3'],
    };
  },
  template: `
    <SlickList v-model:list="list" data-cy="list">
      <SlickItem v-for="(item, i) in list" :key="item" :index="i" data-cy="item">
        Item {{ item }}
      </SlickItem>
    </SlickList>
  `,
};

describe('it', () => {
  it('works', () => {
    mount(wrapper);
    cy.get('cy:list cy:item').first().should('contain', 'Item').drag({ x: 80, y: 50 });
    cy.get('cy:list').should('contain', 'Item 2 Item 3 Item 1');
  });
});

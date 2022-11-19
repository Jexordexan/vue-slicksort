// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
Cypress.Commands.add('drag', { prevSubject: 'element' }, (subject, options) => {
  if (options.x && options.y) {
    cy.get(subject).trigger('mousedown', { which: 1 });
    cy.document()
      .trigger('mousemove', {
        pageX: options.x,
        pageY: options.y,
      })
      .trigger('mouseup', { force: true });
  }
});
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
Cypress.Commands.overwrite('get', (originalFn, selector, options) => {
  if (typeof selector === 'string') {
    return originalFn(selector.replace(/cy:(\w+)/g, '[data-cy="$1"]'), options);
  } else {
    return originalFn(selector, options);
  }
});

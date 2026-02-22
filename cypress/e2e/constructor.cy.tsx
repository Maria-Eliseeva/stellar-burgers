describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  describe('добавление ингредиентов в конструктор', () => {
    it('булка', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
        .find('button')
        .click();

      cy.get('[data-cy="burger-constructor"]')
        .contains('Краторная булка N-200i')
        .should('exist');
    });

    it('начинка', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
        .find('button')
        .click();

      cy.get('[data-cy="burger-constructor"]')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });
  });

  describe('модальное окно ингредиента', () => {
    beforeEach(() => {
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]').click();
  });
    it('открытие при клике', () => {
      cy.get('[data-cy="modal"]')
        .should('exist')
    });
    it('отображение правильного ингредиента', () => {
      cy.get('[data-cy="modal"]')
        .should('contain.text', 'Краторная булка N-200i');
    });

    it('закрытие по клику', () => {
      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('закрывается по клику на оверлей', () => {
      cy.get('[data-cy="modal-overlay"]')
        .click({ force: true });

      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });
});

describe('Создание заказа', () => {
beforeEach(() => {
  cy.intercept('**/auth/user', { fixture: 'user.json' }).as('getUser');
  cy.intercept('**/orders', { fixture: 'order.json' }).as('createOrder');

  cy.setCookie('accessToken', 'test-access-token');
  window.localStorage.setItem('refreshToken', 'test-refresh-token');

  cy.visit('/');
});

afterEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

  it('добавляет ингредиенты в конструктор бургера', () => {
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
      .find('button')
      .click();

    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
      .find('button')
      .click();

    cy.get('[data-cy="burger-constructor"]')
      .should('contain.text', 'Краторная булка N-200i')
      .and('contain.text', 'Биокотлета из марсианской Магнолии');
  });

  it('открывает модальное окно с номером заказа при оформлении', () => {
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
      .find('button')
      .click();

    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
      .find('button')
      .click();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-cy="modal"]')
      .should('exist')
      .and('contain.text', '12345');
  });

  it('закрывает модальное окно заказа', () => {
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
      .find('button')
      .click();

    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
      .find('button')
      .click();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('очищает конструктор после успешного оформления заказа', () => {
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
      .find('button')
      .click();

    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
      .find('button')
      .click();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-cy="modal-close"]').click();

    cy.get('[data-cy="burger-constructor"]')
      .should('contain.text', 'Выберите булки')
      .and('contain.text', 'Выберите начинку');
  });
});
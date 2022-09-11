import '@4tw/cypress-drag-drop'

describe('Constructor and DnD Test', () => {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  context('', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
    })

    it('Перетаскивание элементов до авторизации', function () {
      cy.wait(2000);
      cy.get('#Булки > a:nth-child(2)').drag('[class^="burger-constructor"]');

      cy.wait(500);
      cy.get('#Начинки > a:nth-child(2)').drag('[class^="burger-constructor"]');

      cy.wait(500);
      cy.get('#Соусы > a:nth-child(2)').drag('[class^="burger-constructor"]');

      cy.get('button').contains('Оформить заказ').click();

    });

    it('Авторизация', () => {
      cy.visit('http://localhost:3000/login');
      cy.wait(1000);


      cy.url().then(($url) => {
        if ($url.includes('login')) {
          cy.get(':nth-child(2) > .input').type('sbugs@mail.ru');
          cy.get(':nth-child(3) > .input').type('SuperBurger');

          cy.get('button').contains('Войти').click().as('login');
        }
      });
    });

    it('Перетаскивание элементов авторизированного пользователя', function () {
      cy.wait(2000);
      cy.get('#Булки > a:nth-child(2)').drag('[class^="burger-constructor"]');

      cy.wait(500);
      cy.get('#Начинки > a:nth-child(2)').drag('[class^="burger-constructor"]');

      cy.wait(500);
      cy.get('#Соусы > a:nth-child(2)').drag('[class^="burger-constructor"]');

      cy.get('button').contains('Оформить заказ').click();
    });

    it('Открытие и закрытие модального окна с заказом', function () {
      cy.wait(18000);
      cy.get('[class^="modal_close"]').click();
    });

    it('Открытие и закрытие модального окна с ингредиентом', function () {
      cy.wait(2000);
      cy.get('#Булки > a:nth-child(2)').click();
      cy.wait(1000);
      cy.get('[class^="modal_close"]').click();
    });
  })
})
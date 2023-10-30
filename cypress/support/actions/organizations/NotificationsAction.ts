import { testData } from 'cypress/fixtures/variables';
import NotificationsRepository from 'cypress/support/repositories/organizations/NotificationsRepository';

const notificationRepo = new NotificationsRepository();

const notifMap = {
  slack: ['name', 'webhook', 'channel'],
  rocketChat: ['name', 'webhook', 'channel'],
  email: ['name', 'email'],
  teams: ['name', 'webhook'],
  webhook: ['name', 'webhook'],
} as const;

export default class NotificationsAction {
  doAddNotification(notifType: keyof typeof notifMap) {
    const fieldsToFill = notifMap[notifType];

    const optionIndexMap = {
      slack: 0,
      rocketChat: 1,
      email: 2,
      teams: 3,
      webhook: 4,
    };

    notificationRepo.getAddNotification().click();
    cy.get('.react-select__indicator').click({ force: true });

    // Select the option based on the mapping
    cy.get(`#react-select-2-option-${optionIndexMap[notifType]}`).click();

    const data = testData.organizations.notifications[notifType];

    fieldsToFill.forEach(field => {
      cy.get(`.input${field.charAt(0).toUpperCase() + field.slice(1)}`).type(data[field]);
    });

    cy.getBySel('addNotifBtn').click();

    cy.wait(3000);
    // notification name
    cy.get('div.data-table .data-row').should('include.text', data.name);
  }
  doEditNotification() {
    notificationRepo.getLast('link').click();

    cy.get('.inputName').type('-edited');
    cy.get('.inputWebhook').type('-edited');

    cy.getBySel('continueEdit').click();

    cy.wait(3000);
    
    cy.get('div.data-table .data-row').should('include.text', '-edited');
  }
  doDeleteNotification() {
    notificationRepo.getLast('btn-red').click();
    cy.getBySel('confirmDelete').click();

    cy.get('div.data-table .data-row').should('not.have.text', 'msTeams');
  }
}

import { testData } from 'cypress/fixtures/variables';
import GroupAction from 'cypress/support/actions/organizations/GroupsAction';
import UsersActions from 'cypress/support/actions/organizations/UsersAction';
import { aliasMutation, aliasQuery } from 'cypress/utils/aliasQuery';

const users = new UsersActions();
const group = new GroupAction();

describe('Org Users page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    cy.visit(`${Cypress.env().CY_URL}/organizations/99/users`);

    cy.intercept('POST', Cypress.env().CY_API, req => {
      aliasQuery(req, 'getOrganization');
      aliasMutation(req, 'addUserToGroup');
      aliasMutation(req, 'removeUserFromGroup');
      aliasMutation(req, 'addGroupToOrganization');
    });
  });

  it('Creates a group', () => {
    cy.visit(`${Cypress.env().CY_URL}/organizations/99/groups`);
    group.doAddGroup(testData.organizations.groups.newGroupName, testData.organizations.groups.newGroupName2);
  });

  it('Adds a user to the group', () => {
    users.doAddUser(testData.organizations.users.email);
  });

  it('Deletes user', () => {
    users.doDeleteUser(testData.organizations.users.email);
  });

  after(() => {
    cy.visit(`${Cypress.env().CY_URL}/organizations/99/groups`);
    group.doDeleteGroup(testData.organizations.groups.newGroupName);
    group.doDeleteGroup(testData.organizations.groups.newGroupName2);
  });
});

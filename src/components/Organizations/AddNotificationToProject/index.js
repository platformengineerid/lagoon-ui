import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Button from 'components/Button';
import Modal from 'components/Modal';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddNotificationToProject/logic';
import gql from 'graphql-tag';

import { RoleSelect } from '../AddUserToGroup/Styles';
import { AddButtonContent, Footer, StyledNotification, StyledNotificationWrapper } from '../SharedStyles';

const ADD_PROJECT_NOTIFICATION_MUTATION = gql`
  mutation addNotificationToProject(
    $notificationType: NotificationType!
    $notificationName: String!
    $projectName: String!
  ) {
    addNotificationToProject(
      input: { notificationType: $notificationType, notificationName: $notificationName, project: $projectName }
    ) {
      id
    }
  }
`;

const customStyles = {
  content: {
    width: '50%',
  },
};

/**
 * Confirms the deletion of the specified name and type.
 */
export const AddNotificationToProject = ({
  projectName,
  selectedProject,
  options,
  setSelectedProject,
  open,
  openModal,
  closeModal,
  refresh,
}) => {
  return (
    <StyledNotificationWrapper>
      <div className="margins">
        <Button testId='addNotificationToProject' action={openModal}>
          <AddButtonContent>
            <span>+</span>
            <span>Notification</span>
          </AddButtonContent>
        </Button>
      </div>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} style={customStyles}>
        <React.Fragment>
          <Mutation mutation={ADD_PROJECT_NOTIFICATION_MUTATION} onError={e => console.error(e)}>
            {(addNotificationToProject, { called, error, data }) => {
              if (error) {
                return <div>{error.message}</div>;
              }
              if (data) {
                refresh().then(closeModal);
              }
              var ops = [
                ...options.slacks,
                ...options.rocketchats,
                ...options.teams,
                ...options.emails,
                ...options.webhook,
              ];
              var opts = ops.map(group => {
                return {
                  label: group.__typename.split('Notification')[1].toLowerCase() + ': ' + group.name,
                  value: group.__typename.split('Notification')[1].toUpperCase() + ':' + group.name,
                };
              });
              return (
                <StyledNotification>
                  <h4>Add Notification</h4>
                  <label>
                    Notification
                    <RoleSelect>
                      <ReactSelect
                        className="select"
                        menuPortalTarget={document.body}
                        styles={{
                          menuPortal: base => ({ ...base, zIndex: 9999, color: 'black', fontSize: '16px' }),
                          placeholder: base => ({ ...base, fontSize: '16px' }),
                          menu: base => ({ ...base, fontSize: '16px' }),
                          option: base => ({ ...base, fontSize: '16px' }),
                          singleValue: base => ({ ...base, fontSize: '16px' }),
                        }}
                        aria-label="Notification"
                        placeholder="Select a notification..."
                        name="notification"
                        value={opts.find(o => o.value === selectedProject)}
                        onChange={selectedOption => setSelectedProject(selectedOption)}
                        options={opts}
                        required
                      />
                    </RoleSelect>
                  </label>
                  <Footer>
                    <Button
                      testId='addNotificationToProjectConfirm'
                      disabled={called || selectedProject === null}
                      action={() => {
                        addNotificationToProject({
                          variables: {
                            projectName: projectName,
                            notificationType: selectedProject.value.split(':')[0],
                            notificationName: selectedProject.value.split(':')[1],
                          },
                        });
                      }}
                      variant="primary"
                      loading={called}
                    >
                      Add
                    </Button>
                    <Button variant="ghost" action={() => closeModal()}>
                      Cancel
                    </Button>
                  </Footer>
                </StyledNotification>
              );
            }}
          </Mutation>
        </React.Fragment>
      </Modal>
    </StyledNotificationWrapper>
  );
};

export default withLogic(AddNotificationToProject);

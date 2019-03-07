import React from 'react';
import getConfig from 'next/config';
import * as R from 'ramda';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const { publicRuntimeConfig } = getConfig();

const withSelectedTask = withState('selectedTask', 'setSelectedTask', null);
const withOptions = withProps(({ pageEnvironment }) => {
  let options = [
    {
      label: 'Drush cache-clear',
      value: 'DrushCacheClear'
    },
    {
      label: 'Drush sql-sync',
      value: 'DrushSqlSync'
    },
    {
      label: 'Drush rsync',
      value: 'DrushRsyncFiles'
    },
    {
      label: 'Drush sql-dump',
      value: 'DrushSqlDump'
    },
    {
      label: 'Drush archive-dump (D7 only)',
      value: 'DrushArchiveDump'
    }
  ];

  // Remove tasks that are blacklisted.
  options = R.reject(
    option =>
      R.contains(option.value, publicRuntimeConfig.LAGOON_UI_TASK_BLACKLIST),
    options
  );

  // Currently all tasks require the environment to have a 'cli' service,
  // but this can be made dynamic if that changes.
  if (
    pageEnvironment.services.findIndex(service => service.name === 'cli') === -1
  ) {
    options = [];
  }

  return { options };
});
const withNewTaskHanders = withHandlers({
  onCompleted: ({ setSelectedTask }) => () => {
    setSelectedTask('Completed');
  },
  onError: ({ setSelectedTask }) => () => {
    setSelectedTask('Error');
  }
});

const withProjectEnvironments = BaseComponent =>
  class GetProjectEnvironments extends React.Component {
    query = gql`
      query getProject($name: String!) {
        projectByName(name: $name) {
          id
          productionEnvironment
          environments {
            id
            name
            environmentType
          }
        }
      }
    `;

    render() {
      const { pageEnvironment } = this.props;
      return (
        <Query
          query={this.query}
          variables={{ name: pageEnvironment.project.name }}
        >
          {({ loading, error, data }) => {
            if (loading || error) {
              return null;
            }
            const allEnvironments = data.projectByName.environments;

            return (
              <BaseComponent
                projectEnvironments={allEnvironments}
                {...this.props}
              />
            );
          }}
        </Query>
      );
    }
  };

export default compose(
  withSelectedTask,
  withNewTaskHanders,
  withOptions,
  withProjectEnvironments
);

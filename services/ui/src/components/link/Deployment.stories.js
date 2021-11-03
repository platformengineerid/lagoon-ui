import React from 'react';
import mocks, { seed } from 'mock_data/mocks';
import DeploymentLink from './Deployment';

export default {
  component: DeploymentLink,
  title: 'Components/link/DeploymentLink',
};

seed();
const deployment = mocks.Deployment();

export const Default = () => (
  <DeploymentLink
    deploymentName={deployment.name}
    environmentSlug={deployment.environment.openshiftProjectName}
    projectSlug={deployment.environment.project.name}
  >
    Deployment link
  </DeploymentLink>
);

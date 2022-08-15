import React from 'react';
import ProblemsDashboardByProjectPageHexDisplay from 'pages/problems';
import AllProjectsProblemsQuery from 'lib/query/AllProjectsProblems';
import mocks from 'mock_data/mocks';

export default {
  component: ProblemsDashboardByProjectPageHexDisplay,
  title: 'Pages/ProblemsDashboard',
  parameters: {
    layout: 'fullscreen',
  }
}

const projects_problems = mocks.Query().allProjects();
const projectsProblems = [
  {
    request: {
      query: AllProjectsProblemsQuery,
      variables: {
        severity: ['CRITICAL'],
        source: [],
        envType: 'PRODUCTION'
      }
    },
    result: {
      data: {
        projectsProblems: projects_problems,
      },
    },
  },
];

export const all_problems = () => <ProblemsDashboardByProjectPageHexDisplay />;
all_problems.parameters = {
  apolloClient: {
    mocks: projectsProblems,
    addTypename: false
  },
};
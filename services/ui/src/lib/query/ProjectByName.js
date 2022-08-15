import gql from 'graphql-tag';
import FactsFragment from 'lib/fragment/Fact';

export default gql`
  query getProject($name: String!){
    project: projectByName (name: $name){
      id
      name
      branches
      pullrequests
      created
      gitUrl
      productionEnvironment
      standbyProductionEnvironment
      developmentEnvironmentsLimit
      environments {
        id
        name
        created
        updated
        deployType
        environmentType
        openshiftProjectName
        route
        deployments {
          created
          completed
        }
        facts {
          ...factFields
        }
      }
    }
  }
  ${FactsFragment}
`;

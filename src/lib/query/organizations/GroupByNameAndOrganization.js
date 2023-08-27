import gql from 'graphql-tag';

export default gql`
  query getGroup($name: String!, $organization: Int!) {
    group: groupByNameAndOrganization(name: $name, organization: $organization){
      id
      name
      type
      projects {
        id
        name
      }
      members{
        role
        user{
          email
          comment
        }
      }
    }

    organization: organizationById (organization: $organization){
      id
      name
      description
      quotaProject
      quotaGroup
      quotaNotification
      deployTargets{
        id
        name
      }
      projects {
        id
        name
      }
    }
  }
`;

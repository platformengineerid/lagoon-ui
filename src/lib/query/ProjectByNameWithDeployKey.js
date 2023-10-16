import gql from 'graphql-tag';

export default gql`
  query getProject($name: String!) {
    project: projectByName(name: $name) {
      id
      name
      publicKey
    }
  }
`;

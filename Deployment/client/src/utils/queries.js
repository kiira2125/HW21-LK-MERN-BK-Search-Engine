import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    users {
      _id
      username
    }
  }
`;

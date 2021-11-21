import { gql } from '@apollo/client';

export const GET_USER = gql`
  query {
    getSingleUser {
      username
      email
      savedBooks {
        title
        description
        bookId
        image
        link
        authors
      }
    }
  }
`;
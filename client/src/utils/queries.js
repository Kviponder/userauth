const { gql } = require("@apollo/client");

export const QUERY_ME = gql`
  query Me {
    me {
      username
      email
      _id
    }
  }
`;
export const QUERY_USER = gql`
  query User($id: ID!) {
    User(_id: $id) {
      username
      email
      _id
    }
  }
`;
export const QUERY_USERS = gql`
  query Users {
    Users {
      username
      email
      _id
    }
  }
`;

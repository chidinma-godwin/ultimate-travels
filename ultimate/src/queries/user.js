import gql from "graphql-tag";

const loginMutation = gql`
  mutation($email: String!, $password: String!, $token: String!) {
    signIn(email: $email, password: $password, token: $token) {
      ok
      user {
        id
        username
        email
      }
      errors {
        path
        message
      }
    }
  }
`;

const signUpMutation = gql`
  mutation(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $token: String!
  ) {
    signUp(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      token: $token
    ) {
      ok
      user {
        id
        username
        email
      }
      errors {
        path
        message
      }
    }
  }
`;

export { loginMutation, signUpMutation };

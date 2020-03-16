import gql from "graphql-tag";

const getTravelers = gql`
  query {
    allTravelers {
      id
      firstName
      middleName
      lastName
      dateOfBirth
      title
      email
      phoneNum
      createdAt
    }
  }
`;

const addTraveler = gql`
  mutation addTraveler($input: TravelerInfo!) {
    addTraveler(input: $input) {
      id
      firstName
      middleName
      lastName
      dateOfBirth
      title
      email
      phoneNum
      createdAt
    }
  }
`;

export { getTravelers, addTraveler };

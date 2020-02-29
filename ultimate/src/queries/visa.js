import gql from "graphql-tag";

const getVisaRequests = gql`
  query {
    allVisaRequest {
      id
      firstName
      middleName
      lastName
      title
      gender
      dateOfBirth
      status
      phone
      nationality
      employmentStatus
      address
      departureDate
      returnDate
      travelHistory
      destination
      # selectedFile
      passportExpiryDate
      passportNum
      createdAt
    }
  }
`;

const addVisaRequest = gql`
  mutation addVisaRequest($input: VisaRequestInfo!) {
    addVisaRequest(input: $input) {
      id
      firstName
      middleName
      lastName
      title
      gender
      dateOfBirth
      status
      phoneNum
      email
      nationality
      employmentStatus
      address
      departureDate
      returnDate
      travelHistory
      destination
      passportExpiryDate
      passportNum
      createdAt
      # selectedFile
    }
  }
`;

export { getVisaRequests, addVisaRequest };

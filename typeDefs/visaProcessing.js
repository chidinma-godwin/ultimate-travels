const { gql } = require("apollo-server-express");

const visaProcessing = gql`
  extend type Query {
    visaProcessing(id: ID!): VisaDetails
  }

  extend type Query {
    allVisaRequest: [VisaDetails]
  }

  extend type Mutation {
    addVisaRequest(input: VisaRequestInfo!): VisaDetails
  }

  input VisaRequestInfo {
    firstName: String!
    middleName: String!
    lastName: String!
    title: String!
    gender: String!
    dateOfBirth: String!
    status: String!
    phoneNum: String!
    email: String!
    nationality: String!
    employmentStatus: String!
    address: String!
    departureDate: String!
    returnDate: String!
    travelHistory: String!
    destination: String!
    passportExpiryDate: String!
    passportNum: String!
    # selectedFile: String!
  }

  type VisaDetails {
    id: ID!
    firstName: String!
    middleName: String!
    lastName: String!
    title: String!
    gender: String!
    dateOfBirth: String!
    status: String!
    phoneNum: String!
    email: String!
    nationality: String!
    employmentStatus: String!
    address: String!
    departureDate: String!
    returnDate: String!
    travelHistory: String!
    destination: String!
    passportExpiryDate: String!
    passportNum: String!
    createdAt: String!
    # selectedFile: File!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;

module.exports = visaProcessing;

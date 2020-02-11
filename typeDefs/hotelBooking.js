const { gql } = require("apollo-server-express");

const hotelBooking = gql`
  extend type Query {
    hotelBooking(input: GuestInfo): BookingConfirmation
  }

  input GuestInfo {
    data: GuestDataType
  }

  input GuestType {
    name: GuestName
    contact: GuestContact
  }

  input GuestName {
    title: String
    firstName: String
    lastName: String
  }

  input GuestContact {
    phone: String
    email: String
  }

  input GuestPaymentCardType {
    vendorCode: String
    cardNumber: String
    expiryDate: String
  }

  input GuestPaymentType {
    method: String
    card: GuestPaymentCardType
  }

  input GuestDataType {
    offerId: String
    guests: [GuestType]
    payments: [GuestPaymentType]
  }

  type BookingConfirmation {
    data: [BookingConfirmationResponse]
  }

  type BookingConfirmationResponse {
    type: String
    id: String
    providerConfirmationId: String
  }
`;

module.exports = hotelBooking;

import getPlacesQuery from "./places";
import getFlightDetails from "./flightDetails";
import checkOfferQuery from "./checkOffer";
import getInspirationPlaces from "./flightInspiration";
import { getTravelers, addTraveler } from "./traveler";
import { getVisaRequests, addVisaRequest } from "./visa";
import { getHotels, getHotelOffers } from "./hotel";
import {
  tourAvailabilityQuery,
  tourDetailsQuery,
  saveTourToDatabase,
  getToursFromDatabase,
  removeTourMutation,
} from "./tour";
import { loginMutation, signUpMutation } from "./user";

export {
  getPlacesQuery,
  getFlightDetails,
  checkOfferQuery,
  getInspirationPlaces,
  getTravelers,
  addTraveler,
  addVisaRequest,
  getVisaRequests,
  getHotels,
  getHotelOffers,
  tourAvailabilityQuery,
  tourDetailsQuery,
  saveTourToDatabase,
  getToursFromDatabase,
  removeTourMutation,
  loginMutation,
  signUpMutation,
};

import gql from "graphql-tag";

const getPlacesQuery = gql`
  query($keyword: String!) {
    places(keyword: $keyword) {
      subType
      name
      id
      iataCode
      address {
        cityName
        countryName
      }
    }
  }
`;
export default getPlacesQuery;

import gql from "graphql-tag";

const tourAvailabilityQuery = gql`
  query($name: String!, $page: Int) {
    Tour(name: $name, page: $page) {
      count
      results {
        id
        name
      }
    }
  }
`;

const tourDetailsQuery = gql`
  query($id: ID!) {
    TourDetails(id: $id) {
      id
      name
      slug
      description
      details {
        body
        detail_type {
          id
          label
        }
      }
      advertised_departures {
        room
        previous_amount
        currency
        amount
        promotion {
          id
          name
        }
      }
      geography {
        region {
          id
          name
        }
        primary_country {
          id
          name
        }
        visited_countries {
          id
          name
        }
      }
    }
  }
`;

export { tourAvailabilityQuery, tourDetailsQuery };

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
      images {
        type
        image_href
      }
      description
      details {
        body
        detail_type {
          id
          label
        }
      }
      site_links {
        type
        href
      }
      advertised_departures {
        currency
        amount
      }
      geography {
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

const saveTourToDatabase = gql`
  mutation($input: [TourInput]) {
    saveTour(input: $input) {
      ok
    }
  }
`;

const getToursFromDatabase = gql`
  query {
    getDatabaseTours {
      id
      name
      slug
      images {
        type
        image_href
      }
      description
      details {
        body
        detail_type {
          id
          label
        }
      }
      site_links {
        type
        href
      }
      advertised_departures {
        currency
        amount
      }
      geography {
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

const removeTourMutation = gql`
  mutation($id: ID!) {
    removeTour(id: $id)
  }
`;

export {
  tourAvailabilityQuery,
  tourDetailsQuery,
  saveTourToDatabase,
  getToursFromDatabase,
  removeTourMutation
};

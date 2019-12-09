import { gql } from "apollo-boost";

const getPlacesQuery = gql`
    query($search: String){
        places(search: $search){
            PlaceId
            PlaceName
            CityId
        }
    }
`;

export{getPlacesQuery};

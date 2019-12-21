import React from "react";
import { Container } from "react-bootstrap";
import { ApolloConsumer, Query } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { getSessionKey } from "../../queries/queries";

function ShowQuery({ location }) {
  const {userData}=location.state;
  const { loading, error, data } = useQuery(getSessionKey, {
    variables: {
      cabinClass: userData.cabin,
      children: userData.children.toString(),
      infants: userData.infants.toString(),
      country: "NG",
      currency: "NGN",
      locale: "en-GB",
      originPlace: userData.fromSelectedOption[0].CityId,
      destinationPlace: userData.toSelectedOption[0].CityId,
      outboundDate: userData.date,
      adults: userData.adults.toString()
    }
  });
  if (loading) return "loading data";
  if (error) {
    console.log(error);
    return "Please fill the flight form";
  }
  console.log(userData);
  console.log(data);
  return ("it is working");
}

// class ShowQuery extends React.Component {
//   constructor() {
//     super();
//     this.state = {};
//   }

//   render() {
//     let { userData } = this.props.location.state;
//     console.log(userData);

//     return (
//       <React.Fragment>
//         <Query
//           query={getSessionKey}
//           variables={{
//             cabinClass: userData.cabin,
//             children: userData.children.toString(),
//             infants: userData.infants.toString(),
//             country: "NG",
//             currency: "NGN",
//             locale: "en-GB",
//             originPlace: userData.fromSelectedOption[0].CityId,
//             destinationPlace: userData.toSelectedOption[0].CityId,
//             outboundDate: userData.date,
//             adults: userData.adults.toString()
//           }}
//         >
//           {({ loading, error, data }) => {
//             if (loading) return "loading data";
//             if (error) {
//               console.log(error);
//               return "Please fill the flight form";
//             }
//             console.log(data);
//             // return (
//             //   client
//             //     .query({
//             //       query: getSessionKey,
//             //       variables: {
//             //         cabinClass: userData.cabin,
//             //         children: userData.children.toString(),
//             //         infants: userData.infants.toString(),
//             //         country: "NG",
//             //         currency: "NGN",
//             //         locale: "en-GB",
//             //         originPlace: userData.fromSelectedOption[0].CityId,
//             //         destinationPlace: userData.toSelectedOption[0].CityId,
//             //         outboundDate: userData.date,
//             //         adults: userData.adults.toString()
//             //       }
//             //     })
//             //     .then(res => {
//             //       //data = res;
//             //       console.log(res);
//             //       // console.log(data);
//             //     })
//             //     .catch(err => {
//             //       console.log(err);
//             //     })
//             // )

//             return <Container>"It worked"</Container>;
//           }}
//         </Query>
//       </React.Fragment>
//     );
//   }
// }

export default ShowQuery;

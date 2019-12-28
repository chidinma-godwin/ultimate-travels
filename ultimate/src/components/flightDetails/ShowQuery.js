import React from "react";
import { Container } from "react-bootstrap";
import { Query } from "react-apollo";
import { getFlightDetails } from "../../queries/queries";

class ShowQuery extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    let { sessionKey } = this.props.location.state;
    this.state = {
      sessionKey: sessionKey
    };
  }

  // componentDidMount() {
  //   const userInfo = {
  //     cabinClass: this.state.userData.cabin,
  //     children: this.state.userData.children.toString(),
  //     infants: this.state.userData.infants.toString(),
  //     country: "NG",
  //     currency: "NGN",
  //     locale: "en-GB",
  //     originPlace: this.state.userData.fromSelectedOption[0].CityId,
  //     destinationPlace: this.state.userData.toSelectedOption[0].CityId,
  //     outboundDate: this.state.userData.date.toISOString().split("T")[0],
  //     inboundDate: "2020-01-30",
  //     adults: this.state.userData.adults.toString()
  //   };
  //   axios
  //     .post('http://localhost:5000/skyscanner/', userInfo)
  //     .then(res => {
  //       console.log(res.data);
  //       this.setState({
  //         sessionKey: res.data.split("/")[-1]
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  render() {
    console.log(this.state.sessionKey);

    return (
       <Query
         query={getFlightDetails}
         variables={{ sessionKey: this.state.sessionKey }}
       >
         {result => {
           if (result.loading) return "loading data";
           if (result.error) {
             console.log(result.error);
             return "Please fill the flight form";
           }
           console.log(result.data);

          return <Container>"It worked"</Container>
         }}
       </Query>
    );
  }
}

export default ShowQuery;

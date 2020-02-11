import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import buildGraphQLProvider from "ra-data-graphql-simple";

// const introspectionOptions = {
//   include: ["Traveler", "allTravelers"]
// };

class AdminPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      dataProvider: null
    };
  }

  componentDidMount() {
    buildGraphQLProvider({
      clientOptions: { uri: "http://localhost:5000/graphql" }
    }).then(dataProvider => this.setState({ dataProvider }));
  }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return <div>Loading</div>;
    }
    return (
      <Admin dataProvider={dataProvider}>
        {/* ? <Resource name="allTravelers" list={ListGuesser} /> */}
      </Admin>
    );
  }
}

export default AdminPanel;

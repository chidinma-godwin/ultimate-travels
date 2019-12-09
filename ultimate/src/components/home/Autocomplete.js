import React from "react";
import { ApolloConsumer, Query } from "react-apollo";
import { getPlacesQuery } from "../../queries/queries";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

class Autoconplete extends React.Component {
  constructor() {
    super();
    this.state = {
      allowNew: false,
      multiple: false,
      isLoading: false,
      options: []
    };
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={getPlacesQuery}>
            {() => {
              return (
                <AsyncTypeahead
                  {...this.state}
                  id="from"
                  labelKey="PlaceName"
                  isLoading={this.state.isLoading}
                  minLength={2}
                  // onSelect={this.onSelect}
                  onSearch={value => {
                    this.setState({ isLoading: true });
                    client
                      .query({
                        query: getPlacesQuery,
                        variables: { search: value }
                      })
                      .then(res => {
                        this.setState({
                          isLoading: false,
                          options: res.data.places ? res.data.places : []
                        });
                      })
                      .catch(err=> {
                          console.log(err);
                      });
                  }}
                  placeholder="Enter city name"
                //  ref={(ref) => this._typeahead = ref}
                  options={this.state.options}
                ></AsyncTypeahead>
              );
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

export default Autoconplete;

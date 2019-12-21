import React from "react";
import { ApolloConsumer, Query } from "react-apollo";
import { getPlacesQuery } from "../../queries/queries";
import { FormControl } from 'react-bootstrap';
import { AsyncTypeahead } from "react-bootstrap-typeahead";

class Autocomplete extends React.Component {
  constructor() {
    super();
    this.state = {
      allowNew: false,
      multiple: false,
      isLoading: false,
      useCache: true,
      //selected: [],
      options: []
    };
  }

  onChange = selected => {
    let selectedOption = selected;
    this.setState({ selected });
    this.props.handleAsyncChange(selectedOption);
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={getPlacesQuery}>
            {({ loading, error, data }) => {
              if(loading) {
                return (
                  <FormControl
                   // id="from"
                    className="form-control-sm"
                    placeholder="Enter city name or airport"
                    aria-describedby="basic-addon1"
                  />
                )
              }
              // if(error) {
              //   return "Error loading data, Please refresh the page"
              // }
              
              return (
                <AsyncTypeahead
                  {...this.state}
                  id="from"
                  labelKey="PlaceName" //{option=> `${option.PlaceName} ${option.CityId}`}
                  isLoading={this.state.isLoading}
                  minLength={2}
                  selectHintOnEnter
                  bsSize="small"
                  onChange={this.onChange}
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
                          options: res.data.places.push({
                            PlaceId: "MUR-sky",
                            PlaceName: "Murtala Mohammed Int'l airport, Lagos",
                            CityId: "LOSA-sky"
                          })
                            ? res.data.places
                            : []
                        });
                      })
                      .catch(err => {
                        console.log(err)
                      })
                  }}
                  placeholder="Enter city name"
                  selected={this.state.selected}
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

export default Autocomplete;

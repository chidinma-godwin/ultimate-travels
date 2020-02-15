import React from "react";
import { ApolloConsumer } from "react-apollo";
import { getPlacesQuery } from "../../../../../queries/queries";
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

  onKeyUp = evt => {
    console.log(evt);
    let key = evt.keyCode || evt.charCode;

    if (key == 8 || key == 46) {
      evt.target.select();
      console.log(true);
    }
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <AsyncTypeahead
            {...this.state}
            id="from"
            labelKey={option => `${option.name} (${option.iataCode})`}
            isLoading={this.state.isLoading}
            minLength={2}
            selectHintOnEnter
            bsSize="small"
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
            onSearch={async value => {
              this.setState({ isLoading: true });
              await client
                .query({
                  query: getPlacesQuery,
                  variables: { keyword: value }
                })
                .then(res => {
                  console.log(res.data);
                  this.setState({
                    isLoading: false,
                    options: res.data.places ? res.data.places : []
                    // options: res.data.places.push({
                    //   PlaceId: "MUR-sky",
                    //   PlaceName: "Murtala Mohammed Int'l airport, Lagos (LOS)",
                    //   CityId: "LOSA-sky"
                    // })
                    //   ? res.data.places
                    //   : []
                  });
                })
                .catch(err => {
                  console.log("there is an error");
                  console.log(err);
                });
            }}
            placeholder="Enter city name"
            selected={this.state.selected}
            //  ref={(ref) => this._typeahead = ref}
            options={this.state.options}
          ></AsyncTypeahead>
        )}
      </ApolloConsumer>
    );
  }
}

export default Autocomplete;

import React from 'react';
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';
const AsyncTypeahead = asyncContainer(Typeahead);

class AsyncAutocomplete extends React.Component {
    constructor() {
        super();
        this.state= {
            allowNew: false,
            multiple: false,
            isLoading: false,
            options: []
        }
    }

    render() {
        return(
            <React.Fragment>
                <AsyncTypeahead 
                    id="autocomplete"
                    labelKey="PlaceName"
                    isLoading={this.state.isLoading}
                    minLength={2}
                    onSearch={query=> {
                        this.setState({isLoading: true});
                        axios.get("http://localhost:4000/api/flights/"+query)
                        .then(res=>　{
                            this.setState({
                                isLoading: false,
                                options: res.data
                            })
                        })
                        .catch(err=> console.log(err));
                    }}
                    options={this.state.options}
                    placeholder="Enter city or airport"
                    // renderMenuItemChildren={(option, props, id) => (
                    //     <Highlighter search={props.text}>
                    //       {option[props.labelKey]}
                    //     </Highlighter>
                    //)}
                />
            </React.Fragment>
        )
    }
}

export default AsyncAutocomplete;
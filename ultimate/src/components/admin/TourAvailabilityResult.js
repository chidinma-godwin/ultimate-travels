import React from "react";
import { Table, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class TourAvailabilityResult extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTour: [],
      redirect: null
    };
  }

  onChange = evt => {
    const { name, checked } = evt.target;
    console.log(checked, name);
    this.setState(prevState => {
      // Add selected tour to tour list
      let joinedData = [];
      if (checked) joinedData = prevState.selectedTour.concat(name);
      if (!checked)
        joinedData = prevState.selectedTour.filter(tour => tour !== name);

      // Remove duplicates
      let uniqueJoinedData = Array.from(new Set(joinedData));
      return {
        selectedTour: uniqueJoinedData
      };
    });
  };

  searchTour = () => {
    const { selectedTour } = this.state;
    this.setState({ redirect: `/admin/search-tour/${selectedTour.join("/")}` });
  };

  render() {
    let { selectedTour, redirect } = this.state;
    let { dataArray } = this.props;
    console.log(selectedTour);

    if (redirect) {
      return <Redirect push to={redirect} />;
    }
    return (
      <React.Fragment>
        <p style={{ textAlign: "left", fontWeight: "bold" }}>
          {dataArray.length} results found
        </p>
        {dataArray.length && (
          <>
            <Table style={{ backgroundColor: "#fff" }} bordered>
              <thead>
                <tr>
                  <th>Tour ID</th>
                  <th>Tour name</th>
                  <th>Choose</th>
                </tr>
              </thead>
              <tbody>
                {dataArray.map(({ id, name }, i) => {
                  return (
                    <tr key={i}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          name={id}
                          onChange={this.onChange}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Form>
              {selectedTour.length ? (
                <Form.Control
                  plaintext
                  readOnly
                  className="selected-tour"
                  value={selectedTour.join(", ")}
                  label="Selected tour"
                />
              ) : null}
              <Button
                onClick={this.searchTour}
                disabled={selectedTour.length === 0}
              >
                Search
              </Button>
            </Form>
          </>
        )}
      </React.Fragment>
    );
  }
}

export default TourAvailabilityResult;

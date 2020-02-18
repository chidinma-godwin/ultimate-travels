import React from "react";
import { Table, Button } from "react-bootstrap";

class HotelResultHeading extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null
    };
  }

  render() {
    let info = this.props.userInfo;

    return (
      <Table
        borderless
        responsive
        size="sm"
        style={{
          backgroundColor: "#dee2e6",
          padding: "1.5em",
          marginTop: "1.5em",
          marginBottom: "1.5em"
        }}
      >
        <thead>
          <tr>
            <th>Destination</th>
            <th>Check in date</th>
            <th>Check out date</th>
            <th>Number of rooms</th>
            <th>Adults</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{info.from.name}</td>
            <td>{info.checkIn.toISOString().split("T")[0]}</td>
            <td>{info.checkOut.toISOString().split("T")[0]}</td>
            <td>{info.rooms}</td>
            <td>{info.adults}</td>
            <td>
              <Button>Modify Search</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default HotelResultHeading;

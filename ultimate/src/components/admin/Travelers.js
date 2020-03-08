import React from "react";
import { Row, Col, Card, Table } from "react-bootstrap";

class Travelers extends React.Component {
  constructor(props) {
    super(props);
    let allTravelers = this.props.data;
    this.state = {
      allTravelers
    };
  }

  render() {
    const { allTravelers } = this.state;
    return (
      <>
        <Row>
          <Col md="12">
            <Card className="mt-5">
              <Card.Body>
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Middle Name</th>
                      <th>Last Name</th>
                      <th>DOB</th>
                      <th>Email</th>
                      <th>Phone no.</th>
                      <th>Date Booked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTravelers.map((traveler, index) => {
                      return (
                        <tr key={traveler.id}>
                          <td>{Number(index) + 1}</td>
                          <td>{traveler.firstName[0][1]}</td>
                          <td>{traveler.middleName[0][1]}</td>
                          <td>{traveler.lastName[0][1]}</td>
                          <td>{traveler.dateOfBirth[0][1]}</td>
                          <td>{traveler.email}</td>
                          <td>{traveler.phoneNum}</td>
                          <td>{traveler.createdAt}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default Travelers;

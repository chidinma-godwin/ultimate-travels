import React from "react";
import { Row, Col, Card, Table } from "react-bootstrap";

const TablesPage = () => {
  return (
    <>
      <Row>
        <Col md="12">
          <Card className="mt-5">
            {/* <MDBView className="gradient-card-header blue darken-2">
              <h4 className="h4-responsive text-white">Basic tablesPage</h4>
            </MDBView> */}
            <Card.Body>
              <h3 className="mt-5 text-left">
                <strong>Basic examples</strong>
              </h3>
              <p>
                Using the most basic table markup, here’s how .table-based
                tablesPage look in Bootstrap. All table styles are inherited in
                Bootstrap 4, meaning any nested tablesPage will be styled in the
                same manner as the parent.
              </p>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First</th>
                    <th>Last</th>
                    <th>Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
              <h3 className="mt-5 text-left">
                <strong>Table head options</strong>
              </h3>
              <p>
                To change a background-color of thead (or any other element) use
                our color classes. If you are going to use a dark background you
                should also consider white text (to provide a proper contrast)
                by adding .text-white class.
              </p>
              <Table>
                <thead color="primary-color" textWhite>
                  <tr>
                    <th>#</th>
                    <th>First</th>
                    <th>Last</th>
                    <th>Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
              <Table>
                <thead color="pink">
                  <tr>
                    <th>#</th>
                    <th>First</th>
                    <th>Last</th>
                    <th>Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
              <h3 className="mt-5 text-left">
                <strong>Striped rows.</strong>
              </h3>
              <p>
                Use prop striped to add zebra-striping to any table row within
                the table body
              </p>
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First</th>
                    <th>Last</th>
                    <th>Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TablesPage;

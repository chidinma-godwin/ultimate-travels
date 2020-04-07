import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Mutation } from "react-apollo";
import { addVisaRequest } from "../../queries";
import PersonalInfo from "./PersonalInfo";
import TravelInfo from "./TravelInfo";

class VisaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      middleName: "",
      lastName: "",
      title: "",
      gender: "",
      dateOfBirth: "",
      status: "",
      phoneNum: "",
      nationality: "Nigeria",
      employmentStatus: "",
      address: "",
      departureDate: new Date(),
      returnDate: new Date(),
      travelHistory: "",
      destination: "United Arab Emirates",
      passportExpiryDate: "",
      passportNum: "",
      email: "",
      // selectedFile: null
    };
    this.handleHideFooter = this.props.handleHideFooter;
  }

  componentDidMount = () => {
    this.handleHideFooter(true);
  };

  componentWillUnmount = () => {
    this.handleHideFooter(false);
  };

  handleChange = (evt) => {
    let value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };

  onChangePhone = (phone) => {
    this.setState({ phoneNum: phone });
  };

  handleDateChange = (name, date) => {
    console.log(date);
    this.setState({
      [name]: date,
    });
  };

  // onChangeFile = evt => {
  //   console.log(evt.target.files[0]);
  //   this.setState({
  //     selectedFile: evt.target.files[0]
  //   });
  // };

  render() {
    console.log(this.state);
    return (
      <Mutation mutation={addVisaRequest}>
        {(addVisaRequest) => (
          <Container fluid className="p-0">
            <Container>
              <h2 className="mb-5 mt-5">UAE Visa Application Form</h2>
              <Card>
                <Card.Header
                  className="text-center"
                  style={{
                    // backgroundColor: "#f68220",
                    backgroundColor: "#41225f",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  <p>Fill this form to get Visa processing assistance</p>
                  <p>
                    We make visa processing easy,{" "}
                    <span className="font-weight-bold">NO DOWN PAYMENT</span>
                  </p>
                </Card.Header>
                <Card.Body className="p-3">
                  <h3 className="font-weight-bold mb-4">
                    PERSONAL INFORMATION
                  </h3>
                  <Form
                    onSubmit={async (evt) => {
                      evt.preventDefault();
                    }}
                  >
                    <PersonalInfo
                      firstName={this.state.firstName}
                      middleName={this.state.middleName}
                      lastName={this.state.lastName}
                      title={this.state.title}
                      gender={this.state.gender}
                      dateOfBirth={this.state.dateOfBirth}
                      status={this.state.status}
                      phone={this.state.phoneNum}
                      nationality={this.state.nationality}
                      employmentStatus={this.state.employmentStatus}
                      address={this.state.address}
                      email={this.state.email}
                      handleChange={this.handleChange}
                      handleDateChange={this.handleDateChange}
                      onChangePhone={this.onChangePhone}
                    />

                    <h3 className="font-weight-bold mb-4 mt-5">
                      TRAVEL INFORMATION
                    </h3>

                    <TravelInfo
                      departureDate={this.state.departureDate}
                      returnDate={this.state.returnDate}
                      travelHistory={this.state.travelHistory}
                      destination={this.state.destination}
                      passportExpiryDate={this.state.passportExpiryDate}
                      passportNum={this.state.passportNum}
                      // selectedFile={this.state.selectedFile}
                      handleChange={this.handleChange}
                      handleDateChange={this.handleDateChange}
                      onChangePhone={this.onChangePhone}
                      // onChangeFile={this.onChangeFile}
                    />

                    <Button
                      variant="primary"
                      type="submit"
                      onClick={async (evt) => {
                        evt.preventDefault();
                        console.log("it is working");
                        await addVisaRequest({
                          variables: { input: this.state },
                        });
                      }}
                    >
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Container>
            <div
              style={{
                // backgroundColor: "rgb(123, 123, 204)",
                backgroundColor: "#41225f",
                color: "#fff",
                marginTop: "8em",
                marginBottom: "-500px",
                padding: "2em",
              }}
            >
              <h3>Visa Processing Service</h3>
              <p>
                Ultimate travels have seasoned, specialized and experienced
                experts in visa processing. Our visa processing services
                includes helping you to complete your visa application forms,
                vetting documents, getting appointment dates, profiling,
                conducting pre-interview session where applicable and making
                sure you have a very high chance of getting the visa. We do not
                encourage immigration defaults and kindly note that issuance of
                visas is at the discretion of the embassy. Your visa processing
                is in safe hands with Ultimate travels.
                <span className="font-weight-bold">
                  We do not accept any form of payment until your visa is ready.
                </span>
              </p>
              <p>
                Contact us for any visa related questions. Email:
                ultimatetravelsltd@gmail.com, Phone: 08161128204
              </p>
              <p>© 2019 Ultimate Travels. All Rights Reserved.</p>
            </div>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default VisaForm;

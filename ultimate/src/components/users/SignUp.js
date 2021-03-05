import React from "react";
import { Container, Form, Card, Button, Spinner, Alert } from "react-bootstrap";
import { Mutation } from "react-apollo";
import ReCAPTCHA from "react-google-recaptcha";
import { signUpMutation } from "../../queries";
import { Redirect, Link } from "react-router-dom";

class SignUp extends React.Component {
  constructor() {
    super();
    this.signupRecaptcha = React.createRef();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      token: "",
      redirect: null,
      redirectState: "",
      showErrorsAlert: false,
      errMsg: [],
    };
  }

  onChangeCaptcha = (token) => {
    this.setState({ token });
  };

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  };

  handleShowAlert = () => {
    this.setState((prevState) => {
      return {
        showErrorsAlert: !prevState.showErrorsAlert,
      };
    });
  };

  handleSubmit = async (evt, signUp, data) => {
    const { username, email, password, confirmPassword, token } = this.state;
    // Remove  previous errors
    this.setState({ errMsg: [] });
    evt.preventDefault();

    // Create an account for users and redirect them
    // to login page if sign up was successful
    try {
      data = await signUp({
        variables: { username, email, password, confirmPassword, token },
      });
      const signupData = data.data.signUp;
      if (signupData.ok) {
        this.setState({
          redirect: "/login",
          redirectState: "Account created successfully. You can now login",
        });
      } else {
        if (this.signupRecaptcha) this.signupRecaptcha.current.reset();
        this.setState((prevState) => {
          return {
            errMsg: prevState.errMsg.concat(signupData.errors),
            showErrorsAlert: true,
          };
        });
      }
    } catch (err) {
      if (this.signupRecaptcha) this.signupRecaptcha.current.reset();
      // Format graphql errors and show users
      // TODO: Use sentry for error notification
      console.log(err.message);
      console.log(err.graphQLErrors);
      // Format graphql errors and show users
      const unexpectedError = [
        {
          path: "unknown",
          message: "Unexpected error, please try again",
        },
      ];
      this.setState({
        errMsg: unexpectedError,
        showAlert: true,
      });
    }
  };

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      showErrorsAlert,
      errMsg,
      redirect,
      redirectState,
    } = this.state;

    if (redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: redirect,
            state: { info: redirectState, showAlert: true },
          }}
        />
      );
    }
    return (
      <Mutation mutation={signUpMutation}>
        {(signUp, { loading, error, data }) => (
          <Container
            className="d-block ml-auto mr-auto"
            style={{ maxWidth: "700px" }}
          >
            <h3 className="text-center pt-5 mb-4">Create an account</h3>
            {showErrorsAlert && errMsg.length ? (
              <Alert
                variant="danger"
                onClose={this.handleShowAlert}
                dismissible
              >
                <Alert.Heading className="text-center">
                  Submission Error!
                </Alert.Heading>
                <ul>
                  {errMsg.map((msg, i) => (
                    <li key={i}>{msg.message}</li>
                  ))}
                </ul>
              </Alert>
            ) : null}
            <Card>
              <Card.Body className="p-4">
                <Form onSubmit={(evt) => this.handleSubmit(evt, signUp, data)}>
                  <Form.Group controlId="username">
                    <Form.Label className="font-weight-bold">
                      Username
                    </Form.Label>
                    <Form.Control
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label className="font-weight-bold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label className="font-weight-bold">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="confirmPassword">
                    <Form.Label className="font-weight-bold">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="mr-2">Loading</span>{" "}
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          style={{ width: "1em", height: "1em" }}
                          role="status"
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </Form>
                <p className="text-center">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
                <ReCAPTCHA
                  ref={this.signupRecaptcha}
                  size="normal"
                  sitekey="6LfvXOcUAAAAAD8lHPr-cKOtXVhQRiBkVydOpr9X"
                  onChange={this.onChangeCaptcha}
                />
              </Card.Body>
            </Card>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default SignUp;

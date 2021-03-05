import React from "react";
import { Container, Form, Card, Button, Spinner, Alert } from "react-bootstrap";
import { Mutation } from "react-apollo";
import ReCAPTCHA from "react-google-recaptcha";
import { loginMutation } from "../../queries";
import { Redirect, Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.loginRecaptcha = React.createRef();
    const showAlert = this.props.location.state
      ? this.props.location.state.showAlert
      : null;
    this.state = {
      email: "",
      password: "",
      token: "",
      redirect: null,
      showAlert,
      errMsg: [],
    };
  }

  componentWillUnmount() {
    this.props.location.state = undefined;
  }

  onChangeRecaptcha = (token) => {
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
        showAlert: !prevState.showAlert,
      };
    });
  };

  handleSubmit = async (evt, signIn, data) => {
    const { email, password, token } = this.state;

    //Remove previous errors
    this.setState({ errMsg: [] });

    // Sign user in and redirect them to the user page if sign in was successful
    try {
      evt.preventDefault();
      data = await signIn({
        variables: {
          email,
          password,
          token,
        },
      });
      const signinData = data.data.signIn;
      if (signinData.ok) {
        this.setState({
          redirect: `/users/${signinData.user.username.toLowerCase()}`,
        });
      } else {
        if (this.loginRecaptcha) this.loginRecaptcha.current.reset();
        this.setState((prevState) => {
          return {
            errMsg: prevState.errMsg.concat(signinData.errors),
            showAlert: true,
          };
        });
      }
    } catch (err) {
      if (this.loginRecaptcha) this.loginRecaptcha.current.reset();
      // TODO: Use sentry for error notification
      console.log(err.message);
      console.log(err.graphQLErrors);
      // Format graphql errors and show users
      const unexpectedError = [
        { path: "unknown", message: "Unexpected error, please try again" },
      ];
      this.setState({
        errMsg: unexpectedError,
        showAlert: true,
      });
    }
  };

  render() {
    const { email, password, redirect, showAlert, errMsg } = this.state;
    const info = this.props.location.state
      ? this.props.location.state.info
      : null;
    if (redirect) {
      return <Redirect push to={redirect} />;
    }
    return (
      <Mutation mutation={loginMutation}>
        {(signIn, { loading, error, data }) => (
          <Container
            className="d-block ml-auto mr-auto"
            style={{ maxWidth: "700px" }}
          >
            <h3 className="text-center pt-5 mb-4">Login to your account</h3>
            {info && showAlert ? (
              <Alert
                variant="success"
                onClose={this.handleShowAlert}
                dismissible
              >
                <p>{info}</p>
              </Alert>
            ) : null}
            {showAlert && errMsg.length ? (
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
                <Form onSubmit={(evt) => this.handleSubmit(evt, signIn, data)}>
                  <Form.Group
                    controlId="email"
                    className={errMsg.length ? "has-warning" : ""}
                  >
                    <Form.Label className="font-weight-bold">Email</Form.Label>
                    <Form.Control
                      // required
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="password"
                    className={errMsg.length ? "has-warning" : ""}
                  >
                    <Form.Label className="font-weight-bold">
                      Password
                    </Form.Label>
                    <Form.Control
                      // required
                      type="password"
                      name="password"
                      value={password}
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
                      "Sign in"
                    )}
                  </Button>
                </Form>

                <p style={{ marginTop: "1em", color: "#15498d" }}>
                  Forgot password?
                </p>
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup">Create account</Link>
                </p>

                <ReCAPTCHA
                  ref={this.loginRecaptcha}
                  size="normal"
                  sitekey="6LfvXOcUAAAAAD8lHPr-cKOtXVhQRiBkVydOpr9X"
                  onChange={this.onChangeRecaptcha}
                />
              </Card.Body>
            </Card>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default Login;

import React from "react";
import { Form, Col, Button } from "react-bootstrap";

// TEST5e385fc39921f
// test_e228562ea21f6c989ca21474e4778c05

class NetplusPayment extends React.Component {
  render() {
    return (
      <Form
        class="demo-fm"
        id="netpluspay_form"
        name="netpluspay_form"
        action="https://netpluspay.com/testpayment/paysrc/"
      >
        <Form.Group as={Col} sm="12" controlId="full=name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            name="full_name"
            placeholder="Enter Full Name"
          ></Form.Control>
        </Form.Group>

        <Form.Group as={Col} sm="12" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
          ></Form.Control>
        </Form.Group>

        <Form.Group as={Col} sm="6" controlId="total_amount">
          <Form.Label>Total Amount</Form.Label>
          <Form.Control
            type="number"
            name="total_amount"
            placeholder="&#8358;1000"
          ></Form.Control>
        </Form.Group>

        <Form.Group as={Col} sm="6" controlId="submit_btn">
          <Button type="submit">Pay</Button>
        </Form.Group>

        <Form.Group as={Col} sm="12">
          <Form.Control
            type="hidden"
            name="merchant_id"
            value="merchantid"
            placeholder="Enter merchant id"
          ></Form.Control>
        </Form.Group>

        <Form.Group as={Col} sm="12">
          <Form.Control
            type="hidden"
            name="currency_code"
            value="NGN"
          ></Form.Control>
        </Form.Group>

        <Form.Group as={Col} sm="12">
          <Form.Control
            type="hidden"
            name="narration"
            value="item payment test"
          ></Form.Control>
        </Form.Group>

        <Form.Group as={Col} sm="12">
          <Form.Control
            type="hidden"
            name="order_id"
            value="universal unique id"
          ></Form.Control>
        </Form.Group>

        <Form.Group as={Col} sm="12">
          <Form.Control
            type="hidden"
            name="return_url"
            value="https://yourreturnurl.com/"
          ></Form.Control>
        </Form.Group>

        <Form.Group as={Col} sm="12">
          <Form.Control
            type="hidden"
            name="recurring"
            value="no"
          ></Form.Control>
        </Form.Group>
      </Form>
    );
  }
}

export default NetplusPayment;

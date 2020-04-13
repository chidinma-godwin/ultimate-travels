import React from "react";
import { Card } from "react-bootstrap";

const Dashboard = () => {
  return (
    <section className="pt-4">
      <Card style={{ marginBottom: "3em", borderColor: "#f68220" }}>
        <Card.Header>Recent Booking</Card.Header>
        <Card.Body></Card.Body>
      </Card>

      <Card style={{ marginBottom: "3em", borderColor: "#f68220" }}>
        <Card.Header>Visa processing applications</Card.Header>
        <Card.Body></Card.Body>
      </Card>
    </section>
  );
};

export default Dashboard;

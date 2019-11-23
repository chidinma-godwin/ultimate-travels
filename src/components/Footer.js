import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <footer id="footer">
      <Container>
        <Row>
          <Col sm={6} lg={3}>
            <section id="contact">
              <h5>Contact us</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                accusamus voluptatibus rem illo reiciendis hic iusto nemo
                cupiditate facere. Quod ut doloremque magni dicta suscipit,
                natus quo aliquam molestias nesciunt!
              </p>
            </section>
          </Col>
          <Col sm={6} lg={3}>
            <section>
              <h5>About us</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                accusamus voluptatibus rem illo reiciendis hic iusto nemo
                cupiditate facere. Quod ut doloremque magni dicta suscipit,
                natus quo aliquam molestias nesciunt!
              </p>
            </section>
          </Col>
          <Col sm={6} lg={3}>
            <section>
              <h5>Our Services</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                accusamus voluptatibus rem illo reiciendis hic iusto nemo
                cupiditate facere. Quod ut doloremque magni dicta suscipit,
                natus quo aliquam molestias nesciunt!
              </p>
            </section>
          </Col>
          <Col sm={6} lg={3}>
            <section>
              <h5>Quick links</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                accusamus voluptatibus rem illo reiciendis hic iusto nemo
                cupiditate facere. Quod ut doloremque magni dicta suscipit,
                natus quo aliquam molestias nesciunt!
              </p>
            </section>
          </Col>
        </Row>
      </Container>
      <div id="bottom-nav">
        <p className="mb-0">© 2019 Ultimate Travels. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;

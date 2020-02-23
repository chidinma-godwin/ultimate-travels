import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <Col sm={12}>
            <p className="mt-1">
              © 2019 Ultimate Travels. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
      <div className="d-none d-lg-block bottom-nav">
        <ul className="nav nav-pills justify-content-around">
          <li>Contact us</li>
          <li>
            <FontAwesomeIcon
              icon={["fab", "whatsapp-square"]}
              className="mr-2"
              style={{ color: "green" }}
              size="lg"
            />
            +2348161128204, +2349026622600
          </li>
          <li>
            <i>
              <FontAwesomeIcon
                icon={["fas", "phone-alt"]}
                className="mr-2"
                style={{ color: "green" }}
                size="lg"
              />
              +2348161128204, +2349026622600
            </i>
          </li>
          <li>
            <i>
              <FontAwesomeIcon
                icon={["fas", "envelope"]}
                className="mr-2"
                style={{ color: "green" }}
                size="lg"
              />
              ultimatetravelsltd@gmail.com
            </i>
          </li>
        </ul>
      </div>

      {/* <div id="bottom-nav">
        <p className="mb-0">© 2019 Ultimate Travels. All Rights Reserved.</p>
      </div> */}
    </footer>
  );
};
export default Footer;

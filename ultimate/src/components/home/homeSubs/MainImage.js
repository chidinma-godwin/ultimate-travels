import React from "react";
import waterpark from "../../../images/waterpark.jpg";
import oman from "../../../images/oman.jpg";
import kuvajt from "../../../images/kuvajt.jpg";
import beirutLebanon from "../../../images/beirut-lebanon.jpg";
import iran from "../../../images/iran.jpg";
import dohaQatar from "../../../images/doha-qatar.jpg";
import bahrain from "../../../images/bahrain.jpg";
import ritadhSaudi from "../../../images/ritadh-saudi.jpg";
import Carousel from "react-bootstrap/Carousel";

const MainImage = () => {
  return (
    <Carousel interval={7000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ maxHeight: "430px" }}
          src={waterpark}
          alt="Dubai water park"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ maxHeight: "430px" }}
          src={kuvajt}
          alt="Dubai water park"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ maxHeight: "430px" }}
          src={beirutLebanon}
          alt="Dubai water park"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ maxHeight: "430px" }}
          src={dohaQatar}
          alt="Dubai water park"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ maxHeight: "430px" }}
          src={bahrain}
          alt="Dubai water park"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ maxHeight: "430px" }}
          src={ritadhSaudi}
          alt="Dubai water park"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ maxHeight: "430px" }}
          src={iran}
          alt="Dubai water park"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ maxHeight: "430px" }}
          src={oman}
          alt="Dubai water park"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MainImage;

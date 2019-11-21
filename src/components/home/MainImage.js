import React from "react";
import abudhabi from "../images/abudhabi-uae.jpg";
import beirutLebanon from "../images/beirut-lebanon.jpg";
import dohaQatar from "../images/doha-qatar.jpg";
import manamaBahrain from "../images/manama-bahrain.jpg";
import ritadhSaudi from "../images/ritadh-saudi.jpg";
import Carousel from "react-bootstrap/Carousel";

const MainImage = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ maxHeight: "393px" }}
          src={abudhabi}
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
          style={{ maxHeight: "393px" }}
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
          style={{ maxHeight: "393px" }}
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
          style={{ maxHeight: "393px" }}
          src={manamaBahrain}
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
            style={{ maxHeight: "393px" }}
          src={ritadhSaudi}
          alt="Dubai water park"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    // <div className="container-fluid">
    //     <img src={homeImage} alt='Water park' />
    // </div>
  );
};

export default MainImage;

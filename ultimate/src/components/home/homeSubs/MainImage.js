import React from "react";
// import waterpark from "../../../images/waterpark.jpg";
// import oman from "../../../images/oman.jpg";
// import kuvajt from "../../../images/kuvajt.jpg";
// import beirutLebanon from "../../../images/beirut-lebanon.jpg";
// import iran from "../../../images/iran.jpg";
// import dohaQatar from "../../../images/doha-qatar.jpg";
import bahrain from "../../../images/bahrain.jpg";
// import ritadhSaudi from "../../../images/ritadh-saudi.jpg";
// import { Carousel, Modal, Image, Container } from "react-bootstrap";
import Booking from "../homeSubs/booking/Booking";

class MainImage extends React.Component {
  constructor() {
    super();
    this.state = {
      height: "500px"
    };
  }

  changeImageHeight = height => {
    this.setState(prevState => {
      console.log(height);
      // let numericPreviousHeight = Number(prevState.height.split("px")[0]);
      return {
        height: height < 500 ? "500px" : `${height}px`
      };
    });
  };

  render() {
    return (
      <div
        className="d-flex flex-column justify-content-center position-relative align-items-center p-0 clearfix"
        style={{ height: this.state.height }}
      >
        <img
          style={{ height: "inherit" }}
          src={bahrain}
          alt="Dubai water park"
          className="d-block w-100"
        />
        <Booking
          currency={this.props.currency}
          changeImageHeight={height => this.changeImageHeight(height)}
        />
      </div>
      // <Carousel interval={7000}>
      //   <Carousel.Item>
      //     <img
      //       className="d-block w-100"
      //       style={{ maxHeight: "430px" }}
      //       src={waterpark}
      //       alt="Dubai water park"
      //     />
      //     <Carousel.Caption>
      //       <h3>First slide label</h3>
      //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      //     </Carousel.Caption>
      //   </Carousel.Item>

      //   <Carousel.Item>
      //     <img
      //       className="d-block w-100"
      //       style={{ maxHeight: "430px" }}
      //       src={kuvajt}
      //       alt="Dubai water park"
      //     />
      //     <Carousel.Caption>
      //       <h3>First slide label</h3>
      //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      //     </Carousel.Caption>
      //   </Carousel.Item>

      //   <Carousel.Item>
      //     <img
      //       className="d-block w-100"
      //       style={{ maxHeight: "430px" }}
      //       src={beirutLebanon}
      //       alt="Dubai water park"
      //     />
      //     <Carousel.Caption>
      //       <h3>First slide label</h3>
      //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      //     </Carousel.Caption>
      //   </Carousel.Item>

      //   <Carousel.Item>
      //     <img
      //       className="d-block w-100"
      //       style={{ maxHeight: "430px" }}
      //       src={dohaQatar}
      //       alt="Dubai water park"
      //     />
      //     <Carousel.Caption>
      //       <h3>First slide label</h3>
      //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      //     </Carousel.Caption>
      //   </Carousel.Item>

      //   <Carousel.Item>
      //     <img
      //       className="d-block w-100"
      //       style={{ maxHeight: "430px" }}
      //       src={bahrain}
      //       alt="Dubai water park"
      //     />
      //     <Carousel.Caption>
      //       <h3>First slide label</h3>
      //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      //     </Carousel.Caption>
      //   </Carousel.Item>

      //   <Carousel.Item>
      //     <img
      //       className="d-block w-100"
      //       style={{ maxHeight: "430px" }}
      //       src={ritadhSaudi}
      //       alt="Dubai water park"
      //     />
      //     <Carousel.Caption>
      //       <h3>First slide label</h3>
      //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      //     </Carousel.Caption>
      //   </Carousel.Item>

      //   <Carousel.Item>
      //     <img
      //       className="d-block w-100"
      //       style={{ maxHeight: "430px" }}
      //       src={iran}
      //       alt="Dubai water park"
      //     />
      //     <Carousel.Caption>
      //       <h3>First slide label</h3>
      //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      //     </Carousel.Caption>
      //   </Carousel.Item>

      //   <Carousel.Item>
      //     <img
      //       className="d-block w-100"
      //       style={{ maxHeight: "430px" }}
      //       src={oman}
      //       alt="Dubai water park"
      //     />
      //     <Carousel.Caption>
      //       <h3>First slide label</h3>
      //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      //     </Carousel.Caption>
      //   </Carousel.Item>
      // </Carousel>
    );
  }
}

export default MainImage;

import React from 'react';
import MainImage from './MainImage';
import FlightDeals from './FlightDeals';

const Home = (props)=> {
    const {deals} = props;
    return(
        <React.Fragment>
            <MainImage />
            <br />
            <br />
            <div className="container">
            <h2 className="text-center">Flight Deals</h2>
            <FlightDeals deals={deals}/>
            </div>
        </React.Fragment>
    )
}
export default Home;
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
            <h2>Flight Deals</h2>
            <FlightDeals deals={deals}/>
        </React.Fragment>
    )
}
export default Home;
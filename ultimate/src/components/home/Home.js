import React from 'react';
import MainImage from './MainImage';
import HolidayPackages from './HolidayPackages';
import FlightDeals from './FlightDeals';
import Booking from './Booking';

const Home = (props)=> {
    const {deals} = props;
    return(
        <React.Fragment>
            <MainImage />
            <div className="container">
            <Booking />
            <br/>
            <h2 className="text-center">Top flight Deals</h2>
            <FlightDeals />
            <br/>
            <h2 className="text-center">Top Holiday Packages</h2>
            <HolidayPackages deals={deals}/>
            </div>
        </React.Fragment>
    )
}
export default Home;
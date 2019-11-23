import React from 'react';
import MainImage from './MainImage';
import HolidayPackages from './HolidayPackages';

const Home = (props)=> {
    const {deals} = props;
    return(
        <React.Fragment>
            <MainImage />
            <br />
            <br />
            <div className="container">
            <h2 className="text-center">Top Holiday Packages</h2>
            <HolidayPackages deals={deals}/>
            </div>
        </React.Fragment>
    )
}
export default Home;
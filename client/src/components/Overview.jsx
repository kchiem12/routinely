import React from 'react';
import Calendar from './Calendar';
import './overview.css';
import {useSelector} from 'react-redux';

const Overview = (props) => {

    const {user} = useSelector((state) => state.auth);

    return ( 
        <div className="overview">
            <h1 className='calendar-title'>{user && user.firstName}'s Calendar</h1>
            <Calendar />
        </div>
     );
}
 
export default Overview;
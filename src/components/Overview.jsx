import React from 'react';
import Calendar from './Calendar';
import './overview.css';

const Overview = (props) => {
    return ( 
        <div className="overview">
            <Calendar authUser={props.authUser}/>
        </div>
     );
}
 
export default Overview;
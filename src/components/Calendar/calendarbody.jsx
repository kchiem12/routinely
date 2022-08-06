import React, { useState } from 'react';
import { DateTime } from 'luxon';

const CalendarBody = () => {

    //Creates DateTime object for luxon functionality
    const dt = DateTime.now();

    //the default day is the current month/day
    const defaultDay = {
        day: dt.toFormat("dd"),
        month: dt.toFormat("MMMM")
    };

    const [selectedDay, setSelectedDay] = useState(defaultDay);

    const setDay = (day) => {
        setSelectedDay(day);
    }


    return ( 
        <h2>calendar body</h2>
     );
}
 
export default CalendarBody;
import React from 'react';
import { useState } from 'react';
import CalendarBody from './calendarbody';
import CalendarHead from './calendarhead';
import { DateTime } from 'luxon';
import { Grid } from '@mui/material';
import './calendar.css';
import { StyledEngineProvider } from '@mui/material';
import ActivityLog from '../ActivityLog';
import { withAuthentication } from '../Session';
import { auth, db } from '../../Firebase';

const Calendar = (props) => {

    const user = props;
    const dt = DateTime.now();

    const defaultDay = {
        day: parseInt(dt.toFormat("d")),
        month: parseInt(dt.toFormat("MM"))
    }

    //Hooks
    const[showMonthTable, setShowMonthTable] = useState(false);
    const [displayMonth, setDisplayMonth] = useState(dt.toFormat("MMMM"));
    const [displayYear, setDisplayYear] = useState(dt.toFormat("yyyy"));
    const [selectedDay, setSelectedDay] = useState(defaultDay);


    //Sets the currently selected day by updating the day portion of the JSON
    const setTheDay = (day) => {
        setSelectedDay({day, month: convertMonthToNum(displayMonth)});
    }

    //Toggles the display to choose what month to display
    const toggleMonthDisplay = () => {
        setShowMonthTable(!showMonthTable);
    };


    //Sets what month is displayed on the calendar
    const setMonth = (month) => {
        setDisplayMonth(month);
        setSelectedDay({day: null, month: convertMonthToNum(month)});
        toggleMonthDisplay();
    };

    // These arrays will help with enumerating the months and weekday
    const allMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    const allDaysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const convertMonthToNum = (month) => {
        return allMonths.indexOf(month) + 1;
    };

    const convertYearToNum = (year) => {
        return parseInt(year);
    };

    //toggles the month select view
    const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);

    // Apparently, both arguments in the DateTime.local() function needs to be integers, so a conversion is necessary
    const daysInMonth = () => {
        return DateTime.local(convertYearToNum(displayYear), convertMonthToNum(displayMonth)).daysInMonth;
    };

    // Returns what day of the week the currently selected month begins on
    const firstDayOfMonth = () => {
        let weekDay = String(DateTime.local(convertYearToNum(displayYear), convertMonthToNum(displayMonth), 1).weekdayLong);
        return allDaysOfWeek.indexOf(weekDay);
    };

    return ( 

            <StyledEngineProvider injectFirst>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={12} lg={12} className="grid-container">
                        <CalendarHead
                            allMonths={allMonths}
                            currentMonth={displayMonth}
                            toggleMonthSelect={toggleMonthSelect}
                            showMonthTable = {showMonthTable}
                            currentYear={displayYear}
                            setMonth = {setMonth}
                            setYear = {setDisplayYear}
                        />
                        <div style={{color: "green"}}>
                            {}
                        </div>
                        <CalendarBody 
                            displayMonth = {convertMonthToNum(displayMonth)}
                            currentMonth = {convertMonthToNum(dt.toFormat("MMMM"))}
                            daysInMonth = {daysInMonth}
                            selectedDate = {selectedDay}
                            firstDayOfMonth = {firstDayOfMonth}
                            setDate = {setTheDay}
                            allDaysOfWeek = {allDaysOfWeek}
                        />
                    </Grid>
                    <Grid item xs={7} md={7} lg={7} className="activity-log-container">
                        <ActivityLog 
                            selectedDate = {selectedDay}
                            user = {user}
                        />
                    </Grid>
                </Grid>
            </StyledEngineProvider>

     );
}
 
export default Calendar
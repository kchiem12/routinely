import React from 'react';
import { useState } from 'react';
import CalendarBody from './calendarbody';
import CalendarHead from './calendarhead';
import { DateTime } from 'luxon';
import { Grid } from '@mui/material';
import './calendar.css';
import { StyledEngineProvider } from '@mui/material';
import ActivityLog from '../ActivityLog';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const Calendar = (props) => {

    const dt = DateTime.now();

    const {exercises} = useSelector((state) => state.exercise);

    const defaultDay = {
        day: parseInt(dt.toFormat("d")),
        month: parseInt(dt.toFormat("MM")),
        year: parseInt(dt.toFormat('yyyy'))
    }

    //Hooks
    const[showMonthTable, setShowMonthTable] = useState(false);
    const [displayMonth, setDisplayMonth] = useState(dt.toFormat("MMMM"));
    const [displayYear, setDisplayYear] = useState(parseInt(dt.toFormat("yyyy")));
    const [selectedDay, setSelectedDay] = useState(defaultDay);
    const [activityChange, setActivityChange] = useState(false);

    // Let active days be an array of Strings
    const [activeDays, setActiveDays] = useState([]);

    // Keep track of days that are active
     const retrieveActiveDays = () => {

        var daysActive = [];

        for (var i = 0; i < exercises.length; i++) {
            daysActive.push(exercises[i].date);
        }
        setActiveDays(daysActive);
    };

    // When an activity is added or deleted, we must update and retrieve from our database to update our website
    useEffect(() => retrieveActiveDays(), [exercises]);


    //Sets the currently selected day by updating the day portion of the JSON
    const setTheDay = (day) => {
        setSelectedDay({day, month: convertMonthToNum(displayMonth), year: displayYear});
    }

    //Toggles the display to choose what month to display
    const toggleMonthDisplay = () => {
        setShowMonthTable(!showMonthTable);
    };

    //Sets what month is displayed on the calendar
    const setMonth = (month) => {
        setDisplayMonth(month);
        setSelectedDay((prevState) => ({
            ...prevState,
            "month":  convertMonthToNum(month)
        }));
        toggleMonthDisplay();
    };

    const setTheYear = (year) => {
        setDisplayYear(year);
        setSelectedDay((prevState) => ({
            ...prevState,
            "year": year,
        }));
    }

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

    //Toggles the month select view
    const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);

    // Apparently, both arguments in the DateTime.local() function needs to be integers, so a conversion is necessary
    const daysInMonth = () => {
        return DateTime.local(parseInt(displayYear), convertMonthToNum(displayMonth)).daysInMonth;
    };

    // Returns what day of the week the currently selected month begins on
    const firstDayOfMonth = () => {
        let weekDay = String(DateTime.local(parseInt(displayYear), convertMonthToNum(displayMonth), 1).weekdayLong);
        return allDaysOfWeek.indexOf(weekDay);
    };

    return ( 
            <StyledEngineProvider injectFirst>
                    <Grid container justifyContent="center" direction="column">
                        <Grid item xs={4} md={6} lg={12} className="grid-container">
                            <CalendarHead
                                allMonths={allMonths}
                                currentMonth={displayMonth}
                                toggleMonthSelect={toggleMonthSelect}
                                showMonthTable = {showMonthTable}
                                currentYear={parseInt(displayYear)}
                                setMonth = {setMonth}
                                setYear = {setTheYear}
                            />
                            <CalendarBody
                                displayMonth = {convertMonthToNum(displayMonth)}
                                currentMonth = {convertMonthToNum(dt.toFormat("MMMM"))}
                                daysInMonth = {daysInMonth}
                                selectedDate = {selectedDay}
                                firstDayOfMonth = {firstDayOfMonth}
                                setDate = {setTheDay}
                                allDaysOfWeek = {allDaysOfWeek}
                                activeDays = {activeDays}
                                displayYear={parseInt(displayYear)}
                            />
                        </Grid>
                        <Grid item className="activity-log-container" style={{ alignSelf: 'center' }} sx={{ width: 7/10 }} >
                            <ActivityLog
                                selectedDate = {selectedDay}
                                setSelectedDay = {setSelectedDay}
                                activityChange = {activityChange}
                                setActivityChange = {setActivityChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            {/* Add a chart component here */}
                        </Grid>
                    </Grid>
            </StyledEngineProvider>

     );
}
 
export default Calendar
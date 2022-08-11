import React, { useState } from 'react';
import nextId from 'react-id-generator/';
import { TableCell, TableRow, Table, TableContainer, TableHead, TableBody } from '@mui/material';
import { DateTime } from 'luxon';
import { Paper } from '@mui/material';

const CalendarBody = (props) => {

    const dt = DateTime.now();

    let {displayMonth, currentMonth, daysInMonth, selectedDate, firstDayOfMonth, setDate, allDaysOfWeek} = props;

    // Gets the current day and current month
    let currentDay = parseInt(dt.toFormat("dd"));

    let blanks = [];

    // Pushes blank TableCells so that the calendar body will start at appropriate number of days
    for (let i = 0; i < firstDayOfMonth(); i++) {
        blanks.push(<TableCell key={nextId()}></TableCell>);
    }

    let monthDays = [];

    for (let j = 1; j <= daysInMonth(); j++) {
        
        // These variables are used to add special CSS to selected date and current date
        let isCurrentDay, isSelectedDay;

        // That table cell is the current date
        if (currentDay === j && currentMonth === displayMonth) isCurrentDay = 'today';
        
        // This table cell will be the date that the user selected
        if (selectedDate.day === j && displayMonth === selectedDate.month) isSelectedDay = 'selected';

        monthDays.push(
            <TableCell
                key = {j}
                className={`week-day ${isCurrentDay} ${isSelectedDay}`}
                colSpan={1}
                onClick={() => setDate(j)}
            >
                <span className='day'>{j}</span>
            </TableCell>
        );
    };

    // Combines the two arrays together (# blanks and # days in month)
    let totalCells = [...blanks, ...monthDays];

    // Same code as calendar head
    // This is to push all the cells into one array
    // So that each row has 7 cells each
    let rows = [];
    let cells = [];

    totalCells.forEach((day, i) => {
        if (i % 7 !== 0 || i === 0) {
            cells.push(day);
        } else {
            rows.push(cells);
            cells = [];
            cells.push(day);
        }
    });
    rows.push(cells);


    // Array of table cells to hold all the days of the week
    let weekdayNames = [];

    for (let k = 0; k < allDaysOfWeek.length; k++) {
        weekdayNames.push(
            <TableCell colSpan={1} key={k} style={{textAlign: "center", width: "14.2%"}}>
                {allDaysOfWeek[k]}
            </TableCell>
        );
    };

    // Array that has every row for the days in calendar
    let listDays = rows.map((row, i) => <TableRow key={i}>{row}</TableRow>)



    return ( 
        <TableContainer component={Paper} className='date-selector'>
            <Table>
                <TableHead>
                    <TableRow className='weekday-header'>
                        {weekdayNames}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listDays}
                </TableBody>
            </Table>
        </TableContainer>
     );
}
 
export default CalendarBody;
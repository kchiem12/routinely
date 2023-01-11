import React from 'react';
import './calendar.css';
import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody, FormControl, Select, MenuItem} from '@mui/material';
import { Paper } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DateTime } from 'luxon';


const CalendarHead = (props) => {

    let {allMonths, currentMonth, toggleMonthSelect, currentYear, setMonth, setYear, showMonthTable} = props;
    const dt = DateTime.now();


    let months=[];

    // Adds month cells to dropwdown menu
    allMonths.map(month => (
        months.push(
            <TableCell className='month-cell' key={month} style={{textAlign: 'center'}} onClick={e => setMonth(month)}>
                <span>{month}</span>
            </TableCell>
        )
    ));

    // Formatting the TableCell into rows and cells of a table
    let rows = [];
    let cells = [];
    months.forEach((month, i) => {
        if (i % 4 !== 0 || i === 0) {
            cells.push(month);
        } else {
            rows.push(cells);
            cells = [];
            cells.push(month);
        }
    });


    // Array to hold all the years to select from
    let yearMenuItems = [];
    for (var i = 0; i < 40; i++) {
        yearMenuItems.push(
            <MenuItem key={i} value={parseInt(dt.toFormat("yyyy")) - i}>{parseInt(dt.toFormat("yyyy")) - i}</MenuItem>
        );
    };


    // Push the remaining months into a row
    rows.push(cells);

    let listMonths = rows.map((row, i) => <TableRow key={i}>{row}</TableRow>)

    return ( 
        <TableContainer component={Paper} className='month-selector'>
            <Table sx={{ minWidth: 200 }}>
                <TableHead>
                    <TableRow>
                        <TableCell className='toggle-month' align='center' colSpan={2} sx={{ width: 1/2 }} onClick={() => toggleMonthSelect()}>
                            {currentMonth}
                            <ArrowDropDownIcon className='arrow-icon'/>
                        </TableCell>
                        <TableCell className='display-year' align='center' colSpan={2} sx={{ width: 1/2 }}>
                            <FormControl sx={{ width: 1, border: 'none' }} > 
                                <Select
                                    value={currentYear}
                                    onChange={(e) => setYear(e.target.value)}
                                    sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                                >
                                    {yearMenuItems}
                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                </TableHead>
                {showMonthTable ? (
                    <TableBody>
                        <TableRow>
                            <TableCell style={{textAlign: "center"}} colSpan={4} className="select-month">
                                Select a month
                            </TableCell>
                        </TableRow>
                        {listMonths}
                    </TableBody>
                ) : null}
            </Table>
        </TableContainer>
     );
}
 
export default CalendarHead;
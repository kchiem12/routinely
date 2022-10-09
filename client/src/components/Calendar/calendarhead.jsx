import React from 'react';
import './calendar.css';
import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody} from '@mui/material';
import { Paper } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const CalendarHead = (props) => {

    let {allMonths, currentMonth, toggleMonthSelect, currentYear, setMonth, setYear, showMonthTable} = props;
 
    let months=[];

    allMonths.map(month => (
        months.push(
            <TableCell className='month-cell' sx={{width: '25%'}} key={month} style={{textAlign: 'center'}} onClick={e => setMonth(month)}>
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

    // Push the remaining months into a row
    rows.push(cells);

    let listMonths = rows.map((row, i) => <TableRow key={i}>{row}</TableRow>)

    return ( 
        <TableContainer component={Paper} className='month-selector'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className='toggle-month' align='center' colSpan='3' onClick={() => toggleMonthSelect()}>
                            {currentMonth}
                            <ArrowDropDownIcon className='arrow-icon'/>
                        </TableCell>
                        <TableCell className='display-year' colSpan='1' align='center'>
                            {currentYear}
                        </TableCell>
                    </TableRow>
                </TableHead>
                {showMonthTable ? (
                    <TableBody>
                        <TableRow>
                            <TableCell style={{textAlign: "center"}} colSpan="8" className="select-month">
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
import React from 'react';
import { useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const ActivityLog = (props) => {

    // Destructuring props
    let {selectedDate, user} = props;

    // Use to see if an activity exists (activity log will display "you haven't done anything today")
    const [existActivity, setExistActivity] = useState(true);

    // Array of all the activities logged by the user
    let activityList = [];

    return ( 
        <TableContainer component={Paper} className="activity-logger">
            <Table>
                <TableHead className='activity-date-header'>
                    <TableRow>
                    <TableCell colSpan={3}>{`Activity log for ${selectedDate.month}/${selectedDate.day}`}</TableCell>
                    <TableCell colSpan={1}>Add Activity</TableCell>
                    </TableRow>
                    <TableRow>
                        {
                            existActivity ? <>
                                <TableCell>name</TableCell>
                                <TableCell>type</TableCell>
                                <TableCell>amount/duration</TableCell>
                                <TableCell>edit/delete</TableCell>
                            </>
                            :
                            <h1>You haven't logged any activities on this day</h1>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                        
                </TableBody>
            </Table>
        </TableContainer>
     );
}
 
export default ActivityLog;
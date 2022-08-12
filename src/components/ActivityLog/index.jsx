import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import AddActivity from "./AddActivity";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { auth, db } from "../../Firebase";
import "./activitylog.css";

const ActivityLog = (props) => {
  // Destructuring props
  let { selectedDate, user, setSelectedDay } = props;

  // Use to see if an activity exists (activity log will display "you haven't done anything today")
  const [existActivity, setExistActivity] = useState(true);
  const [activity, setActivity] = useState(null);
  const [listOfActivities, setListOfActivities] = useState([]);
  const [theSets, setTheSets] = useState([]);
  const [theActivities, setTheActivities] = useState([]);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (listOfActivities.length !== 0) {
      setListOfActivities([]);
    }
    auth.onAuthStateChanged((user) => {
      if (user) {
        retrieveData(user);
      }
    });
  }, [selectedDate]);

  const retrieveData = (user) => {
    let queryDate = `${selectedDate.month}-${selectedDate.day}`;

    // This variable will hold all the data of activity
    let data = null;

    let ref = db.ref().child(`users/${user.uid}/activities/`);

    
    // FIXED!!!!!!!
    // Just needed to put everything inside of the once() curly braces
    ref
      .orderByChild("date")
      .equalTo(queryDate)
      .once("value", (snapshot) => {

        data = snapshot.val();

        if (data != null) {
          let keys = Object.keys(data);

          for (let i = 0; i < keys.length; i++) {
            let setLists = [];
            let dataObject = data[keys[i]];

            for (let j = 0; j < dataObject.sets; j++) {
              setLists[j] = (
                <p key={j}>
                  Set {j + 1}: {dataObject.reps[j]} @ {dataObject.weights[j]} LB
                </p>
              );
            }

            activityList[i] = (
              <>
                <TableCell className="activity-log-cell">{dataObject.name}</TableCell>
                <TableCell className="activity-log-cell">{dataObject.type}</TableCell>
                <TableCell className="activity-log-cell">{setLists}</TableCell>
                <TableCell className="activity-log-cell">
                  {<EditIcon className="icon" />}
                  {<DeleteIcon className="icon" />}
                </TableCell>
              </>
            );
          }
          setListOfActivities(activityList);
        }
      });

    // Array of all the activities logged by the user
    var activityList = [];
  };

  setTimeout(retrieveData(user), 5000);

  const exercisesWithRepsAndSets = ["upper-body", "back", "lowerbody"];

  const exercisesWithDistance = ["run", "cardio"];

  const addActivity = (theActivity) => {
    if (theActivity.showReps) {
      // Push all the table cells into the activity list array
      setListOfActivities(
        listOfActivities.concat(
          <>
            <TableCell>{theActivity.name}</TableCell>
            <TableCell>{theActivity.type}</TableCell>
            <TableCell>{theActivity.amount}</TableCell>
            <TableCell className="edit-icons">
              {<EditIcon className="icon" />}
              {<DeleteIcon className="icon" />}
            </TableCell>
          </>
        )
      );
    }
  };

  let theActivity = listOfActivities.map((activities, i) => (
    <TableRow key={i}>{activities}</TableRow>
  ));

  return (
    <TableContainer component={Paper} className="activity-logger">
      <Table>
        <TableHead className="activity-date-header">
          <TableRow>
            <TableCell
              colSpan={3}
            >{`Activity log for ${selectedDate.month}/${selectedDate.day}`}</TableCell>
            <TableCell colSpan={1}>
              <AddActivity
                addActivity={addActivity}
                selectedMonth={selectedDate.month}
                selectedDay={selectedDate.day}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            {existActivity ? (
              <>
                <TableCell>name</TableCell>
                <TableCell>type</TableCell>
                <TableCell>amount/duration</TableCell>
                <TableCell>edit/delete</TableCell>
              </>
            ) : (
              <h1>You haven't logged any activities on this day</h1>
            )}
          </TableRow>
        </TableHead>
        <TableBody>{theActivity}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivityLog;

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
import DeleteIcon from "@mui/icons-material/Delete";
import { auth, db } from "../../Firebase";
import "./activitylog.css";
import EditActivity from "./EditActivity";

const ActivityLog = (props) => {
  // Destructuring props
  let { selectedDate, activityChange, setActivityChange, activeDays, setActiveDays } = props;

  // Use to see if an activity exists (activity log will display "you haven't done anything today")
  const [listOfActivities, setListOfActivities] = useState([]);
  const [activityKeys, setActivityKeys] = useState(null);

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

          setActivityKeys(keys);

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
              <React.Fragment key={i}>
                <TableCell className="activity-log-cell">
                  {dataObject.name}
                </TableCell>
                <TableCell className="activity-log-cell">
                  {dataObject.type}
                </TableCell>
                <TableCell className="activity-log-cell">{setLists}</TableCell>
              </React.Fragment>
            );
            setListOfActivities(activityList);
            setActivityChange(!activityChange);
          }


        } else {
          setListOfActivities([]);
        }
      });

    // Array of all the activities logged by the user
    var activityList = [];
  };


  // Deletes activity from Firebase Database
  const deleteActivity = (i) => {
    auth.onAuthStateChanged((user) => {
      // Gets the specific activity key
      if (activityKeys != null) {
        const activityKey = activityKeys[i];

        const emptyData = {
          date: null,
          name: null,
          type: null,
          sets: null,
          reps: null,
          weights: null,
          showReps: null,
          time: null,
        };

        let ref = db.ref().child(`users/${user.uid}/activities/${activityKey}`);
        ref.set(emptyData);

        retrieveData(user);

        let theDate = '(' + selectedDate['month'] + ', ' + selectedDate['day'] + ')';
        let temp = activeDays;
        temp.pop(theDate);
        setActiveDays(temp);

        setActivityChange(!activityChange);

      }
    });
  };


  // Configure different pop-up if user wants to store cardio exercises
  const exercisesWithRepsAndSets = ["upper-body", "back", "lowerbody"];

  const exercisesWithDistance = ["run", "cardio"];

  // Gets the exercise data from database
  const addActivity = (theActivity) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        retrieveData(user);
      }
    })
  };

  let theActivity = listOfActivities.map((activities, i) => (
    <TableRow key={i}>
      {activities}
      <TableCell className="activity-log-cell">
        {<EditActivity 
          activitykeys= {activityKeys}
          activityindex = {i}
          selectedMonth={selectedDate.month}
          selectedDay={selectedDate.day}
          addActivity={addActivity}
        />}
        {<DeleteIcon className="icon" onClick={(e) => deleteActivity(i)}
        />}
      </TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper} className="activity-logger">
      <Table>
        <TableHead className="activity-date-header">
          <TableRow>
            <TableCell
              colSpan={3}
            >{`Activity log for ${selectedDate.month}/${selectedDate.day}`}</TableCell>
            <TableCell colSpan={1} align='center'>
              <AddActivity
                addActivity={addActivity}
                selectedMonth={selectedDate.month}
                selectedDay={selectedDate.day}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            {listOfActivities.length !== 0 ? (
              <>
                <TableCell>name</TableCell>
                <TableCell>type</TableCell>
                <TableCell>amount/duration</TableCell>
                <TableCell>edit/delete</TableCell>
              </>
            ) : (
              <TableCell colSpan={8} align="center">
                <h1>You haven't logged any activities on this day</h1>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>{theActivity}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivityLog;

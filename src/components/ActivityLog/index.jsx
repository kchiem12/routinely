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
import { set, update } from "firebase/database";
import EditActivity from "./EditActivity";

const ActivityLog = (props) => {
  // Destructuring props
  let { selectedDate, user, setSelectedDay, activityChange, setActivityChange } = props;

  // Use to see if an activity exists (activity log will display "you haven't done anything today")
  const [existActivity, setExistActivity] = useState(true);
  const [activity, setActivity] = useState(null);
  const [listOfActivities, setListOfActivities] = useState([]);
  const [theSets, setTheSets] = useState([]);
  const [theActivities, setTheActivities] = useState([]);
  const [rendered, setRendered] = useState(false);
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

  const deleteActivity = (i) => {
    auth.onAuthStateChanged((user) => {
      // Gets the specific activity key
      if (activityKeys != null) {
        const activityKey = activityKeys[i];

        console.log(i);

        console.log("this was called");

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

        console.log(activityKey);

        console.log(user.uid);

        let ref = db.ref().child(`users/${user.uid}/activities/${activityKey}`);
        ref.set(emptyData);

        retrieveData(user);
      }
    });
  };

  const exercisesWithRepsAndSets = ["upper-body", "back", "lowerbody"];

  const exercisesWithDistance = ["run", "cardio"];

  const addActivity = (theActivity) => {
    // if (theActivity.showReps) {
    //   // Push all the table cells into the activity list array
    //   setListOfActivities(
    //     listOfActivities.concat(
    //       <>
    //         <TableCell>{theActivity.name}</TableCell>
    //         <TableCell>{theActivity.type}</TableCell>
    //         <TableCell>{theActivity.amount}</TableCell> 
    //       </>
    //     )
    //   );
    // }

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

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
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
 
const ActivityLog = (props) => {
  // Destructuring props
  let { selectedDate, activityChange, setActivityChange, activeDays, setActiveDays } = props;

  // Use to see if an activity exists (activity log will display "you haven't done anything today")
  const [listOfActivities, setListOfActivities] = useState([]);
  const [activityKeys, setActivityKeys] = useState(null);

  const {exercises} = useSelector((state) => state.exercise);
  const {user} = useSelector((state) => state.auth);

  // calculates running pace
  const calcPace = (miles, hrs, mins, sec) => {
    var totMinutes = hrs * 60 + mins + sec / 60,
    pace = totMinutes / miles,
    paceMin = Math.floor(pace),
    paceSec = Math.round((pace - paceMin) *60);

    if (paceSec < 10) {
      paceSec = "0" + paceSec;
    }

    return "" + paceMin + ":" + paceSec;
  };

  // retrieve and formats data from database
  const retrieveData = (user) => {
    let queryDate = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;
    
    let activitiesonDay = [];

    for (let i = 0; i < exercises.length; i++) {

      let exercise = exercises[i];

      // contains statistics for each set
      var setLists = [];
      
      if (exercise.date !== queryDate) {
        setListOfActivities([]);
        continue;
      }

      if (exercise.type !== 'run') {

      for (let j = 0; j < exercise.sets; j++) {
        setLists.push(
          <p key={j}>
            Set {j + 1}: {exercise.reps[j]} @ {exercise.weights[j]} LB
          </p>
        );
      }
      } else {
        setLists.push(
          <p key={0}>
            {exercise.distance} miles @ {calcPace(exercise.distance, exercise.hours, exercise.minutes, exercise.seconds)} per mile <br /> {exercise.hours}:{exercise.minutes}:{exercise.seconds} total time (hrs:min:sec)
          </p>
        );
      }
      activitiesonDay.push(
        <React.Fragment key={i}>
          <TableCell className="activity-log-cell">
            {exercise.name}
          </TableCell>
          <TableCell className="activity-log-cell">
            {exercise.type}
          </TableCell>
          <TableCell className="activity-log-cell">{setLists}</TableCell>
        </React.Fragment>);
        setListOfActivities(activitiesonDay);
        setActivityChange(!activityChange);
    }
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

  useEffect(() => {
    retrieveData();
  }, [user, exercises, selectedDate]);

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
                selectedDate={selectedDate}
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

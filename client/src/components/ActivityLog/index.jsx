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
import { deleteExercise } from '../../features/exercise/exerciseSlice';
 
const ActivityLog = (props) => {
  // Destructuring props
  let { selectedDate, activityChange, setActivityChange, activeDays, setActiveDays } = props;

  // Use to see if an activity exists (activity log will display "you haven't done anything today")
  const [listOfActivities, setListOfActivities] = useState([]);
  const [correspondingExercises, setCorrespondingExercises] = useState([]);

  const {exercises} = useSelector((state) => state.exercise);
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
    console.log(selectedDate);
    
    let activitiesonDay = [];
    let corrExercises = [];

    for (let i = 0; i < exercises.length; i++) {

      let exercise = exercises[i];

      // contains statistics for each set
      var setLists = [];
      
      if (exercise.date !== queryDate) {
        setListOfActivities([]);
        continue;
      }

      corrExercises.push(exercise);

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
    }
    setListOfActivities(activitiesonDay);
    setCorrespondingExercises(corrExercises);
    setActivityChange(!activityChange);
  };


  // Deletes activity from Firebase Database

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
    console.log("hello");
  }, [user, exercises, selectedDate, dispatch]);

  let theActivity = listOfActivities.map((activities, i) => (
    <TableRow key={i}>
      {activities}
      <TableCell className="activity-log-cell">
        {<EditActivity 
          exercise = {correspondingExercises[i]}
          selectedDate = {selectedDate}
          addActivity={addActivity}
        />}
        {<DeleteIcon className="icon" onClick={() => dispatch(deleteExercise(correspondingExercises[i]._id))}
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

import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Button } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DateTime } from "luxon";
import { auth, db } from "../../Firebase";

const AddActivity = (props) => {
  const { addActivity, selectedMonth, selectedDay } = props;

  // These are the values we want for our activity
  const defaultActivity = {
    date: "",
    name: "",
    type: "",
    amount: {
      rep: -1,
      set: -1,
      time: -1,
      distance: -1,
    },
  };

  const [open, setOpen] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [showReps, setShowReps] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [numSets, setNumSets] = useState(0);
  const [theActivity, setTheActivity] = useState(defaultActivity);
  const [error, setError] = useState(null);

  const user = auth.currentUser;

  const updateActivityType = (e) => {
    setActivityType(e.target.value);
    if (exercisesWithRepsAndSets.includes(e.target.value)) {
      setShowReps(true);
      setShowDuration(false);
    } else {
      setShowReps(false);
      setShowDuration(true);
    }
  };

  let amountOfReps = [];
  let weightsEachRep = [];
  let setReps = [];

  // To update the sets array
  const updateAmountOfReps = (e, amountReps = amountOfReps) => {
    amountReps[parseInt(e.target.id)] = parseInt(e.target.value);
  };

  // To update the weights array
  const updateWeightsEachRep = (e) => {
    weightsEachRep[parseInt(e.target.id)] = parseInt(e.target.value);
  };

  let reps = [];

  for (let i = 0; i < numSets; i++) {
    reps.push(
      <div key={i} className="sets">
        <InputLabel id={(i+1).toString()}>{`Set ${(i+1).toString()}`}</InputLabel>
        <TextField
          autoFocus
          margin="dense"
          id={i.toString()}
          label="Amount"
          type="number"
          fullWidth
          variant="standard"
          onChange={updateAmountOfReps}
          sx={{ marginTop: 0 }}
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          id={i.toString()}
          label="Weight"
          type="number"
          fullWidth
          variant="standard"
          onChange={updateWeightsEachRep}
        ></TextField>
      </div>
    );
  }

  const updateSets = (e) => {
    setNumSets(e.target.value);
  };

  const exercisesWithRepsAndSets = ["upper-body", "back", "lowerbody"];

  const exercisesWithDistance = ["run", "cardio"];

  // Function to add the activity to the database and add it to the log
  const handleActivity = (e, sReps= setReps, aoReps = amountOfReps, woRep = weightsEachRep) => {

    setOpen(false);

    let amtReps = [];

    if (showReps) {
      for (let i = 0; i < reps.length; i++) {
        amtReps[i] =
            <p key={i}>
                Set {i+1}: {amountOfReps[i]} @ {weightsEachRep[i]} LB
            </p>
      }
      // Initialize an activity object to add
      let activity = {
        date: `${selectedMonth}-${selectedDay}`,
        name: activityName,
        type: activityType,
        sets: amtReps.length,
        amount: amtReps,
        showReps: showReps,
      };

      // To add the activity into the log
      addActivity(activity);

      activity = {
        date: `${selectedMonth}-${selectedDay}`,
        name: activityName,
        type: activityType,
        sets: amtReps.length,
        reps: amountOfReps,
        weights: weightsEachRep,
        showReps: showReps,
        time: DateTime.now().toUnixInteger()
      }
      let ref = db.ref().child(`users/${user.uid}/activities`);
      ref.push(activity);
    }
  };

  return (
    <div>
      <Button variant="text" onClick={() => setOpen(!open)}>
        Add Activity
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add An Activity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter what you did today, type of exercise, and how long you did it
            for
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Activity Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setActivityName(e.target.value.replace(/^\s*[\r\n]/gm, ""));
              console.log(activityName);
            }}
            multiline
          ></TextField>

          <FormControl fullWidth>
            <InputLabel id="type-activity">Type</InputLabel>
            <Select
              labelId="type-activity"
              value={activityType}
              defaultValue="Select"
              label="Type"
              sx={{ width: "300px" }}
              onChange={updateActivityType}
            >
              <MenuItem value="upper-body">Upper Body</MenuItem>
              <MenuItem value="back">Back</MenuItem>
              <MenuItem value="lowerbody">Lower Body/Legs</MenuItem>
              <MenuItem value="cardio">Cardio</MenuItem>
              <MenuItem value="run">Run</MenuItem>
            </Select>
          </FormControl>

          {showReps ? (
            <>
              <FormControl>
                <InputLabel id="amount-sets">Sets</InputLabel>
                <Select
                  labelId="amount-sets"
                  label="Sets"
                  value={numSets}
                  sx={{ width: "100px" }}
                  onChange={updateSets}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
              {reps}
            </>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleActivity}>Add Activity</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddActivity;

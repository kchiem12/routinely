import React from 'react';
import { useState } from 'react';
import EditIcon from "@mui/icons-material/Edit";
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
    Button,
    FormHelperText
  } from "@mui/material";
  import { auth, db } from '../../Firebase';
  import { DateTime } from 'luxon';

const EditActivity = (props) => {

    const {activitykeys, activityindex, selectedMonth, selectedDay, addActivity} = props;

    const [data, setData] = useState(null);

    const user = auth.currentUser;

    let queryDate = `${selectedMonth}-${selectedDay}`;
    let ref = db.ref().child(`users/${user.uid}/activities/`);

    ref.orderByChild('date')
    .equalTo(queryDate)
    .once('value', (snapshot) => {
        setData(snapshot.val());
    })

    console.log(data);

    const [open, setOpen] = useState(false);
    const [activityName, setActivityName] = useState("");
    const [activityType, setActivityType] = useState("");
    const [showReps, setShowReps] = useState(false);
    const [showDuration, setShowDuration] = useState(false);
    const [numSets, setNumSets] = useState(0);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);
    const [errorNumSets, setErrorNumSets] = useState(false);


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
              required
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
              required
              fullWidth
              variant="standard"
              onChange={updateWeightsEachRep}
            ></TextField>
          </div>
        );
      }

      const updateSets = (e) => {
        setNumSets(e.target.value);
        setSelected(e.target.value);
      };

      const exercisesWithRepsAndSets = ["upper-body", "back", "lowerbody"];

      const exercisesWithDistance = ["run", "cardio"];

      // Function to add the activity to the database and add it to the log
  const handleActivity = (e) => {

    e.preventDefault();

    setErrorNumSets(!selected);

    if (selected != null) {

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

      addActivity(activity);
    }
  }
  };

    return ( 
        <span>
            <EditIcon className="icon" />
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                  <form onSubmit={handleActivity}>
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
                required
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
                  required
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
                      required
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
                    {errorNumSets && <FormHelperText>Please select number of sets you did</FormHelperText>}
                  </FormControl>
                  {reps}
                </>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Add Activity</Button>
            </DialogActions>
            </form>
                  </Dialog>
        </span>

     );
}
 
export default EditActivity;
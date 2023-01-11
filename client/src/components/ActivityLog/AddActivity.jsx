import React from "react";
import { useState, useEffect } from "react";
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
  Typography
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { createExercise } from '../../features/exercise/exerciseSlice';

const AddActivity = (props) => {
  const { selectedDate } = props;

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [activityType, setActivityType] = useState("");
  const [showReps, setShowReps] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [amountOfReps, setAmountOfReps] = useState(new Array(10).fill(-1));
  const [weightsEachRep, setWeightsEachRep] = useState(new Array(10).fill(-1));

  // gets data from the form
  const [formData, setFormData] = useState({
    name: '',
    date: selectedDate.year.toString() + '-' + selectedDate.month.toString() + '-' + selectedDate.day.toString(),
    type: '',
    sets: -1,
    reps: [],
    weights: [],
    hours: -1,
    minutes: -1,
    seconds: -1,
    distance: -1
  });

  // Changes certain values depending on the activity type chosen
  const updateActivityType = (e) => {
    setActivityType(e.target.value);
    if (exercisesWithRepsAndSets.includes(e.target.value)) {
      setShowReps(true);
      setShowDuration(false);
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        "hours": -1,
        "minutes": -1,
        "seconds": -1,
        "distance": -1,
      }))
    } else {
      setShowReps(false);
      setShowDuration(true);
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        "sets": -1,
        "reps": [],
        "weights": [],
      }));
    }
  };

  // Handles changes in the textfield
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // To update the sets array
  const updateAmountOfReps = (e) => {
    let aoReps = [...amountOfReps];
    aoReps[parseInt(e.target.id)] = parseInt(e.target.value);
    setAmountOfReps(aoReps);
    setFormData((prevState) => ({
      ...prevState,
      "reps": aoReps.slice(0, formData.sets)
    }));
  };

  // To update the weights array
  const updateWeightsEachRep = (e) => {
    let weightsRep = [...weightsEachRep];
    weightsRep[parseInt(e.target.id)] = parseInt(e.target.value);
    setWeightsEachRep(weightsRep);
    setFormData((prevState) => ({
      ...prevState,
      "weights": weightsRep.slice(0, formData.sets)
    }));
  };

  let reps = [];

  for (let i = 0; i < formData.sets; i++) {
    reps.push(
      <div key={i} className="sets">
        <InputLabel id={(i+1).toString()}>{`Set ${(i+1).toString()}`}</InputLabel>
        <TextField
          autoFocus
          margin="normal"
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
          margin="normal"
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

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      "date": selectedDate.year.toString() + '-' + selectedDate.month.toString() + '-' + selectedDate.day.toString()
    }));
  }, [selectedDate]);

  const exercisesWithRepsAndSets = ["upper-body", "back", "lowerbody"];

  // Function to add the activity to the database and add it to the log
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setOpen(false);
    dispatch(createExercise(formData));
  };

  return (
    <div>
      <Button variant="text" onClick={() => setOpen(!open)}>
        Add Activity
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add An Activity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a workout you did.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            name="name"
            id="name"
            label="Activity Name"
            type="text"
            fullWidth
            variant="standard"
            required
            onChange={handleChange}
            multiline
          ></TextField>

          <FormControl fullWidth>
            <InputLabel id="type-activity">Type</InputLabel>
            <Select
              labelId="type-activity"
              value={activityType}
              defaultValue="Select"
              name="type"
              label="Type"
              sx={{ width: "300px" }}
              required
              onChange={updateActivityType}
            >
              <MenuItem value="upper-body">Upper Body</MenuItem>
              <MenuItem value="back">Back</MenuItem>
              <MenuItem value="lowerbody">Lower Body/Legs</MenuItem>
              <MenuItem value="run">Run</MenuItem>
            </Select>
          </FormControl>

          {showReps ? (
            <>
              <FormControl margin="normal" >
                <InputLabel id="amount-sets">Sets</InputLabel>
                <Select
                  labelId="amount-sets"
                  label="Sets"
                  name="sets"
                  value={formData.sets}
                  sx={{ width: "100px"}}
                  required
                  onChange={handleChange}
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
          { showDuration ? (
            <div className="sets" style={{ marginTop: "10px" }}>
            <InputLabel>
              <Typography>
                Run
                </Typography>
            </InputLabel>
            <TextField
              autoFocus
              margin="normal"
              label="Distance (miles)"
              name="distance"
              type="number"
              fullWidth
              required
              variant="standard"
              onChange={handleChange}
            ></TextField>
            <div className="time-input">
              <TextField
                autoFocus
                margin="normal"
                label="Hours"
                type="number"
                name="hours"
                required
                variant="standard"
                sx={{ width: 0.15 }}
                onChange={handleChange}
              ></TextField>
              <TextField
                autoFocus
                margin="normal"
                label="Minutes"
                type="number"
                name="minutes"
                required
                variant="standard"
                sx={{ width: 0.15 }}
                onChange={handleChange}
              ></TextField>
              <TextField
                autoFocus
                margin="normal"
                label="Seconds"
                type="number"
                name="seconds"
                required
                variant="standard"
                sx={{ width: 0.15 }}
                onChange={handleChange}
              ></TextField>
            </div>
          </div>
          ) : null
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Add Activity</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddActivity;

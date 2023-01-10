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
  FormHelperText,
  Typography
} from "@mui/material";
import { DateTime } from "luxon";
import { useSelector, useDispatch } from 'react-redux';
import { createExercise, reset } from '../../features/exercise/exerciseSlice';
import { toast } from 'react-toastify';

const AddActivity = (props) => {
  const { addActivity, selectedDate } = props;

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

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [showReps, setShowReps] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [theActivity, setTheActivity] = useState(defaultActivity);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [errorNumSets, setErrorNumSets] = useState(false);
  const [distance, setDistance] = useState(-1);
  const [time, setTime] = useState(-1);

  // gets data from the form
  const [formData, setFormData] = useState({
    name: '',
    date: selectedDate.year.toString() + '-' + selectedDate.month.toString() + '-' + selectedDate.day.toString(),
    type: '',
    sets: -1,
    reps: [],
    weights: [],
    time: -1,
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
        ["time"]: -1,
        ["distance"]: -1,
      }))
    } else {
      setShowReps(false);
      setShowDuration(true);
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        ["sets"]: -1,
        ["reps"]: [],
        ["weights"]: []
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

  let amountOfReps = [];
  let weightsEachRep = [];

  // To update the sets array
  const updateAmountOfReps = (e) => {
    amountOfReps[parseInt(e.target.id)] = +parseInt(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      ["reps"]: amountOfReps
    }));

    console.log(amountOfReps);
    console.log(formData.reps);
    console.log([1,2,3,4]);
  };

  // To update the weights array
  const updateWeightsEachRep = (e) => {
    weightsEachRep[parseInt(e.target.id)] = parseInt(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      ["weights"]: weightsEachRep
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

  const exercisesWithRepsAndSets = ["upper-body", "back", "lowerbody"];

  // Function to add the activity to the database and add it to the log
  const handleSubmit = (e) => {
    e.preventDefault(); 

    dispatch(createExercise(formData));
  };

  const {exercises, isLoading, isError, isSuccess, message} = useSelector((state) => state.exercise);

  // when a request is made
  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else {
      setOpen(false);
    }

    dispatch(reset());


  }, [exercises, isError, isSuccess, message, dispatch])


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
                {errorNumSets && <FormHelperText>Please select number of sets you did</FormHelperText>}
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
            <TextField
              autoFocus
              margin="normal"
              label="Time (min)"
              type="number"
              name="time"
              required
              fullWidth
              variant="standard"
              onChange={handleChange}
            ></TextField>
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

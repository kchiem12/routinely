import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import './css/dashboard.css';
import AccessDenied from "./AccessDenied.jsx";
import { StyledEngineProvider } from "@mui/material";
import { Grid } from "@mui/material";
import WorkoutListDisplay from "../components/WorkoutListDisplay/index.jsx";
import { useSelector } from "react-redux";

const WorkoutList = () => {

  const { user } = useSelector((state) => state.auth);

  let workoutList = [];

  for (let i = 0; i < 10; i++) {
    workoutList.push(
      <Grid item xs={3.5} md={3.5} lg={3.5} className="grid-container">
        <WorkoutListDisplay />
      </Grid>
    );
  }

  return (
    <>
    {
      user ? (
        <>
      <Topbar />
      <div className="sidemenu-container">
        <Sidebar />
        <StyledEngineProvider injectFirst>
                <Grid container spacing={1} alignItems="center">
                    {workoutList}
                </Grid>
            </StyledEngineProvider>
      </div>
      </>
      ) : (<AccessDenied />)
}
</>
  );
};

export default WorkoutList;

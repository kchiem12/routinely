import React from "react";
import { useState } from "react";
import withRouter from "../components/withRouter.js";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import Overview from "../components/Overview";
import './dashboard.css';
import {AuthorizedUserCont, withAuthentication} from "../components/Session";
import AccessDenied from "./AccessDenied.jsx";
import { auth } from "../Firebase.js";
import { StyledEngineProvider } from "@mui/material";
import { Grid } from "@mui/material";
import WorkoutListDisplay from "../components/WorkoutListDisplay/index.jsx";

const user = auth.currentUser;

const WorkoutList = () => {

  auth.onAuthStateChanged(user => {
    if (user) {
      localStorage.setItem('user', true);
    } else {
      localStorage.removeItem('user');
    }
  })

  const userLocal = JSON.parse(localStorage.getItem('user'));
  const [filter, setFilter] = useState(null);

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
      userLocal ? (
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

export default withRouter(withAuthentication(WorkoutList));

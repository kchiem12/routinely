import React from "react";
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

  return (
    <>
    {
      userLocal ? (
        <>
      <Topbar />
      <div className="sidemenu-container">
        <Sidebar />
        <StyledEngineProvider injectFirst>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={12} lg={12} className="grid-container">
                        
                    </Grid>
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

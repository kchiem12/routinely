import React from "react";
import './sidebar.css';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { auth } from "../../Firebase";
import withRouter from "../withRouter.js";
// import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {

  const { location, navigate, params} = props.router;

  const signOut = () => {
    auth.signOut();
    navigate('/');
  }

  const navWorkoutList = () => {
    navigate('/dashboard/workoutlist');
  }

  const navOverview = () => {
    navigate('/dashboard');
  }

  return (
    <div className="sidebar">
        <div className="side-wrapper">
          <div className="sidebar-menu">
            <h4 className="title-side">Dashboard</h4>
            <ul className="sidebar-list">
              <li className="sidebar-list-item">
                <WysiwygIcon className="sidebar-icons" onClick={navOverview} />
                Overview
              </li>
              <li className="sidebar-list-item" onClick={navWorkoutList}>
                <FitnessCenterIcon className="sidebar-icons" />
                Workouts
              </li>
              <li className="sidebar-list-item" onClick={signOut}>
                <ExitToAppIcon className="sidebar-icons" />
                Sign Out
              </li>
            </ul>
          </div>
        </div>
    </div>

  );
};

export default withRouter(Sidebar);

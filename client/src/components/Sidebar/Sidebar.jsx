import React from "react";
import './sidebar.css';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from "react-router-dom";
import {useDispatch } from 'react-redux';
import {logout, reset} from '../../features/auth/authSlice';

const Sidebar = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = async () => {
    await dispatch(logout());
    await dispatch(reset());
    navigate('/');
  }

  return (
    <div className="sidebar">
        <div className="side-wrapper">
          <div className="sidebar-menu">
            <h4 className="title-side">Dashboard</h4>
            <ul className="sidebar-list">
              <li >
                <Link to={'/dashboard'} className="sidebar-list-item">
                  <WysiwygIcon className="sidebar-icons" />
                  Overview
                </Link>
              </li>
              <li >
                <Link to={'/dashboard'} className="sidebar-list-item">
                  <FitnessCenterIcon className="sidebar-icons" />
                  Workouts
                </Link>
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

export default Sidebar;

import React from "react";
import './sidebar.css';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Sidebar = ({ items }) => {
  return (
    <div className="sidebar">
        <div className="side-wrapper">
          <div className="sidebar-menu">
            <h4 className="title-side">Dashboard</h4>
            <ul className="sidebar-list">
              <li className="sidebar-list-item">
                <WysiwygIcon className="sidebar-icons" />
                Overview
              </li>
              <li className="sidebar-list-item">
                <FitnessCenterIcon className="sidebar-icons" />
                Workouts
              </li>
            </ul>
          </div>
        </div>
    </div>

  );
};

export default Sidebar;

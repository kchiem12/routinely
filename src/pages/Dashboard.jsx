import React from "react";
import withRouter from "../components/withrouter";
import Sidebar from "../components/Sidebar/sidebar";
import Topbar from "../components/Topbar/Topbar";
import './dashboard.css';

const sidebarItems = [
  { name: "home", label: "Home" },
  { name: "workouts", label: "Workout List" },
];

const Dashboard = () => {
  return (
    <>
      <Topbar />
      <div className="sidemenu-container">
        <Sidebar />
        <div className="content">hello world!</div>
      </div>
    </>
  );
};

export default withRouter(Dashboard);

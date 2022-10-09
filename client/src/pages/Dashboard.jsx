import React from "react";
import withRouter from "../components/withRouter.js";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import Overview from "../components/Overview";
import './dashboard.css';
import {AuthorizedUserCont, withAuthentication} from "../components/Session";
import AccessDenied from "./AccessDenied.jsx";
import { auth } from "../Firebase.js";

const user = auth.currentUser;

const Dashboard = () => {


  // TODO: Overhaul this entire mess of authentication and storing session status
  const userLocal = JSON.parse(localStorage.getItem('user'));

  // This is to store the fact that the user is logged into the site
  auth.onAuthStateChanged(user => {
    if (user) {
      localStorage.setItem('user', true);
    } else {
      localStorage.removeItem('user');
    }
  })

  return (
    <>
    {
      userLocal ? (
        <>
      <Topbar />
      <div className="sidemenu-container">
        <Sidebar />
        <Overview authUser={user}/>
      </div>
      </>
      ) : (<AccessDenied />)
}
</>
  );
};

export default withRouter(withAuthentication(Dashboard));

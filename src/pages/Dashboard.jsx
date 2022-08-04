import React from "react";
import withRouter from "../components/withRouter.js";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import Overview from "./Overview";
import './dashboard.css';
import {AuthorizedUserCont, withAuthentication} from "../components/Session";
import { auth } from "../Firebase.js";


const Dashboard = () => {

  return (
    <AuthorizedUserCont.Consumer>
      { authUser => authUser ? (
        <>
      <Topbar />
      <div className="sidemenu-container">
        <Sidebar />
        <Overview />
      </div>
      </>
      ) : (<p>Bruh moment</p>)
}
    </AuthorizedUserCont.Consumer>
  );
};

export default withRouter(withAuthentication(Dashboard));

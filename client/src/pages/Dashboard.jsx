import {React} from "react";
import withRouter from "../components/withRouter.js";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import Overview from "../components/Overview";
import './dashboard.css';
import {AuthorizedUserCont, withAuthentication} from "../components/Session";
import AccessDenied from "./AccessDenied.jsx";
import { auth } from "../Firebase.js";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const user = auth.currentUser;

const Dashboard = () => {


  const {user} = useSelector((state) => state.auth);

  return (
    <>
    {user ? (
        <>
      <Topbar />
      <div className="sidemenu-container">
        <Sidebar />
        <Overview authUser={user}/>
      </div>
      <ToastContainer></ToastContainer>
      </>
      ) : (<AccessDenied />)}
</>
  );
};

export default withRouter(withAuthentication(Dashboard));

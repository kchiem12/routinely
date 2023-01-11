import {React, useEffect} from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import Overview from "../components/Overview";
import './css/dashboard.css';
import AccessDenied from "./AccessDenied.jsx";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getExercises, reset } from "../features/exercise/exerciseSlice";
import {toast} from 'react-toastify';



const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const { isError, message } = useSelector((state) => state.exercise); 

  useEffect(() => {

    if (isError) {
      toast.error(message);
    }
    if (user === null) {
      dispatch(reset());
    } else {
      dispatch(getExercises());
    }

  }, [user, navigate, isError, message, dispatch]);

  return (
    <>
    {user ? (
        <>
      <Topbar />
      <div className="sidemenu-container">
        <Sidebar />
        <Overview />
      </div>
      <ToastContainer></ToastContainer>
      </>
      ) : (<AccessDenied />)}
</>
  );
};

export default Dashboard;

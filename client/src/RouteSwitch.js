import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard"
import WorkoutList from "./pages/WorkoutList";


// Handles the routing between each page
const RouteSwitch = () => {
    return ( 
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/workoutlist" element={<WorkoutList />} />
                </Routes>
        </BrowserRouter>
     );
}
 
export default RouteSwitch;
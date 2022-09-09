import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from './configuration/theme.config';
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard"
import WorkoutList from "./pages/WorkoutList";

const RouteSwitch = () => {
    return ( 
        <BrowserRouter>
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/dashboard/workoutlist" element={<WorkoutList />} />
            </Routes>
            </ThemeProvider>
        </BrowserRouter>
     );
}
 
export default RouteSwitch;
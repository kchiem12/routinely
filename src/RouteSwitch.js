import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from './configuration/theme.config';
import SignUp from "./pages/SignUp";

const RouteSwitch = () => {
    return ( 
        <BrowserRouter>
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
            </ThemeProvider>
        </BrowserRouter>
     );
}
 
export default RouteSwitch;
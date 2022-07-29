import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from './configuration/theme.config';

const RouteSwitch = () => {
    return ( 
        <BrowserRouter>
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<App />}>
                </Route>
                <Route path="/sign-up" element={<h1>Sign Up Page</h1>}>
                </Route>
            </Routes>
            </ThemeProvider>
        </BrowserRouter>
     );
}
 
export default RouteSwitch;
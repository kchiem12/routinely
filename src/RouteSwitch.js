import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

const RouteSwitch = () => {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                </Route>
                <Route path="/sign-up" element={<h1>Sign Up Page</h1>}>
                </Route>
            </Routes>
        </BrowserRouter>
     );
}
 
export default RouteSwitch;
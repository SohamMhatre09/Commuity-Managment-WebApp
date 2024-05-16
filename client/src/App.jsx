import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./AppBar";
import SignUpPage from "./SignUpPage";
import LogInPage from "./LogInPage";
import AllEvents from "./AllEvents";
import SpecificEvent from "./SpecificEvent";
import CreateYourEvent from "./CreateYourEvent";
import YourEvents from "./YourEvents";
import "./index.css";
import LandingPage from "./LandingPage";
import bgimage from "./images/background.jpg";

export default function App() {
  return (
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${bgimage})`, // corrected backgroundImage assignment
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        overflow: "auto",
      }}
    >
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/user/event/:eventid" element={<SpecificEvent />} />
          <Route path="/createyourevent" element={<CreateYourEvent />} />
          <Route path="/myevents" element={<YourEvents />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

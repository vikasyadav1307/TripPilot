import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import ExploreTrips from "./pages/ExploreTrips";
import MyTrips from "./pages/MyTrips";
import CalendarSync from "./pages/CalendarSync";
import MyCalendar from "./pages/MyCalendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/explore-trips" element={<ExploreTrips />} />
        <Route path="/dashboard/my-trips" element={<MyTrips />} />
        <Route path="/dashboard/calendar-sync" element={<CalendarSync />} />
        <Route path="/dashboard/my-calendar" element={<MyCalendar />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


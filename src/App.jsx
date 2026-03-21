import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import ExploreTrips from "./pages/ExploreTrips";
import MyTrips from "./pages/MyTrips";
import CalendarSync from "./pages/CalendarSync";
import MyCalendar from "./pages/MyCalendar";
import AIPlanner from "./pages/AIPlanner";
import AccountSettings from "./pages/AccountSettings";

const isAuthenticated = () => {
  try {
    const currentUser = sessionStorage.getItem('currentUser');
    return Boolean(currentUser);
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/explore-trips" element={<ProtectedRoute><ExploreTrips /></ProtectedRoute>} />
        <Route path="/dashboard/my-trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
        <Route path="/dashboard/calendar-sync" element={<ProtectedRoute><CalendarSync /></ProtectedRoute>} />
        <Route path="/dashboard/my-calendar" element={<ProtectedRoute><MyCalendar /></ProtectedRoute>} />
        <Route path="/ai-planner" element={<AIPlanner />} />
        <Route path="/account-settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


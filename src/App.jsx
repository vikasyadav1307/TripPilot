import { Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import ExploreTrips from "./pages/ExploreTrips";
import MyTrips from "./pages/MyTrips";
import CalendarSync from "./pages/CalendarSync";
import MyCalendar from "./pages/MyCalendar";
import AIPlanner from "./pages/AIPlanner";
import Hotels from "./pages/Hotels";
import AccountSettings from "./pages/AccountSettings";
import DestinationDetails from "./pages/DestinationDetails";
import DashboardLayout from "./components/DashboardLayout";

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="explore-trips" element={<ExploreTrips />} />
        <Route path="my-trips" element={<MyTrips />} />
        <Route path="calendar-sync" element={<CalendarSync />} />
        <Route path="my-calendar" element={<MyCalendar />} />
      </Route>
      <Route path="/ai-planner" element={<AIPlanner />} />
      <Route
        path="/hotels"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Hotels />} />
      </Route>
      <Route path="/destination/:id" element={<DestinationDetails />} />
      <Route path="/account-settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;


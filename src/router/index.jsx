import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ExploreTrips from "./pages/ExploreTrips";
import MyTrips from "./pages/MyTrips";
import MyCalendar from "./pages/MyCalendar";

<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>

    <Route index element={<Dashboard />} />
    <Route path="explore-trips" element={<ExploreTrips />} />
    <Route path="my-trips" element={<MyTrips />} />
    <Route path="my-calendar" element={<MyCalendar />} />

  </Route>
</Routes>
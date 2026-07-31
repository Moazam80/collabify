import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import Feed from "./pages/Feed";
import Dashboard from "./pages/Dashboard";
import MyProjects from "./pages/MyProjects";
import JoinedProjects from "./pages/JoinedProjects";
import JoinRequests from "./pages/JoinRequests";
import Activity from "./pages/Activity";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/projects/:id/edit" element={<EditProject />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/feed" element={<Feed />} />

        {/* Dashboard routes — all share the Sidebar layout */}
        {/* Dashboard routes — all share the Sidebar layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="my-projects" element={<MyProjects />} />
          <Route path="joined" element={<JoinedProjects />} />
          <Route path="requests" element={<JoinRequests />} />
          <Route path="activity" element={<Activity />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  Box
} from "@mui/material";

import { useMemo } from "react";

import getTheme from "./theme";

import {
  ThemeProvider,
  useThemeContext
} from "./context/ThemeContext";

import { SnackbarProvider } from "./context/SnackbarContext";
import GovJobs from "./pages/GovJobs";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import ResumeImprovement from "./pages/ResumeImprovement";
import ResumeBuilder from "./pages/ResumeBuilder";
import VideoResume from "./pages/VideoResume";
import Marketplace from "./pages/Marketplace";
import PeerMentorship from "./pages/PeerMentorship";
import CareerRoadmap from "./pages/CareerRoadmap";
import JobMatch from "./pages/JobMatch";
import CoverLetter from "./pages/CoverLetter";
import InterviewPrep from "./pages/InterviewPrep";
import MockInterview from "./pages/MockInterview";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import AbroadStudies from "./pages/AbroadStudies";
import NotFound from "./pages/NotFound";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import EmployerRegister from "./pages/EmployerRegister";
import EmployerLogin from "./pages/EmployerLogin";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerLayoutWrapper from "./components/EmployerLayoutWrapper";

import PostJob from "./pages/PostJob";
import EditJob from "./pages/EditJob";
import EmployerJobs from "./pages/EmployerJobs";

import CompanyProfile from "./pages/employer/CompanyProfile";
import EmployerApplicants from "./pages/EmployerApplicants";

function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      <MainLayout>
        {children}
      </MainLayout>
    </ProtectedRoute>
  );
}

function AppContent() {
  const { mode } = useThemeContext();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Box
          sx={{
            minHeight: "100vh",
            width: "100%",
            bgcolor: "background.default",
            color: "text.primary",
            overflowX: "hidden",
          }}
        >
          <BrowserRouter>
            <Routes>
              {/* Landing */}
              <Route path="/" element={<Home />} />

              {/* Public Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

              <Route path="/employer/register" element={<EmployerRegister />} />
              <Route path="/employer/login" element={<EmployerLogin />} />

              {/* Employer Nested Routes */}
              <Route path="/employer" element={<EmployerLayoutWrapper />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<EmployerDashboard />} />
                <Route path="jobs" element={<EmployerJobs />} />
                <Route path="post-job" element={<PostJob />} />
                <Route path="jobs/edit/:id" element={<EditJob />} />
                <Route path="applicants" element={<EmployerApplicants />} />
                <Route path="profile" element={<CompanyProfile />} />
              </Route>

              {/* Student Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedLayout>
                    <Dashboard />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/applications"
                element={
                  <ProtectedLayout>
                    <Applications />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/gov-jobs"
                element={
                  <ProtectedLayout>
                    <GovJobs />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/abroad"
                element={
                  <ProtectedLayout>
                    <AbroadStudies />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/resume-upload"
                element={
                  <ProtectedLayout>
                    <ResumeUpload />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/resume-analysis"
                element={
                  <ProtectedLayout>
                    <ResumeAnalysis />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/resume-improvement"
                element={
                  <ProtectedLayout>
                    <ResumeImprovement />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/resume-builder"
                element={
                  <ProtectedLayout>
                    <ResumeBuilder />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/video-resume"
                element={
                  <ProtectedLayout>
                    <VideoResume />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/marketplace"
                element={
                  <ProtectedLayout>
                    <Marketplace />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/mentorship"
                element={
                  <ProtectedLayout>
                    <PeerMentorship />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/roadmap"
                element={
                  <ProtectedLayout>
                    <CareerRoadmap />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/job-match"
                element={
                  <ProtectedLayout>
                    <JobMatch />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/cover-letter"
                element={
                  <ProtectedLayout>
                    <CoverLetter />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/interview-prep"
                element={
                  <ProtectedLayout>
                    <InterviewPrep />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/mock-interview"
                element={
                  <ProtectedLayout>
                    <MockInterview />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/jobs"
                element={
                  <ProtectedLayout>
                    <Jobs />
                  </ProtectedLayout>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedLayout>
                    <Profile />
                  </ProtectedLayout>
                }
              />

              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
import { useState, Suspense } from "react";
import { Login } from "./components/Login";
import { Layout } from "./components/Layout";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { ManagerDashboard } from "./components/ManagerDashboard";
import { HRDashboard } from "./components/HRDashboard";
import { ProfilePage } from "./components/pages/ProfilePage";
import { TasksPage } from "./components/pages/TasksPage";
import { AnalyticsPage } from "./components/pages/AnalyticsPage";
import { TeamManagementPage } from "./components/pages/TeamManagementPage";
import { TimesheetPage } from "./components/pages/TimesheetPage";
import { EmployeeManagementPage } from "./components/pages/EmployeeManagementPage";
import { HRReportsPage } from "./components/pages/HRReportsPage";
import { ProjectManagementPage } from "./components/pages/ProjectManagementPage";
import { GoalsPage } from "./components/pages/GoalsPage";
import { AttendanceManagementPage } from "./components/pages/AttendanceManagementPage";
import { Button } from "./components/ui/button";
import { mockEmployees } from "./data/mockData";
import { Employee } from "./types";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-muted-foreground">
        Loading AI Employee Monitor...
      </p>
    </div>
  </div>
);

export default function App() {
  const [currentUser, setCurrentUser] =
    useState<Employee | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (
    userId: string,
    role: "employee" | "manager" | "hr",
  ) => {
    setIsLoading(true);
    try {
      // Simulate API call delay for realistic experience
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = mockEmployees.find(
        (emp) => emp.id === userId,
      );
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setCurrentPage("dashboard");
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Login error:", error);
      // In a real app, you'd show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleCheckIn = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        isCheckedIn: true,
        checkInTime: new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setCurrentUser(updatedUser);
    }
  };

  const handleCheckOut = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        isCheckedIn: false,
        checkOutTime: new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setCurrentUser(updatedUser);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoggedIn || !currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "profile":
        return <ProfilePage currentUser={currentUser} />;

      case "analytics":
        return <AnalyticsPage currentUser={currentUser} />;

      // Employee specific pages
      case "tasks":
        return currentUser.role === "employee" ? (
          <TasksPage currentUser={currentUser} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl mb-4">Access Denied</h2>
            <p className="text-muted-foreground">
              This page is only available to employees.
            </p>
          </div>
        );

      case "goals":
        return currentUser.role === "employee" ? (
          <GoalsPage currentUser={currentUser} />
        ) : null;

      case "timesheet":
        return currentUser.role === "employee" ? (
          <TimesheetPage currentUser={currentUser} />
        ) : null;

      // Manager specific pages
      case "team":
        return currentUser.role === "manager" ? (
          <TeamManagementPage currentUser={currentUser} />
        ) : null;

      case "projects":
        return ["manager", "hr"].includes(currentUser.role) ? (
          <ProjectManagementPage currentUser={currentUser} />
        ) : null;

      case "performance":
        return ["manager", "hr"].includes(currentUser.role) ? (
          <div className="text-center py-12">
            <h2 className="text-xl mb-4">
              Performance Management
            </h2>
            <p className="text-muted-foreground">
              Performance page coming soon...
            </p>
          </div>
        ) : null;

      case "attendance":
        return currentUser.role === "manager" ? (
          <AttendanceManagementPage currentUser={currentUser} />
        ) : null;

      // HR specific pages
      case "employees":
        return currentUser.role === "hr" ? (
          <EmployeeManagementPage currentUser={currentUser} />
        ) : null;

      case "reports":
        return currentUser.role === "hr" ? (
          <HRReportsPage currentUser={currentUser} />
        ) : null;

      case "settings":
        return currentUser.role === "hr" ? (
          <div className="text-center py-12">
            <h2 className="text-xl mb-4">HR Settings</h2>
            <p className="text-muted-foreground">
              Settings page coming soon...
            </p>
          </div>
        ) : null;

      case "dashboard":
      default:
        // Render appropriate dashboard based on role
        switch (currentUser.role) {
          case "employee":
            return (
              <EmployeeDashboard
                employee={currentUser}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
              />
            );
          case "manager":
            return <ManagerDashboard manager={currentUser} />;
          case "hr":
            return <HRDashboard hrUser={currentUser} />;
          default:
            return null;
        }
    }
  };

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Layout
          currentUser={currentUser}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onLogout={handleLogout}
        >
          {renderPage()}
        </Layout>
      </Suspense>
    </ErrorBoundary>
  );
}
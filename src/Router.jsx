import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { PageLoader } from "./components";
import Dashboard from "./pages/Dashboard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserService } from "./services/UserService";
import toast from "./utils/toast";
import Project from "./pages/Project";

export default function Router() {
  const auth = getAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setIsLoading(false);
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/project/:id/*" element={<Project />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import Overview from "./components/Overview";
import Navbar from "./components/Navbar";
import ProfileForm from "./components/ProfileForm";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import { SnackbarContainer } from "./components/ui/snackbar";

// Theme Context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default to dark theme
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Update document title
    document.title = isDark ? "TaskFlow Pro - Dark Mode" : "TaskFlow Pro - Light Mode";
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SnackbarContainer>
        <BrowserRouter>
          <div className={`min-h-screen transition-colors duration-300 ${
            isDark 
              ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
              : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
          }`}>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route
                  path="/projects/:projectId"
                  element={<ProjectDetailsPage />}
                />
                <Route path="/profile" element={<ProfileForm />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </SnackbarContainer>
    </ThemeContext.Provider>
  );
}

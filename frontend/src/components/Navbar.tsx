import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useTheme } from "../App";
import {
  Menu,
  X,
  UserCircle2,
  LogOut,
  Trash2,
  CheckSquare,
  Settings,
  Bell,
  Search,
  Sun,
  Moon,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/use-toast";
import { deleteAccount } from "../api/api";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteAccount();
      localStorage.removeItem("token");
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-3 text-xl font-bold hover:scale-105 transition-transform"
        >
          <div className="p-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              TaskFlow Pro
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
              Work Smarter, Not Harder
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Search Bar */}
              <div className="hidden md:flex items-center space-x-2 bg-white/50 dark:bg-slate-700/50 rounded-xl px-4 py-2 border border-white/20 dark:border-slate-600/50">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search workflows, tasks..."
                  className="bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 w-48"
                />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/"
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-xl transition-all duration-300"
                >
                  Workspace
                </Link>
                <Link
                  to="/projects"
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-xl transition-all duration-300"
                >
                  Workflows
                </Link>
                <Link
                  to="/tasks"
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-xl transition-all duration-300"
                >
                  Tasks
                </Link>
                <Link
                  to="/overview"
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-xl transition-all duration-300"
                >
                  Analytics
                </Link>
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hidden md:flex hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-xl"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                )}
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-xl relative"
              >
                <Bell className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>

              {/* User Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDropdown(!dropdown)}
                  className="hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-xl"
                >
                  <UserCircle2 className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                </Button>

                <AnimatePresence>
                  {dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-2xl z-50"
                    >
                      <div className="p-2 space-y-1">
                        <Link
                          to="/profile"
                          className="flex items-center w-full px-4 py-3 text-sm rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-300 text-slate-700 dark:text-slate-300"
                          onClick={() => setDropdown(false)}
                        >
                          <Settings className="mr-3 h-4 w-4" />
                          Account Settings
                        </Link>
                        <button
                          onClick={logout}
                          className="flex items-center w-full px-4 py-3 text-sm rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-300 text-slate-700 dark:text-slate-300"
                        >
                          <LogOut className="mr-3 h-4 w-4" />
                          Sign Out
                        </button>
                        <div className="border-t border-white/20 dark:border-slate-600/50 my-2"></div>
                        <button
                          onClick={handleDeleteAccount}
                          disabled={isDeleting}
                          className="flex items-center w-full px-4 py-3 text-sm rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all duration-300 disabled:opacity-50"
                        >
                          <Trash2 className="mr-3 h-4 w-4" />
                          {isDeleting ? "Deleting..." : "Delete Account"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-xl"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                {mobileMenu ? (
                  <X className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                ) : (
                  <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                )}
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hover:bg-white/50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/20 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-2">
              <Link
                to="/"
                className="block px-4 py-3 text-sm rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-300 text-slate-700 dark:text-slate-300"
                onClick={() => setMobileMenu(false)}
              >
                Workspace
              </Link>
              <Link
                to="/projects"
                className="block px-4 py-3 text-sm rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-300 text-slate-700 dark:text-slate-300"
                onClick={() => setMobileMenu(false)}
              >
                Workflows
              </Link>
              <Link
                to="/tasks"
                className="block px-4 py-3 text-sm rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-300 text-slate-700 dark:text-slate-300"
                onClick={() => setMobileMenu(false)}
              >
                Tasks
              </Link>
              <Link
                to="/overview"
                className="block px-4 py-3 text-sm rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-300 text-slate-700 dark:text-slate-300"
                onClick={() => setMobileMenu(false)}
              >
                Analytics
              </Link>
              <div className="border-t border-white/20 dark:border-slate-600/50 my-2"></div>
              <Link
                to="/profile"
                className="block px-4 py-3 text-sm rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-300 text-slate-700 dark:text-slate-300"
                onClick={() => setMobileMenu(false)}
              >
                Account Settings
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-3 text-sm rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-300 text-slate-700 dark:text-slate-300"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { useState } from "react";
import { getAllProjects, getAllTasks } from "../api/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  ListChecks,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Archive,
  Calendar,
  Users,
  Plus,
  Search,
  Filter,
  BarChart3,
  Target,
  Zap,
  Star,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Rocket,
  Zap as Lightning,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });

  const isLoading = projectsLoading || tasksLoading;

  // Calculate statistics
  const stats = {
    totalProjects: Array.isArray(projects) ? projects.length : 0,
    totalTasks: Array.isArray(tasks) ? tasks.length : 0,
    completedTasks: Array.isArray(tasks)
      ? tasks.filter((task: any) => task.status === "COMPLETED").length
      : 0,
    pendingTasks: Array.isArray(tasks)
      ? tasks.filter((task: any) => task.status === "PENDING").length
      : 0,
    inProgressTasks: Array.isArray(tasks)
      ? tasks.filter((task: any) => task.status === "IN_PROGRESS").length
      : 0,
    activeProjects: Array.isArray(projects)
      ? projects.filter(
          (project: any) =>
            project.status === "ACTIVE" || project.status === "IN_PROGRESS"
        ).length
      : 0,
    completedProjects: Array.isArray(projects)
      ? projects.filter((project: any) => project.status === "COMPLETED").length
      : 0,
  };

  const completionRate =
    stats.totalTasks > 0
      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
      : 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case "IN_PROGRESS":
        return <PlayCircle className="h-4 w-4 text-blue-500" />;
      case "PENDING":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "ACTIVE":
        return <AlertCircle className="h-4 w-4 text-emerald-500" />;
      case "INACTIVE":
        return <Archive className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/20 dark:border-emerald-800";
      case "IN_PROGRESS":
        return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800";
      case "PENDING":
        return "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-900/20 dark:border-amber-800";
      case "ACTIVE":
        return "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/20 dark:border-emerald-800";
      case "INACTIVE":
        return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800";
    }
  };

  const recentProjects = Array.isArray(projects) ? projects.slice(0, 3) : [];
  const recentTasks = Array.isArray(tasks) ? tasks.slice(0, 5) : [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading your workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Welcome to your Workspace! ⚡
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Streamline your workflow and boost productivity with TaskFlow Pro
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <Rocket className="h-4 w-4 mr-2" />
                Launch Workflow
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Active Workflows
              </CardTitle>
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {stats.totalProjects}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {stats.activeProjects} running • {stats.completedProjects} completed
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Total Tasks
              </CardTitle>
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                <ListChecks className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {stats.totalTasks}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {stats.completedTasks} completed • {stats.pendingTasks} pending
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Success Rate
              </CardTitle>
              <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {completionRate}%
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {stats.completedTasks} of {stats.totalTasks} tasks completed
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
                In Progress
              </CardTitle>
              <div className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg group-hover:scale-110 transition-transform">
                <Lightning className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {stats.inProgressTasks}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Tasks currently being executed
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-slate-700/50"
      >
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search workflows, tasks, or team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-white/20 dark:border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-slate-700 dark:text-slate-300 placeholder-slate-400"
            />
          </div>
          <Button variant="outline" className="border-white/20 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-600/50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </motion.div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Workflows */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-slate-900 dark:text-white">Recent Workflows</CardTitle>
                <Link to="/projects">
                  <Button variant="outline" size="sm" className="border-white/20 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-600/50">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentProjects.length === 0 ? (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                  <Rocket className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">No workflows yet</p>
                  <Button className="mt-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Workflow
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentProjects.map((project: any, index: number) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="group bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-slate-600/50 hover:bg-white/70 dark:hover:bg-slate-600/50 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                            {getStatusIcon(project.status)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">{project.name}</p>
                            <span
                              className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(
                                project.status
                              )}`}
                            >
                              {project.status.replace("_", " ").toLowerCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link to={`/projects/${project.id}`}>
                            <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-slate-900 dark:text-white">Recent Tasks</CardTitle>
                <Link to="/tasks">
                  <Button variant="outline" size="sm" className="border-white/20 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-600/50">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentTasks.length === 0 ? (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                  <Lightning className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">No tasks yet</p>
                  <Button className="mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentTasks.map((task: any, index: number) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="group bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-slate-600/50 hover:bg-white/70 dark:hover:bg-slate-600/50 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                            {getStatusIcon(task.status)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">{task.name}</p>
                            <span
                              className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(
                                task.status
                              )}`}
                            >
                              {task.status.replace("_", " ").toLowerCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50"
      >
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white h-16 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
            <Rocket className="h-5 w-5 mr-2" />
            Launch Workflow
          </Button>
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white h-16 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
            <Lightning className="h-5 w-5 mr-2" />
            Create Task
          </Button>
          <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white h-16 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
            <BarChart3 className="h-5 w-5 mr-2" />
            View Analytics
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { getAllProjects, getAllTasks } from "../api/api";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Zap,
  Rocket,
  Users,
} from "lucide-react";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

const Overview = () => {
  const { data: projects = [] } = useQuery<any[]>({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  const { data: tasks = [] } = useQuery<any[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await getAllTasks();
      return response.data;
    },
  });

  const stats = useMemo(() => {
    const statusCount = {
      Workflow: {
        PENDING: 0,
        IN_PROGRESS: 0,
        INACTIVE: 0,
        COMPLETED: 0,
        ACTIVE: 0,
      },
      Task: {
        PENDING: 0,
        IN_PROGRESS: 0,
        INACTIVE: 0,
        COMPLETED: 0,
        ARCHIVED: 0,
        ACTIVE: 0,
      },
    };

    const projectList = Array.isArray(projects) ? projects : [];
    const taskList = Array.isArray(tasks) ? tasks : [];

    projectList.forEach((p: any) => {
      if (p.status in statusCount.Workflow) {
        statusCount.Workflow[p.status as keyof typeof statusCount.Workflow]++;
      }
    });

    taskList.forEach((t: any) => {
      if (t.status in statusCount.Task) {
        statusCount.Task[t.status as keyof typeof statusCount.Task]++;
      }
    });

    return (
      Object.keys(statusCount) as Array<keyof typeof statusCount>
    ).flatMap((type) =>
      Object.entries(statusCount[type]).map(([status, count]) => ({
        type,
        status,
        count,
      }))
    );
  }, [projects, tasks]);

  const taskStats = useMemo(() => {
    const taskList = Array.isArray(tasks) ? tasks : [];
    const statusCount = {
      PENDING: 0,
      IN_PROGRESS: 0,
      COMPLETED: 0,
      ACTIVE: 0,
      ARCHIVED: 0,
    };

    taskList.forEach((t: any) => {
      if (t.status in statusCount) {
        statusCount[t.status as keyof typeof statusCount]++;
      }
    });

    return Object.entries(statusCount).map(([status, count]) => ({
      name: status.replace("_", " "),
      value: count,
    }));
  }, [tasks]);

  const projectProgress = useMemo(() => {
    const projectList = Array.isArray(projects) ? projects : [];
    const taskList = Array.isArray(tasks) ? tasks : [];

    return projectList
      .map((project: any) => {
        const projectTasks = taskList.filter(
          (task: any) => task.projectId === project.id
        );
        const completedTasks = projectTasks.filter(
          (task: any) => task.status === "COMPLETED"
        ).length;
        const totalTasks = projectTasks.length;
        const progress =
          totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        return {
          name: project.name,
          progress: Math.round(progress),
          totalTasks,
          completedTasks,
        };
      })
      .slice(0, 5); // Show top 5 projects
  }, [projects, tasks]);

  const weeklyProgress = useMemo(() => {
    // Simulate weekly progress data
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const taskList = Array.isArray(tasks) ? tasks : [];
    const completedTasks = taskList.filter(
      (t: any) => t.status === "COMPLETED"
    ).length;

    return days.map((day, index) => ({
      day,
      completed: Math.floor(Math.random() * 10) + 1,
      total: Math.floor(Math.random() * 15) + 5,
    }));
  }, [tasks]);

  const completionRate = useMemo(() => {
    const taskList = Array.isArray(tasks) ? tasks : [];
    const completedTasks = taskList.filter(
      (t: any) => t.status === "COMPLETED"
    ).length;
    return taskList.length > 0
      ? Math.round((completedTasks / taskList.length) * 100)
      : 0;
  }, [tasks]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case "IN_PROGRESS":
        return <Activity className="h-4 w-4 text-blue-500" />;
      case "PENDING":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "ACTIVE":
        return <AlertCircle className="h-4 w-4 text-emerald-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Analytics Dashboard 📊
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Data-driven insights to optimize your workflow performance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/50 dark:bg-slate-700/50 rounded-xl px-4 py-2 border border-white/20 dark:border-slate-600/50">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {completionRate}% success rate
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Active Workflows
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {projects.length}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Tasks</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                    {tasks.length}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Success Rate
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                    {completionRate}%
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Running Workflows
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                    {
                      projects.filter(
                        (p: any) =>
                          p.status === "ACTIVE" || p.status === "IN_PROGRESS"
                      ).length
                    }
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl group-hover:scale-110 transition-transform">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflow & Task Status Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-white">
                <BarChart3 className="mr-2 h-5 w-5 text-blue-500" />
                Workflow & Task Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="status"
                      tick={{ fontSize: 12 }}
                      stroke="#6b7280"
                    />
                    <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "12px",
                        backdropFilter: "blur(10px)",
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="url(#gradient)"
                      radius={[8, 8, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Task Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-white">
                <Target className="mr-2 h-5 w-5 text-emerald-500" />
                Task Status Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${((percent || 0) * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {taskStats.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "12px",
                        backdropFilter: "blur(10px)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Workflow Progress and Weekly Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflow Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-white">
                <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
                Workflow Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projectProgress.map((project, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {project.name}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {project.completedTasks}/{project.totalTasks} tasks
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {project.progress}% complete
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-white">
                <Calendar className="mr-2 h-5 w-5 text-amber-500" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 12 }}
                      stroke="#6b7280"
                    />
                    <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "12px",
                        backdropFilter: "blur(10px)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="completed"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="url(#completedGradient)"
                      fillOpacity={0.8}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stackId="1"
                      stroke="#10b981"
                      fill="url(#totalGradient)"
                      fillOpacity={0.6}
                    />
                    <defs>
                      <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
                      </linearGradient>
                      <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;

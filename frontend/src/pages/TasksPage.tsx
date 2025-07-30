import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  CheckCircle,
  PlayCircle,
  Clock,
  AlertCircle,
  Archive,
  Edit,
  Trash2,
  Plus,
  FolderOpen,
  Calendar,
  Zap,
  Target,
  TrendingUp,
  Rocket,
  Zap as Lightning,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllTasks, updateTask, deleteTask } from "../api/api";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  name: string;
  status: string;
  projectId: string;
}

const TasksPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      projectId,
      name,
      status,
    }: {
      id: string;
      projectId: string;
      name?: string;
      status?: string;
    }) => updateTask(projectId, id, { name, status }),

    onSuccess: () => {
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
      setEditingTask(null);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () =>
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      }),
  });

  const deleteMutation = useMutation({
  mutationFn: ({ id, projectId }: { id: string; projectId: string }) =>
  deleteTask(projectId, id),

    onSuccess: () => {
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () =>
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      }),
  });

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
      case "ARCHIVED":
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
      case "ARCHIVED":
        return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800";
    }
  };

  // Filter and sort tasks
  const filteredAndSortedTasks = tasks
    .filter((task) => {
      const matchesSearch = task.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof Task];
      let bValue = b[sortBy as keyof Task];

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleDeleteTask = (task: Task) => {
  if (confirm(`Are you sure you want to delete "${task.name}"?`)) {
    deleteMutation.mutate({ id: task.id, projectId: task.projectId });
  }
};


  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "COMPLETED").length,
    inProgress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
    pending: tasks.filter((t) => t.status === "PENDING").length,
    active: tasks.filter((t) => t.status === "ACTIVE").length,
    archived: tasks.filter((t) => t.status === "ARCHIVED").length,
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading tasks...</p>
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
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-blue-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Task Management ⚡
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Track, prioritize, and execute your tasks with precision
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/projects">
                <Button variant="outline" className="border-white/20 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-600/50 text-slate-700 dark:text-slate-300">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  View Workflows
                </Button>
              </Link>
              <Link to="/projects">
                <Button className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-700 hover:via-teal-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Lightning className="mr-2 h-4 w-4" />
                  Create Task
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Task Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-6 gap-4"
      >
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-lg hover:scale-105 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {taskStats.total}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Total</div>
          </CardContent>
        </Card>
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-lg hover:scale-105 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {taskStats.completed}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Completed</div>
          </CardContent>
        </Card>
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-lg hover:scale-105 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {taskStats.inProgress}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">In Progress</div>
          </CardContent>
        </Card>
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-lg hover:scale-105 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">
              {taskStats.pending}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Pending</div>
          </CardContent>
        </Card>
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-lg hover:scale-105 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {taskStats.active}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Active</div>
          </CardContent>
        </Card>
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-lg hover:scale-105 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">
              {taskStats.archived}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Archived</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search tasks, priorities, or assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-white/50 dark:bg-slate-700/50 border-white/20 dark:border-slate-600/50 focus:border-emerald-500 focus:ring-emerald-500/20 text-slate-700 dark:text-slate-300 placeholder-slate-400"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-12 rounded-xl border border-white/20 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="ACTIVE">Active</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <SortAsc className="h-4 w-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex h-12 rounded-xl border border-white/20 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="status">Status</option>
              <option value="projectId">Workflow</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="border-white/20 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-600/50 text-slate-700 dark:text-slate-300"
            >
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Task List */}
      {filteredAndSortedTasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center py-12"
        >
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-12 border border-white/20 dark:border-slate-700/50">
            <Lightning className="h-16 w-16 text-slate-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {tasks.length === 0
                ? "No tasks found"
                : "No tasks match your filters"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
              {tasks.length === 0
                ? "Get started by creating tasks in your workflows"
                : "Try adjusting your search or filter criteria"}
            </p>
            {tasks.length === 0 && (
              <Link to="/projects">
                <Button className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-700 hover:via-teal-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Rocket className="mr-2 h-4 w-4" />
                  Create Workflow
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {filteredAndSortedTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="flex-1">
                        {editingTask?.id === task.id ? (
                          <div className="space-y-3">
                            <Input
                              value={editingTask.name}
                              onChange={(e) =>
                                setEditingTask({
                                  ...editingTask,
                                  name: e.target.value,
                                })
                              }
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  updateMutation.mutate({
                                    id: task.id,
                                    name: editingTask.name,
                                    projectId: task.projectId,

                                  });
                                }
                              }}
                              className="bg-white/50 dark:bg-slate-700/50 border-white/20 dark:border-slate-600/50 focus:border-emerald-500 focus:ring-emerald-500/20 text-slate-700 dark:text-slate-300"
                            />
                            <select
                              value={editingTask.status}
                              onChange={(e) =>
                                setEditingTask({
                                  ...editingTask,
                                  status: e.target.value,
                                })
                              }
                              className="flex h-10 w-full rounded-xl border border-white/20 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
                            >
                              <option value="PENDING">Pending</option>
                              <option value="IN_PROGRESS">In Progress</option>
                              <option value="COMPLETED">Completed</option>
                              <option value="ACTIVE">Active</option>
                              <option value="ARCHIVED">Archived</option>
                            </select>
                          </div>
                        ) : (
                          <div>
                            <h3 className="font-medium text-lg text-slate-900 dark:text-white">{task.name}</h3>
                            <div className="flex items-center space-x-2 mt-2">
                              <span
                                className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(
                                  task.status
                                )}`}
                              >
                                {task.status.replace("_", " ").toLowerCase()}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                Workflow: {task.projectId}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {editingTask?.id === task.id ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateMutation.mutate({
                                id: task.id,
                                name: editingTask.name,
                                status: editingTask.status,
                                projectId: task.projectId,

                              })
                            }
                            disabled={updateMutation.isPending}
                            className="border-white/20 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-600/50 text-slate-700 dark:text-slate-300"
                          >
                            {updateMutation.isPending ? "Saving..." : "Save"}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingTask(null)}
                            className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingTask(task)}
                            className="border-white/20 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-600/50 text-slate-700 dark:text-slate-300"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteTask(task)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksPage;

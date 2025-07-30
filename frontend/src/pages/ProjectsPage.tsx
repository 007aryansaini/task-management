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
  Pencil,
  Trash2,
  Plus,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Calendar,
  Filter,
  Search,
  CheckCircle,
  PlayCircle,
  Clock,
  Archive,
  AlertCircle,
  Rocket,
  Zap,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import ProjectForm from "../components/ProjectForm";
import TaskList from "../components/TaskList";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProjects, deleteProject } from "../api/api";
import { Input } from "../components/ui/input";

interface Project {
  id: string;
  name: string;
  status: string;
}

const ProjectsPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Fetch all projects
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Workflow deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () =>
      toast({
        title: "Error",
        description: "Failed to delete workflow",
        variant: "destructive",
      }),
  });

  const toggleExpand = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
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

  // Filter projects based on search and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteProject = (projectId: string, projectName: string) => {
    if (
      confirm(
        `Are you sure you want to delete "${projectName}"? This will also delete all associated tasks.`
      )
    ) {
      deleteMutation.mutate(projectId);
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Workflow Management 🚀
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Streamline your processes and automate your workflows
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => {
                  setEditing(null);
                  setIsFormOpen(true);
                }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Launch Workflow
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search workflows, processes, or automation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-white/50 dark:bg-slate-700/50 border-white/20 dark:border-slate-600/50 focus:border-blue-500 focus:ring-blue-500/20 text-slate-700 dark:text-slate-300 placeholder-slate-400"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-12 rounded-xl border border-white/20 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="ACTIVE">Active</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Project form for create or edit */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectForm
              existing={editing}
              onClose={() => {
                setIsFormOpen(false);
                setEditing(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading workflows...</p>
          </div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center py-12"
        >
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-12 border border-white/20 dark:border-slate-700/50">
            <Rocket className="h-16 w-16 text-slate-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {projects.length === 0
                ? "No workflows found"
                : "No workflows match your filters"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
              {projects.length === 0
                ? "Get started by creating your first automated workflow"
                : "Try adjusting your search or filter criteria"}
            </p>
            {projects.length === 0 && (
              <Button
                onClick={() => {
                  setEditing(null);
                  setIsFormOpen(true);
                }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Launch Your First Workflow
              </Button>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div
                    className="flex justify-between items-start cursor-pointer"
                    onClick={() => toggleExpand(project.id)}
                  >
                    <div className="flex-1">
                      <CardTitle className="text-lg text-slate-900 dark:text-white">{project.name}</CardTitle>
                      <div className="flex items-center mt-3 space-x-2">
                        <div className="p-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                          {getStatusIcon(project.status)}
                        </div>
                        <span
                          className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status.replace("_", " ").toLowerCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {expandedProjectId === project.id ? (
                        <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditing(project);
                        setIsFormOpen(true);
                      }}
                      className="flex-1 border-white/20 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-600/50 text-slate-700 dark:text-slate-300"
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        handleDeleteProject(project.id, project.name)
                      }
                      disabled={deleteMutation.isPending}
                      className="flex-1"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>

                  {/* Expandable task section */}
                  <AnimatePresence>
                    {expandedProjectId === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-4 border-t border-white/20 dark:border-slate-600/50"
                      >
                        <TaskList projectId={project.id} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Workflow Statistics */}
      {projects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50"
        >
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-slate-900 dark:text-white flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
              Workflow Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {Object.entries({
                Total: projects.length,
                Active: projects.filter((p) => p.status === "ACTIVE").length,
                "In Progress": projects.filter(
                  (p) => p.status === "IN_PROGRESS"
                ).length,
                Completed: projects.filter((p) => p.status === "COMPLETED")
                  .length,
                Pending: projects.filter((p) => p.status === "PENDING")
                  .length,
              }).map(([label, count]) => (
                <div key={label} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                    {count}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectsPage;

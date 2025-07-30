import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "./ui/snackbar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { createTask, updateTask } from "../api/api";
import { motion } from "framer-motion";
import { CheckSquare, X } from "lucide-react";

type Props = {
  projectId: string;
  existing?: any;
  onClose: () => void;
};
export default function TaskForm({ projectId, existing, onClose }: Props) {
  const [title, setTitle] = useState(existing?.title || "");
  const [status, setStatus] = useState(existing?.status || "PENDING");
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!title.trim()) {
        setError("Task title is required");
        throw new Error("Validation failed");
      }
      setError(null);

      const data = { name: title, status };


      if (existing) {
        await updateTask(projectId, existing.id, data);
      } else {
        await createTask(projectId, data);
      }
    },
    onSuccess: () => {
      showSnackbar({
        type: "task",
        title: "Success",
        message: existing ? "Task updated successfully!" : "Task created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
      queryClient.invalidateQueries({ queryKey: ["allTasks"] });
      onClose();
    },
    onError: () => showSnackbar({
      type: "error",
      title: "Error",
      message: "Failed to save task",
    }),
  });

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/50 border border-white/20 dark:border-slate-700/50 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center space-x-2">
              <CheckSquare className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">
                {existing ? "Edit Task" : "Create New Task"}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={error ? "border-destructive" : ""}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

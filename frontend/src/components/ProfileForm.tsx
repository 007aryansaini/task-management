import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../hooks/use-toast";
import { getMyProfile, updateProfile } from "../api/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Save,
  Shield,
  CheckCircle,
  AlertCircle,
  Settings,
  Crown,
  Zap,
  Sparkles,
} from "lucide-react";

export default function ProfileForm() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await getMyProfile();
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
     setForm((prev) => ({
  ...prev,
  name: data.user?.name || "",
  email: data.user?.email || "",
}));

    }
  }, [data]);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mutation = useMutation({
    mutationFn: () => {
      if (!validateForm()) {
        throw new Error("Validation failed");
      }
      return updateProfile(form);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setErrors({});
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error: any) => {
      if (error.message !== "Validation failed") {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading profile...</p>
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
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Account Settings ⚙️
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Manage your profile and account preferences
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl">
                <Settings className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center text-slate-900 dark:text-white">
                <Shield className="mr-2 h-6 w-6 text-indigo-500" />
                Account Information
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Your current account details and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl border border-white/20 dark:border-slate-600/50">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Name</p>
                    <p className="font-medium text-slate-900 dark:text-white">{data?.user.name || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl border border-white/20 dark:border-slate-600/50">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                    <p className="font-medium text-slate-900 dark:text-white">{data?.user.email || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl border border-white/20 dark:border-slate-600/50">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Role</p>
                    <p className="font-medium text-slate-900 dark:text-white">{data?.user.role || "Not set"}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    Account Status
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">Active & Verified</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Update Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Update Profile</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
                  <User className="mr-2 h-4 w-4 text-indigo-500" />
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className={`bg-white/50 dark:bg-slate-700/50 border-white/20 dark:border-slate-600/50 focus:border-indigo-500 focus:ring-indigo-500/20 text-slate-700 dark:text-slate-300 placeholder-slate-400 ${
                    errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 dark:text-red-400 flex items-center"
                  >
                    <AlertCircle className="mr-1 h-3 w-3" />
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-indigo-500" />
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`bg-white/50 dark:bg-slate-700/50 border-white/20 dark:border-slate-600/50 focus:border-indigo-500 focus:ring-indigo-500/20 text-slate-700 dark:text-slate-300 placeholder-slate-400 ${
                    errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 dark:text-red-400 flex items-center"
                  >
                    <AlertCircle className="mr-1 h-3 w-3" />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => mutation.mutate()}
                  disabled={mutation.isPending}
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {mutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 dark:text-blue-100 flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-blue-600" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-blue-800 dark:text-blue-200">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">Your account is secure and actively monitored</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">Keep your login credentials safe and confidential</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">
                  Contact support if you need to reset your password or have security concerns
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">
                  Enable two-factor authentication for enhanced security (coming soon)
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

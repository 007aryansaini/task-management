import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../api/api";
import { useSnackbar } from "../components/ui/snackbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  CheckSquare,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await signin({ email, password });
      localStorage.setItem("token", data.token);
      showSnackbar({
        type: "success",
        title: "Success!",
        message: "You have been logged in successfully.",
      });
      navigate("/");
    } catch (error: any) {
      showSnackbar({
        type: "error",
        title: "Error",
        message:
          error.response?.data?.message ||
          "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 via-purple-600/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 shadow-2xl">
          <CardHeader className="space-y-1 text-center pb-8">
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome to TaskFlow Pro! ⚡
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 text-lg">
              Sign in to streamline your workflow and boost productivity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-blue-500" />
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`bg-white/50 dark:bg-slate-700/50 border-white/20 dark:border-slate-600/50 focus:border-blue-500 focus:ring-blue-500/20 text-slate-700 dark:text-slate-300 placeholder-slate-400 ${
                    errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                  disabled={isLoading}
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
                  <Lock className="mr-2 h-4 w-4 text-blue-500" />
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`bg-white/50 dark:bg-slate-700/50 border-white/20 dark:border-slate-600/50 focus:border-blue-500 focus:ring-blue-500/20 pr-10 text-slate-700 dark:text-slate-300 placeholder-slate-400 ${
                      errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 dark:text-red-400 flex items-center"
                  >
                    <AlertCircle className="mr-1 h-3 w-3" />
                    {errors.password}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-lg font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Access Workspace
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20 dark:border-slate-600/50"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white/70 dark:bg-slate-800/70 px-2 text-slate-500 dark:text-slate-400">
                    Or continue with
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center text-sm"
            >
              <span className="text-slate-600 dark:text-slate-400">
                New to TaskFlow Pro?{" "}
              </span>
              <Link
                to="/signup"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
              >
                Create your account
              </Link>
            </motion.div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-slate-700/50"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Demo Access</span>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <div><strong>Admin:</strong> superadmin@test.com / admin123</div>
            <div><strong>User:</strong> user@test.com / user123</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

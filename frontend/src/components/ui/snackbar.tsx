import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, Zap, Rocket, Zap as Lightning } from 'lucide-react';
import { Button } from './button';

// Types
export type SnackbarType = 'success' | 'error' | 'warning' | 'info' | 'workflow' | 'task';

export interface SnackbarMessage {
  id: string;
  type: SnackbarType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface SnackbarContextType {
  showSnackbar: (message: Omit<SnackbarMessage, 'id'>) => void;
  hideSnackbar: (id: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

// Snackbar Component
const Snackbar: React.FC<SnackbarMessage & { onClose: (id: string) => void }> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  action,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(id), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'workflow':
        return <Rocket className="h-5 w-5 text-purple-500" />;
      case 'task':
        return <Lightning className="h-5 w-5 text-emerald-500" />;
      default:
        return <Zap className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'workflow':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
      case 'task':
        return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
      default:
        return 'bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800';
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case 'success':
        return 'text-emerald-900 dark:text-emerald-100';
      case 'error':
        return 'text-red-900 dark:text-red-100';
      case 'warning':
        return 'text-amber-900 dark:text-amber-100';
      case 'info':
        return 'text-blue-900 dark:text-blue-100';
      case 'workflow':
        return 'text-purple-900 dark:text-purple-100';
      case 'task':
        return 'text-emerald-900 dark:text-emerald-100';
      default:
        return 'text-slate-900 dark:text-slate-100';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`relative p-4 rounded-xl border backdrop-blur-xl shadow-lg ${getBackgroundColor()}`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-semibold ${getTitleColor()}`}>
                {title}
              </h4>
              {message && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {message}
                </p>
              )}
              {action && (
                <div className="mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={action.onClick}
                    className="text-xs h-8 px-3"
                  >
                    {action.label}
                  </Button>
                </div>
              )}
            </div>
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => onClose(id), 300);
                }}
                className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Snackbar Container
export const SnackbarContainer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);

  const showSnackbar = useCallback((message: Omit<SnackbarMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newSnackbar = { ...message, id };
    setSnackbars(prev => [...prev, newSnackbar]);
  }, []);

  const hideSnackbar = useCallback((id: string) => {
    setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-3 max-w-sm">
        {snackbars.map((snackbar) => (
          <Snackbar
            key={snackbar.id}
            {...snackbar}
            onClose={hideSnackbar}
          />
        ))}
      </div>
    </SnackbarContext.Provider>
  );
};

// Convenience functions
export const showSuccess = (title: string, message?: string) => {
  // This will be used with the context
  return { type: 'success' as const, title, message };
};

export const showError = (title: string, message?: string) => {
  return { type: 'error' as const, title, message };
};

export const showWarning = (title: string, message?: string) => {
  return { type: 'warning' as const, title, message };
};

export const showInfo = (title: string, message?: string) => {
  return { type: 'info' as const, title, message };
};

export const showWorkflow = (title: string, message?: string) => {
  return { type: 'workflow' as const, title, message };
};

export const showTask = (title: string, message?: string) => {
  return { type: 'task' as const, title, message };
}; 
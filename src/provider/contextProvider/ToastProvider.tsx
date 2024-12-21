'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
type Toast = {
  id: string;
  message: string;
  type: 'success' | 'error';
};

type ToastContextType = {
  showToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type']) => {
    const id = Math.random().toString(36).substring(2, 15);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);
  const value = useMemo(
    () => ({ showToast, removeToast, toasts }),
    [showToast, removeToast, toasts],
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

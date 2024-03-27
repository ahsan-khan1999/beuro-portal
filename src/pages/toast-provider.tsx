import Toast, { ToastType } from "@/base-components/ui/modals/custom-toast";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface ToastContextType {
  showError: (message: string) => void;
}
declare global {
  function showError(message: string): void;
  var locale: string;
  function translate(key: string): string;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{
    type: ToastType;
    message: string;
  } | null>(null);
  const { t: translate } = useTranslation();
  const locale = useRouter().locale;
  const showError = (message: string) => {
    setToast({ type: "error", message });
  };

  const handleClose = () => {
    setToast(null);
  };

  globalThis.showError = showError;
  globalThis.locale = locale as string;
  globalThis.translate = translate;

  return (
    <ToastContext.Provider value={{ showError }}>
      {children}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

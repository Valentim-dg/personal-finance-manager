import React from "react";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

function Toast({ message, type, onClose }) {
  const styles = {
    success: "bg-green-50 border-green-500 text-green-800",
    error: "bg-red-50 border-red-500 text-red-800",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-800",
  };

  const icons = {
    success: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
    error: <ExclamationCircleIcon className="h-6 w-6 text-red-500" />,
    warning: <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" />,
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`flex items-center gap-3 p-4 rounded-lg border-l-4 shadow-lg max-w-md ${styles[type]}`}
      >
        {icons[type]}
        <p className="flex-1 font-medium">{message}</p>
        <button onClick={onClose} className="hover:opacity-70 transition">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default Toast;

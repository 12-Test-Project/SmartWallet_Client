import React, { useEffect, useState } from "react";

// Define the types of notifications
export type NotificationType = "success" | "error" | "warning" | "info";

// Props for the Notification component
export interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
  duration?: number; // Duration in milliseconds (optional)
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
  duration = 5000, // Default duration: 5 seconds
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically close the notification after the specified duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Define styles based on the notification type
  const getNotificationStyles = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      case "info":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Render the notification
  return isVisible ? (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${getNotificationStyles(
        type
      )}`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="ml-4 text-lg font-bold hover:opacity-75"
        >
          &times;
        </button>
      </div>
    </div>
  ) : null;
};

export default Notification;
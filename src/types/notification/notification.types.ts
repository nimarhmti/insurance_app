import { NotificationPlacement } from "antd/es/notification/interface";

export type NotificationType = "success" | "info" | "warning" | "error";

// Define the type for the notification context
export type NotificationContextType = {
  showNotification: (
    type: NotificationType,
    message: string,
    description: string,
    placement: NotificationPlacement,
    duration?: number
  ) => void;
};

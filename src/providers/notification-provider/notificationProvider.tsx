import { createContext, useContext, ReactNode } from "react";
import { notification, NotificationArgsProps } from "antd";
import { NotificationContextType, NotificationType } from "../../types";
import { NotificationPlacement } from "antd/es/notification/interface";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = (
    type: NotificationType,
    message: string,
    description: string,
    placement: NotificationPlacement = "top",
    duration: number = 5
  ) => {
    api[type]({
      message,
      description,
      placement: placement,
      duration,
    } as NotificationArgsProps);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("some thing wen wrong!");
  }
  return context;
};

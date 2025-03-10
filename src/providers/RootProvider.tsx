import { ReactNode } from "react";
import RouterProvider from "./router-provider/RouterProvider";
import QueryProvider from "./query-provider/QueryProvider";
import AppContextProvider, {
  AppContext,
} from "./context-provider/ContextProvider";
import ThemeProvider from "./them-provider/ThemProvider";
import { NotificationProvider } from "./notification-provider/notificationProvider";

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <RouterProvider>
      <QueryProvider>
        <AppContextProvider>
          <AppContextConsumer>
            <NotificationProvider>{children}</NotificationProvider>
          </AppContextConsumer>
        </AppContextProvider>
      </QueryProvider>
    </RouterProvider>
  );
}

// Helper component to access context values
function AppContextConsumer({ children }: { children: ReactNode }) {
  return (
    <AppContext.Consumer>
      {(context) => (
        <ThemeProvider isDarkMode={context?.isDarkMode || false}>
          {children}
        </ThemeProvider>
      )}
    </AppContext.Consumer>
  );
}

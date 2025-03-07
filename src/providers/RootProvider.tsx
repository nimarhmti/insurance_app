import { ReactNode } from "react";
import RouterProvider from "./router-provider/routerProvider";
import QueryProvider from "./query-provider/queryProvider";
import AppContextProvider, {
  AppContext,
} from "./context-provider/contextProvider";
import ThemeProvider from "./them-provider/themProvider";

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <RouterProvider>
      <QueryProvider>
        <AppContextProvider>
          <AppContextConsumer>{children}</AppContextConsumer>
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

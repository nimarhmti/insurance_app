import { createContext, useState, ReactNode, useContext } from "react";

type AppContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
}

export default function AppContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <AppContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

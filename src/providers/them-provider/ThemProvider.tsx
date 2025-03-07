import { ConfigProvider, App as AntdApp } from "antd";
import { theme } from "antd";
import { ReactNode } from "react";

export default function ThemeProvider({
  children,
  isDarkMode,
}: {
  children: ReactNode;
  isDarkMode: boolean;
}) {
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}

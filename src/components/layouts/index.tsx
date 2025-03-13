import React from "react";

import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";

import NavBar from "../navbar/navbar";

const { Content } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      {/* <SideBar collapsed={collapsed} isDark={isDarkMode} /> */}
      <NavBar />
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            marginTop: 90,
            // minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: "100dvh",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

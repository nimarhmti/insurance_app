import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonFilled,
  SunFilled,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { Button, Layout, Space, Switch, theme, Grid } from "antd";
import { useAppContext } from "../../providers/context-provider/ContextProvider";
import SideBar from "../sidebar/sidebar";

const { Header, Content } = Layout;
const { useToken } = theme;
const { useBreakpoint } = Grid;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isDarkMode, toggleTheme } = useAppContext();
  const { token } = useToken();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const switchStyle: React.CSSProperties = {
    backgroundColor: isDarkMode ? token.colorPrimary : token.colorBgContainer,
  };
  return (
    <Layout>
      <SideBar collapsed={collapsed} isDark={isDarkMode} />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "12px",
          }}
        >
          {!isMobile && (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          )}

          <Space
            align="center"
            size="middle"
            style={{
              marginLeft: "auto",
            }}
          >
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              checkedChildren={
                <MoonFilled style={{ color: token.colorWhite }} />
              }
              unCheckedChildren={
                <SunFilled style={{ color: token.colorPrimary }} />
              }
              style={switchStyle}
            />
          </Space>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
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

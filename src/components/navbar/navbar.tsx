import { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Grid,
  Drawer,
  Space,
  theme,
  Typography,
} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ThemeToggleSwitcher from "./toggleSwitcher";
const { Header } = Layout;
const { useBreakpoint } = Grid;

const menuItems = [
  {
    key: "insurances",
    label: (
      <Link to="/insurances" style={{ fontWeight: 500 }}>
        Insurance
      </Link>
    ),
  },
  {
    key: "submissions",
    label: (
      <Link to="/submissions" style={{ fontWeight: 500 }}>
        Submissions
      </Link>
    ),
  },
];

const indexsRoutes = ["/", "/insurances"];

const { useToken } = theme;

const NavBar = () => {
  const { token } = useToken();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const setActiveRoute = () => {
    const url = window.location.pathname;
    if (indexsRoutes.includes(url)) {
      return "insurances";
    } else {
      return url.replace("/", "");
    }
  };

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          zIndex: 1,
          width: "100%",
          padding: "0px 20px 0 20px",
          background: token.colorBgContainer,
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Typography.Title level={4}>Insurance Portal</Typography.Title>
          </Col>

          {/* Desktop Menu */}
          {!isMobile && (
            <Col>
              <Menu
                mode="horizontal"
                defaultSelectedKeys={[setActiveRoute()]}
                items={menuItems}
              />
            </Col>
          )}

          {/* Right Side Items */}
          <Col>
            <Space size="middle">
              {isMobile ? (
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  onClick={toggleMobileMenu}
                />
              ) : (
                <Space align="center" size="middle">
                  <ThemeToggleSwitcher />
                </Space>
              )}
            </Space>
          </Col>
        </Row>
      </Header>

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setIsMobileMenuOpen(false)}
          open={isMobileMenuOpen}
          extra={
            <Space align="center" size="middle">
              <ThemeToggleSwitcher />
            </Space>
          }
        >
          <Menu
            mode="vertical"
            defaultSelectedKeys={[setActiveRoute()]}
            items={menuItems}
          />
        </Drawer>
      )}
    </Layout>
  );
};

export default NavBar;

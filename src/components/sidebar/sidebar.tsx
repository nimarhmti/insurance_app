import { Menu, Layout, Grid } from "antd";
import { Link } from "react-router-dom";

import { BankOutlined, UnorderedListOutlined } from "@ant-design/icons";
const { Sider } = Layout;
const { useBreakpoint } = Grid;
interface Props {
  collapsed: boolean;
  isDark: boolean;
}
const menuItems = [
  {
    key: "insurances",
    label: (
      <Link to="/insurances" style={{ fontWeight: 500 }}>
        Insurance
      </Link>
    ),
    icon: <BankOutlined />,
  },
  {
    key: "submissions",
    label: (
      <Link to="/submissions" style={{ fontWeight: 500 }}>
        Submissions
      </Link>
    ),
    icon: <UnorderedListOutlined />,
  },
];

export default function SideBar({ collapsed, isDark }: Props) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={isMobile ? true : collapsed}
      theme={isDark ? "dark" : "light"}
    >
      <Menu
        theme={isDark ? "dark" : "light"}
        mode="inline"
        defaultSelectedKeys={[menuItems["0"].key]}
        items={menuItems}
        style={{ paddingTop: "12px" }}
      />
    </Sider>
  );
}

import { Switch, theme } from "antd";
import { useAppContext } from "../../providers/context-provider/ContextProvider";
import { MoonFilled, SunFilled } from "@ant-design/icons";

const { useToken } = theme;
export default function ThemeToggleSwitcher() {
  const { isDarkMode, toggleTheme } = useAppContext();
  const { token } = useToken();
  const switchStyle: React.CSSProperties = {
    backgroundColor: isDarkMode ? token.colorPrimary : token.colorBgContainer,
  };
  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleTheme}
      checkedChildren={<MoonFilled style={{ color: token.colorWhite }} />}
      unCheckedChildren={<SunFilled style={{ color: token.colorPrimary }} />}
      style={switchStyle}
    />
  );
}

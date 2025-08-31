import {
  createTheme,
  ThemeProvider,
  type ThemeOptions,
  THEME_ID as MATERIAL_THEME_ID,
  extendTheme as materialExtendTheme,
  ThemeProvider as MaterialCssVarsProvider,
} from "@mui/material/styles";
import { useContext, type FC, type JSX } from "react";
import { MainContext } from "../../helpers/others/mainContext";

interface TThemeLayout {
  children: JSX.Element;
}
const ThemeLayout: FC<TThemeLayout> = ({ children }) => {
  const { theme, dir, fontFamily } = useContext(MainContext);

  const themeMUI = createTheme(MUI_THEME(theme, dir, fontFamily));
  const materialTheme = materialExtendTheme(themeMUI);

  return (
    <ThemeProvider theme={themeMUI}>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        {children}
      </MaterialCssVarsProvider>
    </ThemeProvider>
  );
};

export default ThemeLayout;

const MUI_THEME = (
  theme: TTheme,
  dir: TDirection,
  fontFamily: string
): ThemeOptions => ({
  direction: dir,
  typography: {
    fontFamily,
  },
  palette: {
    background: {
      default: theme === "light" ? "#FFFFFF" : "#000",
    },
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

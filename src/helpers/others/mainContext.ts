import { createContext } from "react";
import {
  DEFAULT_LOCALE,
  DEFAULT_THEME,
  LOCALE_BY_DIR,
} from "../constants/statics";
import { DEFAULT_SIDE_BAR_SIZE } from "../constants/materials";

export const MainContext = createContext<IMainContext>({
  lng: DEFAULT_LOCALE,
  changeLanguage: () => undefined,
  changeSidebarSize: () => undefined,
  changeTheme: () => undefined,
  dir: LOCALE_BY_DIR.rtl.includes(DEFAULT_LOCALE) ? "rtl" : "ltr",
  fontFamily: "",
  globalProfileInformation: {},
  sidebarSize: DEFAULT_SIDE_BAR_SIZE,
  theme: DEFAULT_THEME,
  routes: { dashboardRoutes: [] },
});

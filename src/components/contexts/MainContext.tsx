import {
  type FC,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
  type ProviderProps,
} from "react";
import { useTranslation } from "react-i18next";

import {
  SYSTEM_FONT,
  DEFAULT_THEME,
  LOCALE_BY_DIR,
  DEFAULT_LOCALE,
  DEFAULT_SIDE_BAR_SIZE,
  LANGUAGE_NAME_LOCAL_STORAGE,
} from "../../helpers/constants/statics";
import type { RouteObject } from "react-router-dom";
import { dashboardRoutes } from "../setting/DashboardRoutes";
import { MainContext } from "../../helpers/others/mainContext";

export const MainContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locale, setLoacale] = useState<TLanguages | undefined>(undefined);
  const [fontFamily, setFontFamily] = useState<string>("");
  const [theme, setTheme] = useState<TTheme>(DEFAULT_THEME);
  const [sidebarSize, setSidebarSize] = useState<TSidebarSize>(
    DEFAULT_SIDE_BAR_SIZE
  );
  const [dir, setDir] = useState<TDirection>(
    LOCALE_BY_DIR.rtl.includes(locale || DEFAULT_LOCALE) ? "rtl" : "ltr"
  );

  const { i18n } = useTranslation();

  const changeTheme = useCallback((theme: TTheme) => {
    setTheme(theme);
  }, []);

  const changeSidebarSize = useCallback((sidebarSize: TSidebarSize) => {
    setSidebarSize(sidebarSize);
  }, []);

  const changeLanguage: TChangeLanguage = useCallback(
    (lng, hasReload) => {
      if (hasReload) {
        localStorage.setItem(LANGUAGE_NAME_LOCAL_STORAGE, lng);
        return location.reload();
      }
      i18n.changeLanguage(lng, () => {
        localStorage.setItem(LANGUAGE_NAME_LOCAL_STORAGE, lng);
      });
      setLoacale(lng as TLanguages);
      setDir(LOCALE_BY_DIR.rtl.includes(lng as TLanguages) ? "rtl" : "ltr");
      setFontFamily(SYSTEM_FONT[lng as TLanguages]);
    },
    [i18n]
  );
  const routesResult: ProviderProps<
    IMainContext<TAny, RouteObject>
  >["value"]["routes"] = useMemo(
    () => ({
      dashboardRoutes: dashboardRoutes,
    }),
    []
  );

  const value: ProviderProps<IMainContext>["value"] = useMemo(
    () => ({
      dir,
      theme,
      fontFamily,
      changeTheme,
      sidebarSize,
      changeLanguage,
      changeSidebarSize,
      routes: routesResult,
      globalProfileInformation: {},
      lng: locale || DEFAULT_LOCALE,
    }),
    [
      dir,
      theme,
      locale,
      fontFamily,
      changeTheme,
      sidebarSize,
      routesResult,
      changeLanguage,
      changeSidebarSize,
    ]
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

interface IMainContext<T = unknowm, TRouteObject = TAnyObjects> {
  lng: TLanguages;
  fontFamily: string;
  theme: TTheme;
  dir: TDirection;
  sidebarSize: TSidebarSize;
  globalProfileInformation: T;
  changeLanguage: TChangeLanguage;
  changeTheme: (theme: TTheme) => void;
  changeSidebarSize: (sidebarSize: TSidebarSize) => void;
  routes: { dashboardRoutes: TRouteObject[]; citizenRoutes: TRouteObject[] };
  isLoadingUploader: boolean;
  changeLoadingUploader: (value: boolean) => void;
  isLoadingProfileInformation: boolean;
}

type TChangeLanguage = (lng: string, hasReload?: boolean) => void;

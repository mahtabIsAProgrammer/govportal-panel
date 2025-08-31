type TLanguages = "fa" | "en";
type TTheme = "light" | "dark";
type TDirection = "rtl" | "ltr";
type TSidebarSize = "normal" | "medium" | "none";
type TSystemFont = {
  [key in TLanguages]: string;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAny = any;

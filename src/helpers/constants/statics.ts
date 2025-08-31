export const DEFAULT_LOCALE = "en";

export const LOCALE_BY_DIR: { [key in TDirection]: TLanguages[] } = {
  rtl: ["fa"],
  ltr: ["en"],
};

export const DEFAULT_THEME: TTheme = "light";
export const TOKEN_NAME = "token-goveportal-panel";

export const LANGUAGE_NAME_LOCAL_STORAGE = `active_language_${TOKEN_NAME}`;
export const SYSTEM_FONT: TSystemFont = {
  fa: "",
  en: "",
};

export const STALE_TIME = 1000 * 5; //? 5s
export const CASH_TIME = 1000 * 60 * 60; //? 1h

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

import i18n from "./helpers/utils/i18n";
import { MainLayout } from "./components/layouts/MainLayout.tsx";

import "./assets/styles/reset.css";
import "./assets/styles/fonts.css";
import "./assets/styles/controller.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </I18nextProvider>
  </StrictMode>
);

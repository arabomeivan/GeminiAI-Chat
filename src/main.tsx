import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { initThemeMode } from "flowbite-react";
import { ThemeInit } from "../.flowbite-react/init";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeInit />
      <App />
    </BrowserRouter>
  </StrictMode>,
);

initThemeMode();

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./chem-iupac-validator";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

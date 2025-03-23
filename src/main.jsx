import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaderProvider } from "./components/utils/context.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Router>
    <FaderProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </FaderProvider>
  </Router>
  // </StrictMode>
);

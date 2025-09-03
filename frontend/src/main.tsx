import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import Providers from "./utils/Provider.tsx";
import { ScrollToTop } from "./utils/ScrollToTop.ts";
import { Toaster } from "react-hot-toast";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <Providers>
      <Toaster />
      <App />
    </Providers>
  </BrowserRouter>
);

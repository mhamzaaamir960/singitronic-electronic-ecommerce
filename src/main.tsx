import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import Providers from "./utils/Provider.tsx";
import "./index.css";
import {Footer, Header} from "./components";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Providers>
      <Header />
      <App />
      <Footer />
    </Providers>
  </BrowserRouter>
);

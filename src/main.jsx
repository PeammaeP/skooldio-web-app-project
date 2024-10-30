import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Example from "./navbar.jsx";
import Footer from "./footer.jsx";

import "./index.css";
import Example2 from "./navbar_2.jsx";
import Navbar from "./navbar_2.jsx";
import ViteNavbar from "./navbar_2.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Example></Example> */}
    <Navbar></Navbar>
    <App />
    <Footer></Footer>
  </StrictMode>
);

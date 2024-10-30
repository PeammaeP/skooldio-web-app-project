import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FirstPage from "./pages/FirstPage.jsx";
import AppProductDetail from "./components/appProductDetailCard/AppProductDetail.jsx";
import CartPage from "./pages/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FirstPage />,
  },
  {
    path: "/products/:permalink",
    element: <AppProductDetail />,
  },
  {
    path: "/carts",
    element: <CartPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

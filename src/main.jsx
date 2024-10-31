import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FirstPage from "./pages/FirstPage.jsx";
import AppProductDetail from "./components/appProductDetailCard/AppProductDetail.jsx";
import { CartProvider } from "./components/appCart/appCartLogic"; // import CartProvider
import { CartPage } from "./components/appCart/appCartLogic";
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
  {
    path: "/carts/:id",
    element: <CartPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);

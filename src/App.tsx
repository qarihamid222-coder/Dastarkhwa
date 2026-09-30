import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";

const MenuPage = lazy(() => import("./pages/MenuPage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Location = lazy(() => import("./pages/Location"));
const Order = lazy(() => import("./pages/Order"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="location" element={<Location />} />
              <Route path="order" element={<Order />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

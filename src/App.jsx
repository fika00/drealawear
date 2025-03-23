import "./App.css";
import "lenis/dist/lenis.css";

import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./clash-display.css";
import DevelopmentNotice from "./components/DevelopmentNotice/DevelopmentNotice";
import { useEffect, useLayoutEffect, useRef } from "react";
import NavbarMenu from "./components/NavbarMenu/NavbarMenu";
import { ReactLenis } from "lenis/react";
import PageFader from "./components/PageFader/PageFader";
import { FaderProvider, useFader } from "./components/utils/context";
import Inner from "./components/utils/Inner";
import CartSidebar from "./components/CartSidebar/CartSidebar";
import AuthProvider from "react-auth-kit";
import { store } from "./components/utils/AuthStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./components/utils/ToastContext";
import ToastContainer from "./components/ToastContainer/ToastContainer";
import { CartProvider } from "./components/utils/CartContext";
import { ModalProvider } from "./components/utils/ModalProvider";

// import Shirts from "./pages/Shirts/Shirts";
// import Home from "./pages/Home/Home";
// import ProductPage from "./pages/ProductPage/ProductPage";
// import Login from "./pages/Login/Login";
// import LifestyleForm from "./pages/LifestyleForm/LifestyleForm";
// import Checkout from "./pages/Checkout/Checkout";
// import Profile from "./pages/Profile/Profile";
// import HomeDevelopment from "./pages/HomeDevelopment/HomeDevelopment";

import ModalContainer from "./components/ModalContainer/ModalContainer";
import Footer from "./components/Footer/Footer";
// LAZY

import React, { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";
import { AnimatePresence, motion } from "framer-motion";
import { development } from "./components/utils/misc";
import AnimatedSuspense from "./components/AnimatedSuspense/AnimatedSuspense";

const CheckoutConfirmation = lazy(() =>
  import("./pages/Checkout/CheckoutConfirmation/CheckoutConfirmation")
);
const Shirts = lazy(() => import("./pages/Shirts/Shirts"));
const Home = lazy(() => import("./pages/Home/Home"));
const ProductPage = lazy(() => import("./pages/ProductPage/ProductPage"));
const Login = lazy(() => import("./pages/Login/Login"));
const LifestyleForm = lazy(() => import("./pages/LifestyleForm/LifestyleForm"));
// const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const HomeDevelopment = lazy(() =>
  import("./pages/HomeDevelopment/HomeDevelopment")
);
const About = lazy(() => import("./pages/About/About"));
function App() {
  const location = useLocation();
  const navBarMenuRef = useRef();
  const cartRef = useRef();
  const parentRef = useRef();

  useLayoutEffect(() => {
    navBarMenuRef.current.toggleMenu(false);
  }, [location.pathname]);

  const setMenuPosition = (position) => {
    navBarMenuRef.current.setMenuOrigin(position);
  };

  const toggleMenu = (value) => {
    navBarMenuRef.current.toggleMenu(value);
  };

  // const openCart = () => {
  //   cartRef.current.openCart();
  // };

  // const queryClient = new QueryClient();

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     const { height } = parentRef?.current?.getBoundingClientRect();
  //
  //     clearTimeout(timeout);
  //   }, 1000);
  // },[]);

  const { development } = useFader(); // Destructure the development boolean from context

  return (
    <ReactLenis root>
      <div ref={parentRef}>
        {/* <AuthProvider store={store}> */}
          {/* <QueryClientProvider client={queryClient}> */}
            <ToastProvider>
              <ModalProvider>
                {/* <CartProvider> */}
                  {/* <FaderProvider> */}
                  <Inner>
                    <AnimatedSuspense>
                      {/* {!development ? ( */}
                      <Routes location={location} key={location.pathname}>
                        <Route index element={<Home />} />
                        <Route path="/catalogue" element={<Shirts />} />
                        <Route
                          path="/catalogue/:shirt"
                          element={<ProductPage />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route
                          path="/lifestyleform"
                          element={<LifestyleForm />}
                        />
                        
                        <Route path="/about" element={<About />} />
                        
                        <Route path="/profile" element={<Profile />} />
                      </Routes>
                    
                    </AnimatedSuspense>
                  </Inner>

                  <Footer />

                  {!development && (
                    <Navbar
                      // onCartOpen={openCart}
                      onMenuToggle={toggleMenu}
                      onLoad={setMenuPosition}
                    />
                  )}

                  <PageFader />

                  <NavbarMenu ref={navBarMenuRef} />
                  <CartSidebar ref={cartRef} />

                  <ModalContainer />

                  <ToastContainer />
              </ModalProvider>
            </ToastProvider>
      </div>
    </ReactLenis>
  );
}

export default App;

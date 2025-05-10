import React, { useState, useEffect } from "react";
import { CircleLoader } from "react-spinners";
import { Routes, Route, useRoutes, useLocation } from "react-router-dom";
import Sidebar from "./assets/components/Sidebar";
import Nav from "./assets/components/Nav";
import router from "./routes";
import NavMobile from "./assets/components/NavMobile";
import { Toaster } from "react-hot-toast";
import SidebarMobile from "./assets/components/SidebarMobile";

export default function App() {
  // loading ....
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(false);
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;

      if (newIsMobile !== isMobile) {
        setIsLoading(true);
        const timeout = setTimeout(() => {
          setIsMobile(newIsMobile);
          setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  // Routing
  const mainRouter = useRoutes(router);
  // for login and singin page
  const location = useLocation();
  const showSidebarAndNav = location.pathname !== "/registerorlogin";
  return (
    <>
      {/* Notifications */}
      <Toaster />

      {/* For Loading */}
      {isLoading && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <CircleLoader
            id="loading"
            color={"#000000"}
            loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {/* Mobile Preview */}
      {isMobile && (
        <div className="max-w-3xl">
          <NavMobile />
          <SidebarMobile />
        </div>
      )}

      {/* Desktop Preview */}
      {showSidebarAndNav && (
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Nav />
            {mainRouter}
          </div>
        </div>
      )}
    </>
  );
}

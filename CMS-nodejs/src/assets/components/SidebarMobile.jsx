import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";
import { FolderIcon } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";
export default function SidebarMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  //   console.log(isMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {isMobile && (
        <div
          id="navMobile"
          className="fixed bottom-0 z-50 flex h-18 w-full items-center justify-between bg-gray-900 px-8 shadow-2xs"
        >
          <Link to={"/"}>
            <div className="flex flex-col items-center justify-center text-gray-400">
              <HomeIcon className="w-7 text-gray-400" />
              <span className="pt-2 text-xs">صفحه اصلی</span>
            </div>
          </Link>
          <Link to={"/products"}>
            <div className="flex flex-col items-center justify-center text-gray-400">
              <FolderIcon className="w-7 text-gray-400" />
              <span className="pt-2 text-xs">محصولات</span>
            </div>
          </Link>
          <Link to={"/Comments"}>
            <div className="flex flex-col items-center justify-center text-gray-400">
              <ChatBubbleBottomCenterTextIcon className="w-7 text-gray-400" />
              <span className="pt-2 text-xs">کامنت ها</span>
            </div>
          </Link>
          <Link to={"/users"}>
            <div className="flex flex-col items-center justify-center text-gray-400">
              <UsersIcon className="w-7 text-gray-400" />
              <span className="pt-2 text-xs">کاربران</span>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

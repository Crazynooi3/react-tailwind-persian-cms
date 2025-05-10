import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import { Bars4Icon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function NavMobile() {
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
        <div id="nav" className="flex h-16 items-center px-8 shadow-2xs">
          <nav className="flex w-full items-center">
            <div className="flex flex-1 items-center">
              <div className="relative">
                <button className="flex items-center justify-between p-1.5">
                  <img
                    src="/images/empty.png"
                    alt="userPhoto"
                    className="max-w-8 min-w-8"
                  />
                </button>
              </div>
              {/* <div className="mr-5 h-6 border-r border-gray-400"></div> */}
              <div className="mr-3 flex items-center justify-center">
                <BellIcon className="w-5 font-semibold text-gray-400 hover:text-gray-600" />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <div id="search-box" className="flex items-center">
                <MagnifyingGlassIcon className="w-5 text-base font-bold text-gray-400" />
                <input
                  type="text"
                  placeholder="جستجو محصول ..."
                  className="rounded-md px-5 py-2 outline-0 placeholder:text-sm focus:bg-gray-100"
                />
              </div>
            </div>
            {/* <div>
              <Bars4Icon className="mr-3 w-5 text-gray-400 hover:text-gray-700" />
            </div> */}
          </nav>
        </div>
      )}
    </>
  );
}

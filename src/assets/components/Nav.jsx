import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Nav() {
  return (
    <>
      <div
        id="nav"
        className="hidden h-16 items-center px-8 shadow-2xs md:flex"
      >
        <nav className="flex w-full">
          <div className="flex flex-1 items-center">
            <div className="relative">
              <button className="flex items-center justify-between gap-5 p-1.5">
                <span className="flex items-center gap-3">
                  <ChevronDownIcon className="w-5 text-gray-400" />
                  <span className="flex w-fit flex-col items-start justify-start text-lg font-semibold text-nowrap text-gray-900">
                    احسان قناد
                    <span className="block text-sm text-gray-400">
                      برنامه نویس فرانت اند
                    </span>
                  </span>
                </span>
                <img src="/images/empty.png" alt="userPhoto" className="w-8" />
              </button>
            </div>
            <div className="mr-5 h-6 border-r border-gray-400"></div>
            <div className="mr-5">
              <BellIcon className="w-7 font-semibold text-gray-400 hover:text-gray-600" />
            </div>
          </div>
          <div className="flex flex-4 items-center justify-end">
            <div id="search-box" className="flex w-96 items-center">
              <MagnifyingGlassIcon className="w-6 text-base font-bold text-gray-400" />
              <input
                type="text"
                placeholder="جستجو محصول ..."
                className="w-full rounded-md px-5 py-2 outline-0 focus:bg-gray-100"
              />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
